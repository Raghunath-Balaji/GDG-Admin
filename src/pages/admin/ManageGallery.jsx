import { useState } from 'react';
import { useContentContext } from '../../core/context/ContentContext';
import { useAuth } from '../../core/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadImage } from '../../fbconnect/services';

export default function ManageGallery() {
    const { gallery, addGalleryPhoto, deleteGalleryPhoto } = useContentContext();
    const { isEventsTeam } = useAuth();

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // We only support creating or deleting gallery events for simplicity, 
    // appending to an existing one is handled by checking if it exists (by event name)
    const [formData, setFormData] = useState({
        eventName: '',
        venue: '',
        date: new Date().toISOString().split('T')[0],
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    
    const [isSaving, setIsSaving] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });

    const openAddModal = () => {
        setFormData({
            eventName: '',
            venue: '',
            date: new Date().toISOString().split('T')[0],
        });
        setSelectedFiles([]);
        setUploadProgress({ current: 0, total: 0 });
        setIsModalOpen(true);
    };

    const handleFolderSelect = (e) => {
        const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
        setSelectedFiles(files);
        console.log(`➡️ [ManageGallery] Selected ${files.length} images from folder.`);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        if (!formData.eventName) {
            alert("Event Name is required.");
            return;
        }

        if (selectedFiles.length === 0) {
            alert("Please select a folder containing images.");
            return;
        }

        setIsSaving(true);
        console.log(`➡️ [ManageGallery] Starting gallery upload for event: ${formData.eventName}`);
        setUploadProgress({ current: 0, total: selectedFiles.length });

        try {
            const uploadedUrls = [];
            const safeEventName = formData.eventName.replace(/[^a-zA-Z0-9-_\s]/g, '').trim();

            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                console.log(`➡️ [ManageGallery] Uploading file ${i + 1}/${selectedFiles.length}: ${file.name}`);
                
                // Upload to Firebase Storage: gallery/[event name]/[filename]
                const path = `gallery/${safeEventName}/${Date.now()}_${file.name}`;
                const url = await uploadImage(file, path);
                
                uploadedUrls.push(url);
                setUploadProgress({ current: i + 1, total: selectedFiles.length });
                console.log(`✅ [ManageGallery] Uploaded successfully: ${url}`);
            }

            const galleryDoc = {
                id: 'gallery-' + Date.now(),
                eventName: formData.eventName,
                venue: formData.venue,
                date: formData.date,
                images: uploadedUrls,
            };

            console.log("➡️ [ManageGallery] Saving gallery document to Firestore:", galleryDoc);
            await addGalleryPhoto(galleryDoc);
            
            console.log("✅ [ManageGallery] Gallery saved successfully.");
            setIsModalOpen(false);
        } catch (error) {
            console.error("❌ [ManageGallery] Error uploading gallery:", error);
            alert("Failed to upload gallery. Please check console logs.");
        } finally {
            setIsSaving(false);
            setUploadProgress({ current: 0, total: 0 });
        }
    };

    const handleDelete = (id, eventName) => {
        if (window.confirm(`Are you sure you want to delete the gallery for "${eventName}"? Note: This only deletes the document, not the images from Firebase Storage.`)) {
            console.log(`➡️ [ManageGallery] Deleting gallery document ID: ${id}`);
            deleteGalleryPhoto(id);
        }
    };

    const filteredGallery = gallery?.filter(g => 
        g.eventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.venue?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="space-y-6 text-black">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-[32px] border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#4285F4] text-white border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            {isEventsTeam ? 'Events Team Authorized' : 'Super Admin Authorized'}
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black uppercase text-black" style={{ WebkitTextStroke: '1px black' }}>
                        Gallery Management
                    </h1>
                    <p className="text-xs font-bold text-gray-600 uppercase mt-1">
                        Upload folders of images to Firebase Storage, categorized by Event Name.
                    </p>
                </div>

                <button
                    onClick={openAddModal}
                    className="px-6 py-3.5 rounded-2xl bg-[#4285F4] hover:bg-[#34A853] text-white font-black text-xs uppercase border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2"
                >
                    <span>➕</span>
                    <span>Upload New Gallery</span>
                </button>
            </div>

            {/* Controls Bar */}
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

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGallery.map((g) => (
                    <motion.div
                        layout
                        key={g.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white border-[3px] border-black rounded-[28px] overflow-hidden flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all group"
                    >
                        <div>
                            {/* Image Header */}
                            <div className="h-48 bg-gray-200 relative border-b-[3px] border-black overflow-hidden flex flex-wrap">
                                {g.images && g.images.length > 0 ? (
                                    <img
                                        src={g.images[0]}
                                        alt={g.eventName}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 font-bold">
                                        No Images
                                    </div>
                                )}

                                <div className="absolute top-3 left-3 flex gap-2">
                                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-[#FFD700] text-black border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        📸 {g.images?.length || 0} Photos
                                    </span>
                                </div>
                            </div>

                            {/* Info Content */}
                            <div className="p-5 space-y-3">
                                <h3 className="font-black text-lg text-black uppercase tracking-tight line-clamp-1 group-hover:text-[#4285F4] transition-colors">
                                    {g.eventName}
                                </h3>

                                <div className="space-y-1 text-xs font-bold text-gray-700">
                                    <p className="flex items-center gap-1.5">
                                        <span>🗓️</span> <span>{g.date}</span>
                                    </p>
                                    <p className="flex items-center gap-1.5 truncate">
                                        <span>📍</span> <span>{g.venue}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="p-4 bg-[#fcf9f1] border-t-[3px] border-black flex items-center justify-end gap-2">
                            <button
                                onClick={() => handleDelete(g.id, g.eventName)}
                                className="py-2 px-4 rounded-xl bg-[#EA4335] text-white border-[2px] border-black text-xs font-black uppercase flex items-center justify-center hover:bg-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                                title="Delete gallery event"
                            >
                                🗑️ Delete Event Gallery
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredGallery.length === 0 && (
                <div className="text-center py-16 bg-white rounded-[32px] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-gray-500 font-bold text-sm">No gallery items found.</p>
                </div>
            )}

            {/* Upload Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isSaving && setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-xl bg-white border-[3.5px] border-black rounded-[36px] p-6 md:p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] z-10 text-black"
                        >
                            <div className="flex items-center justify-between pb-4 mb-6 border-b-[3px] border-black">
                                <div>
                                    <h2 className="text-2xl font-black uppercase text-black">
                                        Upload Gallery
                                    </h2>
                                    <p className="text-xs font-bold text-gray-600">
                                        Select a folder of images to upload.
                                    </p>
                                </div>
                                <button
                                    onClick={() => !isSaving && setIsModalOpen(false)}
                                    disabled={isSaving}
                                    className="p-2.5 rounded-2xl bg-[#FFD700] hover:bg-black hover:text-white border-[2.5px] border-black font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer disabled:opacity-50"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="space-y-4 font-sans">
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
                                    <label className="block text-xs font-black uppercase text-black mb-1">
                                        Select Image Folder *
                                    </label>
                                    <div className="w-full px-4 py-4 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black border-dashed flex flex-col items-center justify-center gap-2">
                                        <input
                                            type="file"
                                            webkitdirectory="true"
                                            directory="true"
                                            multiple
                                            onChange={handleFolderSelect}
                                            disabled={isSaving}
                                            className="w-full text-xs font-bold text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-[2px] file:border-black file:text-xs file:font-black file:bg-[#FFD700] file:text-black hover:file:bg-black hover:file:text-white cursor-pointer file:cursor-pointer transition-all disabled:opacity-75"
                                        />
                                        {selectedFiles.length > 0 && (
                                            <p className="text-xs font-black text-[#34A853]">
                                                {selectedFiles.length} image(s) selected
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
                                        <p className="text-xs font-bold text-center mt-1">
                                            Uploading: {uploadProgress.current} / {uploadProgress.total}
                                        </p>
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 pt-4 border-t-[3px] border-black">
                                    <button
                                        type="button"
                                        onClick={() => !isSaving && setIsModalOpen(false)}
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
                                        {isSaving ? 'Uploading...' : 'Publish Gallery'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
