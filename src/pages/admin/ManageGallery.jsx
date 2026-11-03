import { useState } from 'react';
import { useContentContext } from '../../core/context/ContentContext';
import { useAuth } from '../../core/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadImage, deleteImageFromStorage } from '../../fbconnect/services';
import { isImageFile, isHeicFile, ensureJpegImage } from '../../core/utils/imageUtils';

export default function ManageGallery() {
    const { gallery, addGalleryPhoto, editGalleryPhoto, deleteGalleryPhoto } = useContentContext();
    const { isEventsTeam } = useAuth();

    const [searchTerm, setSearchTerm] = useState('');
    
    // Modal states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingAlbum, setEditingAlbum] = useState(null); // for editing metadata (Name, Venue, Date)
    const [activeManageAlbum, setActiveManageAlbum] = useState(null); // for photo & cover image manager
    
    // Multi-select photos state inside Manage Album Modal
    const [selectedPhotoUrls, setSelectedPhotoUrls] = useState([]);
    const [isDeletingBulk, setIsDeletingBulk] = useState(false);

    // Upload & Form state
    const [uploadMode, setUploadMode] = useState('files'); // 'files' or 'folder'
    const [formData, setFormData] = useState({
        eventName: '',
        venue: '',
        date: new Date().toISOString().split('T')[0],
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    
    // Append photos state inside Manage Album Modal
    const [appendFiles, setAppendFiles] = useState([]);
    const [isAppending, setIsAppending] = useState(false);
    
    // Global saving/progress
    const [isSaving, setIsSaving] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
    const [uploadStatusMessage, setUploadStatusMessage] = useState('');

    // --- Modal Openers ---
    const openCreateModal = () => {
        setFormData({
            eventName: '',
            venue: '',
            date: new Date().toISOString().split('T')[0],
        });
        setSelectedFiles([]);
        setUploadProgress({ current: 0, total: 0 });
        setUploadStatusMessage('');
        setIsCreateModalOpen(true);
    };

    const openEditMetadataModal = (album) => {
        setEditingAlbum(album);
        setFormData({
            eventName: album.eventName || '',
            venue: album.venue || '',
            date: album.date || new Date().toISOString().split('T')[0],
        });
    };

    const openManagePhotosModal = (album) => {
        setActiveManageAlbum(album);
        setAppendFiles([]);
        setSelectedPhotoUrls([]);
    };

    // --- File Handlers ---
    const handleFileSelect = (e) => {
        const rawFiles = Array.from(e.target.files || []);
        const files = rawFiles.filter(isImageFile);
        setSelectedFiles(files);
        console.log(`➡️ [ManageGallery] Selected ${files.length} valid images (including HEIC).`);
    };

    const handleAppendFileSelect = (e) => {
        const rawFiles = Array.from(e.target.files || []);
        const files = rawFiles.filter(isImageFile);
        setAppendFiles(files);
        console.log(`➡️ [ManageGallery] Selected ${files.length} photos to append.`);
    };

    // --- Actions ---

    // 1. Create New Gallery Album
    const handleCreateGallery = async (e) => {
        e.preventDefault();
        
        if (!formData.eventName) {
            alert("Event Name is required.");
            return;
        }

        if (selectedFiles.length === 0) {
            alert("Please select image files or a folder.");
            return;
        }

        setIsSaving(true);
        console.log(`➡️ [ManageGallery] Starting gallery upload for event: ${formData.eventName}`);
        setUploadProgress({ current: 0, total: selectedFiles.length });
        setUploadStatusMessage("Preparing images...");

        try {
            const uploadedUrls = [];
            const safeEventName = formData.eventName.replace(/[^a-zA-Z0-9-_\s]/g, '').trim();

            for (let i = 0; i < selectedFiles.length; i++) {
                let file = selectedFiles[i];
                console.log(`➡️ [ManageGallery] Processing file ${i + 1}/${selectedFiles.length}: ${file.name}`);
                
                if (isHeicFile(file)) {
                    setUploadStatusMessage(`Converting HEIC photo ${i + 1}/${selectedFiles.length}: ${file.name}`);
                    file = await ensureJpegImage(file);
                }

                setUploadStatusMessage(`Uploading photo ${i + 1}/${selectedFiles.length}: ${file.name}`);

                const path = `gallery/${safeEventName}/${Date.now()}_${file.name}`;
                const url = await uploadImage(file, path);
                
                uploadedUrls.push(url);
                setUploadProgress({ current: i + 1, total: selectedFiles.length });
            }

            const galleryDoc = {
                eventName: formData.eventName,
                venue: formData.venue || '',
                date: formData.date || '',
                images: uploadedUrls,
                coverImage: uploadedUrls[0] || '',
            };

            console.log("➡️ [ManageGallery] Saving new gallery document to Firestore:", galleryDoc);
            await addGalleryPhoto(galleryDoc);
            
            console.log("✅ [ManageGallery] Gallery created successfully.");
            setIsCreateModalOpen(false);
        } catch (error) {
            console.error("❌ [ManageGallery] Error creating gallery:", error);
            alert("Failed to create gallery album. Check browser console logs.");
        } finally {
            setIsSaving(false);
            setUploadProgress({ current: 0, total: 0 });
            setUploadStatusMessage('');
        }
    };

    // 2. Save Edited Metadata (Name, Date, Venue)
    const handleSaveMetadata = async (e) => {
        e.preventDefault();
        if (!editingAlbum) return;

        setIsSaving(true);
        try {
            const updatedFields = {
                eventName: formData.eventName || '',
                venue: formData.venue || '',
                date: formData.date || '',
            };

            await editGalleryPhoto(editingAlbum.id, updatedFields);
            console.log("✅ [ManageGallery] Album metadata updated.");
            setEditingAlbum(null);
        } catch (error) {
            console.error("❌ [ManageGallery] Error updating album info:", error);
            alert("Failed to update album details.");
        } finally {
            setIsSaving(false);
        }
    };

    // 3. Set Cover Image
    const handleSetCoverImage = async (album, imageUrl) => {
        try {
            console.log(`➡️ [ManageGallery] Setting cover image for "${album.eventName}" to: ${imageUrl}`);
            const safeCover = imageUrl || '';
            await editGalleryPhoto(album.id, { coverImage: safeCover });
            
            // Sync active modal state if open
            if (activeManageAlbum && activeManageAlbum.id === album.id) {
                setActiveManageAlbum(prev => ({ ...prev, coverImage: safeCover }));
            }
        } catch (error) {
            console.error("❌ [ManageGallery] Error setting cover image:", error);
            alert("Failed to update cover image.");
        }
    };

    // 4. Delete Single Photo from Album
    const handleDeleteSinglePhoto = async (album, photoUrl) => {
        if (!window.confirm("Are you sure you want to remove this photo from the album?")) return;

        const currentImages = album.images && Array.isArray(album.images) 
            ? album.images 
            : (album.image ? [album.image] : []);

        const updatedImages = currentImages.filter(img => img !== photoUrl);
        let updatedCover = album.coverImage || '';
        
        // If the cover image was deleted, fallback to first image in updated array
        if (album.coverImage === photoUrl || !updatedCover) {
            updatedCover = updatedImages[0] || '';
        }

        try {
            await editGalleryPhoto(album.id, {
                images: updatedImages,
                coverImage: updatedCover,
            });

            // Cleanup Storage in background
            deleteImageFromStorage(photoUrl);

            if (activeManageAlbum && activeManageAlbum.id === album.id) {
                setActiveManageAlbum(prev => ({
                    ...prev,
                    images: updatedImages,
                    coverImage: updatedCover
                }));
            }
            setSelectedPhotoUrls(prev => prev.filter(url => url !== photoUrl));
            console.log("✅ [ManageGallery] Photo deleted from album successfully.");
        } catch (error) {
            console.error("❌ [ManageGallery] Error deleting photo:", error);
            alert("Failed to remove photo from album: " + (error.message || "Unknown error"));
        }
    };

    // 5. Multi-Select / Bulk Delete Photos
    const handleToggleSelectPhoto = (photoUrl) => {
        setSelectedPhotoUrls(prev => 
            prev.includes(photoUrl) 
                ? prev.filter(url => url !== photoUrl) 
                : [...prev, photoUrl]
        );
    };

    const handleSelectAllPhotos = () => {
        if (!activeManageAlbum) return;
        const currentImages = activeManageAlbum.images && Array.isArray(activeManageAlbum.images)
            ? activeManageAlbum.images
            : (activeManageAlbum.image ? [activeManageAlbum.image] : []);

        if (selectedPhotoUrls.length === currentImages.length) {
            setSelectedPhotoUrls([]);
        } else {
            setSelectedPhotoUrls([...currentImages]);
        }
    };

    const handleDeleteSelectedPhotos = async () => {
        if (!activeManageAlbum || selectedPhotoUrls.length === 0) return;
        
        const count = selectedPhotoUrls.length;
        if (!window.confirm(`Are you sure you want to delete ${count} selected photo(s) from "${activeManageAlbum.eventName}"?`)) return;

        setIsDeletingBulk(true);
        try {
            const currentImages = activeManageAlbum.images && Array.isArray(activeManageAlbum.images)
                ? activeManageAlbum.images
                : (activeManageAlbum.image ? [activeManageAlbum.image] : []);

            const updatedImages = currentImages.filter(img => !selectedPhotoUrls.includes(img));
            let updatedCover = activeManageAlbum.coverImage || '';
            if (selectedPhotoUrls.includes(updatedCover) || !updatedCover) {
                updatedCover = updatedImages[0] || '';
            }

            await editGalleryPhoto(activeManageAlbum.id, {
                images: updatedImages,
                coverImage: updatedCover,
            });

            // Cleanup storage in background
            selectedPhotoUrls.forEach(url => deleteImageFromStorage(url));

            setActiveManageAlbum(prev => ({
                ...prev,
                images: updatedImages,
                coverImage: updatedCover
            }));

            setSelectedPhotoUrls([]);
            console.log(`✅ [ManageGallery] Successfully deleted ${count} photos.`);
        } catch (error) {
            console.error("❌ [ManageGallery] Error deleting selected photos:", error);
            alert("Failed to delete selected photos: " + (error.message || "Unknown error"));
        } finally {
            setIsDeletingBulk(false);
        }
    };

    // 6. Append New Photos to Existing Album
    const handleAppendPhotos = async (e) => {
        e.preventDefault();
        if (!activeManageAlbum || appendFiles.length === 0) return;

        setIsAppending(true);
        setUploadProgress({ current: 0, total: appendFiles.length });
        setUploadStatusMessage("Preparing images...");

        try {
            const newUploadedUrls = [];
            const safeEventName = (activeManageAlbum.eventName || 'album').replace(/[^a-zA-Z0-9-_\s]/g, '').trim();

            for (let i = 0; i < appendFiles.length; i++) {
                let file = appendFiles[i];
                if (isHeicFile(file)) {
                    setUploadStatusMessage(`Converting HEIC photo ${i + 1}/${appendFiles.length}: ${file.name}`);
                    file = await ensureJpegImage(file);
                }

                setUploadStatusMessage(`Uploading photo ${i + 1}/${appendFiles.length}: ${file.name}`);
                const path = `gallery/${safeEventName}/${Date.now()}_${file.name}`;
                const url = await uploadImage(file, path);
                newUploadedUrls.push(url);
                setUploadProgress({ current: i + 1, total: appendFiles.length });
            }

            const currentImages = activeManageAlbum.images && Array.isArray(activeManageAlbum.images)
                ? activeManageAlbum.images
                : (activeManageAlbum.image ? [activeManageAlbum.image] : []);

            const updatedImages = [...currentImages, ...newUploadedUrls];
            const updatedCover = activeManageAlbum.coverImage || updatedImages[0] || '';

            await editGalleryPhoto(activeManageAlbum.id, {
                images: updatedImages,
                coverImage: updatedCover
            });

            setActiveManageAlbum(prev => ({
                ...prev,
                images: updatedImages,
                coverImage: updatedCover
            }));

            setAppendFiles([]);
            console.log("✅ [ManageGallery] Appended new photos to album.");
        } catch (error) {
            console.error("❌ [ManageGallery] Error appending photos:", error);
            alert("Failed to append photos. Check console logs.");
        } finally {
            setIsAppending(false);
            setUploadProgress({ current: 0, total: 0 });
            setUploadStatusMessage('');
        }
    };

    // 7. Delete Entire Gallery Album
    const handleDeleteAlbum = async (id, eventName) => {
        if (window.confirm(`Are you sure you want to delete the entire gallery album for "${eventName}"?`)) {
            console.log(`➡️ [ManageGallery] Deleting gallery document ID: ${id}`);
            try {
                const albumToDelete = gallery?.find(g => g.id === id);
                if (albumToDelete?.images && Array.isArray(albumToDelete.images)) {
                    albumToDelete.images.forEach(imgUrl => deleteImageFromStorage(imgUrl));
                } else if (albumToDelete?.image) {
                    deleteImageFromStorage(albumToDelete.image);
                }
                await deleteGalleryPhoto(id);
                console.log(`✅ [ManageGallery] Album "${eventName}" deleted successfully.`);
            } catch (error) {
                console.error("❌ [ManageGallery] Error deleting album:", error);
                alert("Failed to delete gallery album: " + (error.message || "Unknown error"));
            }
        }
    };

    const filteredGallery = gallery?.filter(g => 
        g.eventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.venue?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="space-y-6 text-black font-sans">
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-[32px] border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#4285F4] text-white border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            {isEventsTeam ? 'Events Team Authorized' : 'Super Admin Authorized'}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#FFD700] text-black border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            HEIC & Cover Photo Ready 📸
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black uppercase text-black" style={{ WebkitTextStroke: '1px black' }}>
                        Gallery Management
                    </h1>
                    <p className="text-xs font-bold text-gray-600 uppercase mt-1">
                        Manage event albums, set primary cover images, append photos, and upload HEIC/JPEG files.
                    </p>
                </div>

                <button
                    onClick={openCreateModal}
                    className="px-6 py-3.5 rounded-2xl bg-[#4285F4] hover:bg-[#34A853] text-white font-black text-xs uppercase border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2"
                >
                    <span>➕</span>
                    <span>Upload New Album</span>
                </button>
            </div>

            {/* Search Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full relative">
                    <input
                        type="text"
                        placeholder="Search gallery by event name or venue..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 pl-10 rounded-2xl bg-white border-[3px] border-black text-black font-bold text-xs focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                    />
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black text-sm">🔍</span>
                </div>
            </div>

            {/* Gallery Albums Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGallery.map((g) => {
                    const photoList = g.images && Array.isArray(g.images) ? g.images : (g.image ? [g.image] : []);
                    const activeCover = g.coverImage || photoList[0] || '';
                    const photoCount = photoList.length;

                    return (
                        <motion.div
                            layout
                            key={g.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white border-[3px] border-black rounded-[28px] overflow-hidden flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all group"
                        >
                            <div>
                                {/* Cover Image Container */}
                                <div className="h-52 bg-gray-200 relative border-b-[3px] border-black overflow-hidden flex items-center justify-center">
                                    {activeCover ? (
                                        <img
                                            src={activeCover}
                                            alt={g.eventName}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 font-bold text-xs uppercase">
                                            No Photos
                                        </div>
                                    )}

                                    {/* Cover Badge */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-[#FFD700] text-black border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                                            <span>⭐</span> Cover Photo
                                        </span>
                                    </div>

                                    {/* Photo Count Badge */}
                                    <div className="absolute top-3 right-3">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-white text-black border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            📸 {photoCount} Photos
                                        </span>
                                    </div>

                                    {/* Hover Quick Change Cover Button */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => openManagePhotosModal(g)}
                                            className="px-4 py-2 rounded-xl bg-[#4285F4] text-white border-[2px] border-black text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-all cursor-pointer flex items-center gap-1.5"
                                        >
                                            <span>🖼️</span> Manage Photos & Cover
                                        </button>
                                    </div>
                                </div>

                                {/* Info Content */}
                                <div className="p-5 space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-black text-lg text-black uppercase tracking-tight line-clamp-1 group-hover:text-[#4285F4] transition-colors">
                                            {g.eventName}
                                        </h3>
                                        <button
                                            onClick={() => openEditMetadataModal(g)}
                                            className="text-xs text-gray-500 hover:text-black font-bold underline cursor-pointer shrink-0"
                                            title="Edit Event Title / Date / Venue"
                                        >
                                            ✏️ Edit Info
                                        </button>
                                    </div>

                                    <div className="space-y-1 text-xs font-bold text-gray-700">
                                        <p className="flex items-center gap-1.5">
                                            <span>🗓️</span> <span>{g.date || 'N/A'}</span>
                                        </p>
                                        <p className="flex items-center gap-1.5 truncate">
                                            <span>📍</span> <span>{g.venue || 'Main Campus'}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="p-4 bg-[#fcf9f1] border-t-[3px] border-black flex items-center justify-between gap-2">
                                <button
                                    onClick={() => openManagePhotosModal(g)}
                                    className="flex-1 py-2 px-3 rounded-xl bg-[#FFD700] hover:bg-black hover:text-white text-black border-[2px] border-black text-xs font-black uppercase flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                                >
                                    <span>🖼️</span> Photos ({photoCount}) & Cover
                                </button>

                                <button
                                    onClick={() => handleDeleteAlbum(g.id, g.eventName)}
                                    className="py-2 px-3 rounded-xl bg-[#EA4335] text-white border-[2px] border-black text-xs font-black uppercase flex items-center justify-center hover:bg-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                                    title="Delete entire album"
                                >
                                    🗑️
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {filteredGallery.length === 0 && (
                <div className="text-center py-16 bg-white rounded-[32px] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-gray-500 font-bold text-sm">No gallery albums found.</p>
                </div>
            )}

            {/* --- MODAL 1: CREATE NEW GALLERY ALBUM --- */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isSaving && setIsCreateModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-xl bg-white border-[3.5px] border-black rounded-[36px] p-6 md:p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] z-10 text-black max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between pb-4 mb-6 border-b-[3px] border-black">
                                <div>
                                    <h2 className="text-2xl font-black uppercase text-black">
                                        Upload New Gallery Album
                                    </h2>
                                    <p className="text-xs font-bold text-gray-600">
                                        Select photos or a folder of images to upload.
                                    </p>
                                </div>
                                <button
                                    onClick={() => !isSaving && setIsCreateModalOpen(false)}
                                    disabled={isSaving}
                                    className="p-2.5 rounded-2xl bg-[#FFD700] hover:bg-black hover:text-white border-[2.5px] border-black font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer disabled:opacity-50"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleCreateGallery} className="space-y-4 font-sans">
                                <div>
                                    <label className="block text-xs font-black uppercase text-black mb-1">
                                        Event Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.eventName}
                                        onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                                        placeholder="e.g. Ideathon 2026"
                                        disabled={isSaving}
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] disabled:opacity-75"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-black uppercase text-black mb-1">
                                            Venue
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.venue}
                                            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                            placeholder="Auditorium"
                                            disabled={isSaving}
                                            className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white disabled:opacity-75"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase text-black mb-1">
                                            Date *
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            disabled={isSaving}
                                            className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white disabled:opacity-75"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="text-xs font-black uppercase text-black">
                                            Select Images / Folder *
                                        </label>
                                        <div className="flex gap-1 bg-[#fcf9f1] p-1 rounded-xl border-[2px] border-black">
                                            <button
                                                type="button"
                                                onClick={() => { setUploadMode('files'); setSelectedFiles([]); }}
                                                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase transition-all ${uploadMode === 'files' ? 'bg-[#4285F4] text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' : 'text-gray-600 hover:text-black'}`}
                                            >
                                                Files
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => { setUploadMode('folder'); setSelectedFiles([]); }}
                                                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase transition-all ${uploadMode === 'folder' ? 'bg-[#4285F4] text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' : 'text-gray-600 hover:text-black'}`}
                                            >
                                                Folder
                                            </button>
                                        </div>
                                    </div>

                                    <div className="w-full px-4 py-4 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black border-dashed flex flex-col items-center justify-center gap-2">
                                        {uploadMode === 'folder' ? (
                                            <input
                                                type="file"
                                                webkitdirectory="true"
                                                directory="true"
                                                multiple
                                                onChange={handleFileSelect}
                                                accept="image/*,.heic,.HEIC,.heif,.HEIF"
                                                disabled={isSaving}
                                                className="w-full text-xs font-bold text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-[2px] file:border-black file:text-xs file:font-black file:bg-[#FFD700] file:text-black hover:file:bg-black hover:file:text-white cursor-pointer file:cursor-pointer transition-all disabled:opacity-75"
                                            />
                                        ) : (
                                            <input
                                                type="file"
                                                multiple
                                                onChange={handleFileSelect}
                                                accept="image/*,.heic,.HEIC,.heif,.HEIF"
                                                disabled={isSaving}
                                                className="w-full text-xs font-bold text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-[2px] file:border-black file:text-xs file:font-black file:bg-[#FFD700] file:text-black hover:file:bg-black hover:file:text-white cursor-pointer file:cursor-pointer transition-all disabled:opacity-75"
                                            />
                                        )}
                                        
                                        <div className="flex flex-wrap items-center justify-between w-full pt-1 text-[11px] font-bold text-gray-500 border-t border-gray-300">
                                            <span>Format: JPG, PNG, WEBP, HEIC, HEIF</span>
                                            <span className="px-2 py-0.5 rounded-md bg-[#FFD700] text-black font-black text-[9px] uppercase border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                                HEIC Ready ⚡
                                            </span>
                                        </div>

                                        {selectedFiles.length > 0 && (
                                            <p className="text-xs font-black text-[#34A853] mt-1">
                                                ✓ {selectedFiles.length} image(s) selected
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {isSaving && (
                                    <div className="pt-2">
                                        <div className="w-full h-4 bg-gray-200 rounded-full border-[2px] border-black overflow-hidden relative">
                                            <div 
                                                className="h-full bg-[#34A853] transition-all duration-300"
                                                style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-xs font-bold text-center mt-1 text-black">
                                            {uploadStatusMessage || `Uploading: ${uploadProgress.current} / ${uploadProgress.total}`}
                                        </p>
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 pt-4 border-t-[3px] border-black">
                                    <button
                                        type="button"
                                        onClick={() => !isSaving && setIsCreateModalOpen(false)}
                                        disabled={isSaving}
                                        className="px-5 py-2.5 rounded-2xl bg-gray-200 hover:bg-gray-300 text-black font-black text-xs uppercase border-[2px] border-black cursor-pointer disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving || selectedFiles.length === 0}
                                        className={`px-6 py-2.5 rounded-2xl bg-[#4285F4] hover:bg-[#34A853] text-white font-black text-xs uppercase border-[2.5px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${(isSaving || selectedFiles.length === 0) ? 'opacity-75 cursor-not-allowed' : 'hover:translate-x-0.5 hover:-translate-y-0.5'}`}
                                    >
                                        {isSaving ? 'Uploading...' : 'Publish Album'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- MODAL 2: EDIT METADATA (NAME, DATE, VENUE) --- */}
            <AnimatePresence>
                {editingAlbum && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isSaving && setEditingAlbum(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-white border-[3.5px] border-black rounded-[36px] p-6 md:p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] z-10 text-black"
                        >
                            <div className="flex items-center justify-between pb-4 mb-6 border-b-[3px] border-black">
                                <div>
                                    <h2 className="text-xl font-black uppercase text-black">
                                        Edit Album Details
                                    </h2>
                                    <p className="text-xs font-bold text-gray-600">
                                        Update Event Name, Venue, or Date.
                                    </p>
                                </div>
                                <button
                                    onClick={() => !isSaving && setEditingAlbum(null)}
                                    disabled={isSaving}
                                    className="p-2 rounded-xl bg-[#FFD700] hover:bg-black hover:text-white border-[2px] border-black font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSaveMetadata} className="space-y-4 font-sans">
                                <div>
                                    <label className="block text-xs font-black uppercase text-black mb-1">
                                        Event Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.eventName}
                                        onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                                        disabled={isSaving}
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase text-black mb-1">
                                        Venue
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.venue}
                                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                        disabled={isSaving}
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase text-black mb-1">
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        disabled={isSaving}
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t-[3px] border-black">
                                    <button
                                        type="button"
                                        onClick={() => !isSaving && setEditingAlbum(null)}
                                        disabled={isSaving}
                                        className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-black font-black text-xs uppercase border-[2px] border-black cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="px-5 py-2 rounded-xl bg-[#4285F4] hover:bg-[#34A853] text-white font-black text-xs uppercase border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- MODAL 3: MANAGE PHOTOS & COVER IMAGE MANAGER --- */}
            <AnimatePresence>
                {activeManageAlbum && (() => {
                    const albumPhotos = activeManageAlbum.images && Array.isArray(activeManageAlbum.images)
                        ? activeManageAlbum.images
                        : (activeManageAlbum.image ? [activeManageAlbum.image] : []);
                    const currentActiveCover = activeManageAlbum.coverImage || albumPhotos[0] || '';

                    return (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => !isAppending && !isDeletingBulk && setActiveManageAlbum(null)}
                                className="absolute inset-0 bg-black/70 backdrop-blur-xs"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative w-full max-w-4xl bg-white border-[3.5px] border-black rounded-[36px] p-6 md:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] z-10 text-black max-h-[90vh] flex flex-col justify-between overflow-hidden"
                            >
                                {/* Modal Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b-[3px] border-black gap-3 shrink-0">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#4285F4] text-white border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                                Album Manager
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-gray-100 text-black border border-black">
                                                📸 {albumPhotos.length} Photos
                                            </span>
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-black uppercase text-black truncate">
                                            {activeManageAlbum.eventName}
                                        </h2>
                                    </div>

                                    <button
                                        onClick={() => !isAppending && !isDeletingBulk && setActiveManageAlbum(null)}
                                        disabled={isAppending || isDeletingBulk}
                                        className="self-end sm:self-center p-2.5 rounded-2xl bg-[#FFD700] hover:bg-black hover:text-white border-[2.5px] border-black font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer disabled:opacity-50"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Modal Scrollable Body */}
                                <div className="flex-1 overflow-y-auto space-y-5 pr-1">
                                    
                                    {/* Multi-Select & Bulk Actions Bar */}
                                    <div className="p-3 bg-[#fcf9f1] border-[2.5px] border-black rounded-2xl flex flex-wrap items-center justify-between gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={handleSelectAllPhotos}
                                                className="px-3 py-1.5 rounded-xl bg-white hover:bg-black hover:text-white text-black font-black text-[11px] uppercase border-[2px] border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                                            >
                                                {selectedPhotoUrls.length === albumPhotos.length && albumPhotos.length > 0 
                                                    ? 'Deselect All' 
                                                    : `Select All (${albumPhotos.length})`}
                                            </button>
                                            
                                            {selectedPhotoUrls.length > 0 && (
                                                <span className="px-2.5 py-1 rounded-lg bg-[#4285F4] text-white font-black text-[11px] uppercase border border-black">
                                                    {selectedPhotoUrls.length} Selected
                                                </span>
                                            )}
                                        </div>

                                        {selectedPhotoUrls.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    disabled={isDeletingBulk}
                                                    onClick={handleDeleteSelectedPhotos}
                                                    className="px-3.5 py-1.5 rounded-xl bg-[#EA4335] hover:bg-black text-white font-black text-[11px] uppercase border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                                                >
                                                    <span>🗑️</span>
                                                    <span>{isDeletingBulk ? 'Deleting...' : `Delete Selected (${selectedPhotoUrls.length})`}</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedPhotoUrls([])}
                                                    className="px-2.5 py-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-black font-black text-[11px] uppercase border border-black cursor-pointer"
                                                >
                                                    Clear
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Photos Grid */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-xs font-black uppercase text-black flex items-center gap-2">
                                                <span>🖼️</span> Album Photos ({albumPhotos.length})
                                            </h3>
                                            <span className="text-[11px] font-bold text-gray-500">
                                                Click any photo to toggle selection, or use the delete button.
                                            </span>
                                        </div>

                                        {albumPhotos.length > 0 ? (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                                {albumPhotos.map((imgUrl, idx) => {
                                                    const isCurrentCover = currentActiveCover === imgUrl;
                                                    const isSelected = selectedPhotoUrls.includes(imgUrl);

                                                    return (
                                                        <div
                                                            key={idx}
                                                            className={`relative rounded-2xl overflow-hidden border-[2.5px] border-black bg-gray-100 aspect-[4/3] group shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${
                                                                isSelected 
                                                                    ? 'ring-4 ring-[#EA4335] scale-[0.98]' 
                                                                    : isCurrentCover 
                                                                        ? 'ring-4 ring-[#FFD700]' 
                                                                        : ''
                                                            }`}
                                                        >
                                                            <img
                                                                src={imgUrl}
                                                                alt={`Album photo ${idx + 1}`}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />

                                                            {/* Checkbox Overlay (Top Left - Always Clickable) */}
                                                            <div className="absolute top-2 left-2 z-20">
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleToggleSelectPhoto(imgUrl);
                                                                    }}
                                                                    className={`w-6 h-6 rounded-lg border-[2px] border-black flex items-center justify-center font-black text-xs shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-all ${
                                                                        isSelected 
                                                                            ? 'bg-[#EA4335] text-white' 
                                                                            : 'bg-white/90 text-transparent hover:text-gray-400'
                                                                    }`}
                                                                    title={isSelected ? 'Deselect photo' : 'Select photo for bulk deletion'}
                                                                >
                                                                    ✓
                                                                </button>
                                                            </div>

                                                            {/* Delete Button (Top Right - Always Visible & Clickable) */}
                                                            <div className="absolute top-2 right-2 z-20">
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleDeleteSinglePhoto(activeManageAlbum, imgUrl);
                                                                    }}
                                                                    className="p-1.5 rounded-lg bg-[#EA4335] hover:bg-black text-white border-[1.5px] border-black text-[11px] font-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
                                                                    title="Delete this photo"
                                                                >
                                                                    🗑️
                                                                </button>
                                                            </div>

                                                            {/* Cover Status Badge or Set as Cover Button */}
                                                            <div className="absolute bottom-2 left-2 right-2 z-20">
                                                                {isCurrentCover ? (
                                                                    <div className="w-full py-1 rounded-xl bg-[#FFD700] text-black border-[1.5px] border-black font-black text-[9px] uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-center">
                                                                        ⭐ ACTIVE COVER
                                                                    </div>
                                                                ) : (
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleSetCoverImage(activeManageAlbum, imgUrl);
                                                                        }}
                                                                        className="w-full py-1 rounded-xl bg-white/90 hover:bg-[#FFD700] text-black border-[1.5px] border-black font-black text-[9px] uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer text-center backdrop-blur-xs"
                                                                    >
                                                                        ⭐ Set as Cover
                                                                    </button>
                                                                )}
                                                            </div>

                                                            {/* Selection Backdrop */}
                                                            {isSelected && (
                                                                <div className="absolute inset-0 bg-[#EA4335]/25 pointer-events-none z-10" />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 bg-gray-50 border-[2px] border-dashed border-gray-300 rounded-2xl text-xs font-bold text-gray-500">
                                                No photos in this album. Append new photos below.
                                            </div>
                                        )}
                                    </div>

                                    {/* Append New Photos Section */}
                                    <div className="pt-4 border-t-[2.5px] border-black space-y-3">
                                        <h3 className="text-xs font-black uppercase text-black flex items-center gap-2">
                                            <span>➕</span> Add More Photos to this Album
                                        </h3>

                                        <form onSubmit={handleAppendPhotos} className="space-y-3">
                                            <div className="w-full px-4 py-3 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black border-dashed flex flex-col items-center justify-center gap-2">
                                                <input
                                                    type="file"
                                                    multiple
                                                    onChange={handleAppendFileSelect}
                                                    accept="image/*,.heic,.HEIC,.heif,.HEIF"
                                                    disabled={isAppending}
                                                    className="w-full text-xs font-bold text-gray-700 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-[2px] file:border-black file:text-xs file:font-black file:bg-[#FFD700] file:text-black hover:file:bg-black hover:file:text-white cursor-pointer transition-all disabled:opacity-75"
                                                />
                                                {appendFiles.length > 0 && (
                                                    <p className="text-xs font-black text-[#34A853]">
                                                        ✓ {appendFiles.length} photo(s) selected to append
                                                    </p>
                                                )}
                                            </div>

                                            {isAppending && (
                                                <div className="pt-1">
                                                    <div className="w-full h-3 bg-gray-200 rounded-full border border-black overflow-hidden relative">
                                                        <div 
                                                            className="h-full bg-[#34A853] transition-all duration-300"
                                                            style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                                                        />
                                                    </div>
                                                    <p className="text-[11px] font-bold text-center mt-1 text-black">
                                                        {uploadStatusMessage || `Uploading: ${uploadProgress.current} / ${uploadProgress.total}`}
                                                    </p>
                                                </div>
                                            )}

                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    disabled={isAppending || appendFiles.length === 0}
                                                    className={`px-5 py-2 rounded-xl bg-[#34A853] hover:bg-black text-white font-black text-xs uppercase border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
                                                        (isAppending || appendFiles.length === 0) ? 'opacity-50 cursor-not-allowed' : 'hover:translate-x-0.5 hover:-translate-y-0.5'
                                                    }`}
                                                >
                                                    {isAppending ? 'Uploading...' : 'Upload & Append Photos'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="pt-4 mt-4 border-t-[3px] border-black flex justify-end shrink-0">
                                    <button
                                        onClick={() => setActiveManageAlbum(null)}
                                        className="px-6 py-2.5 rounded-2xl bg-black text-white font-black text-xs uppercase border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-gray-800 transition-all"
                                    >
                                        Done Managing Album
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    );
                })()}
            </AnimatePresence>
        </div>
    );
}
