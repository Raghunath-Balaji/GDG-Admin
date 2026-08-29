import { useState } from 'react';
import { useContentContext } from '../../core/context/ContentContext';
import { useAuth } from '../../core/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageUploadDropzone } from '../../components/common/ImageUploadDropzone';

const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

export default function ManageEvents() {
    const { events, addEvent, editEvent, deleteEvent } = useContentContext();
    const { isEventsTeam } = useAuth();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [posterFile, setPosterFile] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        date: '',
        time: '',
        venue: '',
        category: 'workshop',
        summary: '',
        details: '',
        image: '/images/activities-img/ai-automation-thumbnail.jpeg',
        posterImage: '',
        registerUrl: '',
        resourcesUrl: '',
        featured: false
    });

    const categories = [
        { id: 'workshop', label: 'Workshop' },
        { id: 'hackathon', label: 'Hackathon' },
        { id: 'cloud', label: 'Cloud & DevOps' },
        { id: 'web', label: 'Web Tech' },
        { id: 'ml', label: 'AI / Machine Learning' }
    ];

    const openAddModal = () => {
        setEditingEvent(null);
        setPosterFile(null);
        setFormData({
            id: 'event-' + Date.now(),
            title: '',
            date: new Date().toISOString().split('T')[0],
            time: '10:00 AM – 1:00 PM',
            venue: 'Chennai Institute of Technology',
            category: 'workshop',
            summary: '',
            details: '',
            image: '/images/activities-img/ai-automation-thumbnail.jpeg',
            posterImage: '',
            registerUrl: '',
            resourcesUrl: '',
            featured: false
        });
        setIsModalOpen(true);
    };

    const openEditModal = (eventItem) => {
        setEditingEvent(eventItem);
        setPosterFile(null);
        setFormData({ ...eventItem });
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        console.log("➡️ [ManageEvents] Starting save event process...");
        
        try {
            let imageUrl = formData.image;
            if (posterFile) {
                console.log("➡️ [ManageEvents] Poster file detected. Converting to Base64...");
                imageUrl = await fileToBase64(posterFile);
                console.log("✅ [ManageEvents] Base64 conversion successful.");
            } else {
                console.log("➡️ [ManageEvents] No new poster file detected. Using existing image URL/Base64.");
            }

            const finalData = { ...formData, image: imageUrl };
            console.log("➡️ [ManageEvents] Final Data to be saved:", { ...finalData, image: finalData.image.substring(0, 50) + "..." });

            if (editingEvent) {
                console.log(`➡️ [ManageEvents] Editing existing event ID: ${formData.id}`);
                await editEvent(formData.id, finalData);
            } else {
                console.log("➡️ [ManageEvents] Adding new event...");
                await addEvent(finalData);
            }

            console.log("✅ [ManageEvents] Event save flow completed successfully.");
            setIsModalOpen(false);
        } catch (error) {
            console.error("❌ [ManageEvents] Error saving event:", error);
            alert("Failed to save event. Please check the console logs to debug.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            deleteEvent(id);
        }
    };

    const filteredEvents = events?.filter(ev => {
        const matchesSearch = ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              ev.venue.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = selectedCategory === 'all' || ev.category === selectedCategory;
        return matchesSearch && matchesCat;
    }) || [];

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
                        Events Management
                    </h1>
                    <p className="text-xs font-bold text-gray-600 uppercase mt-1">
                        Add, edit, manage events, poster images, and featured status live on website.
                    </p>
                </div>

                <button
                    onClick={openAddModal}
                    className="px-6 py-3.5 rounded-2xl bg-[#4285F4] hover:bg-[#34A853] text-white font-black text-xs uppercase border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2"
                >
                    <span>➕</span>
                    <span>Create New Event</span>
                </button>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:flex-1 relative">
                    <input
                        type="text"
                        placeholder="Search events by title or venue..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 pl-10 rounded-2xl bg-white border-[3px] border-black text-black font-bold text-xs focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                    />
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black text-sm">🔍</span>
                </div>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-white border-[3px] border-black text-black font-black text-xs uppercase focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                    <option value="all">All Categories</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                </select>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((ev) => (
                    <motion.div
                        layout
                        key={ev.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white border-[3px] border-black rounded-[28px] overflow-hidden flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all group"
                    >
                        <div>
                            {/* Image Header */}
                            <div className="h-48 bg-gray-200 relative border-b-[3px] border-black overflow-hidden">
                                <img
                                    src={ev.image || '/images/activities-img/ai-automation-thumbnail.jpeg'}
                                    alt={ev.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800';
                                    }}
                                />

                                <div className="absolute top-3 left-3 flex gap-2">
                                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-white text-black border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        {ev.category}
                                    </span>
                                    {ev.featured && (
                                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-[#FFD700] text-black border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            ⭐ Featured
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Info Content */}
                            <div className="p-5 space-y-3">
                                <h3 className="font-black text-lg text-black uppercase tracking-tight line-clamp-1 group-hover:text-[#4285F4] transition-colors">
                                    {ev.title}
                                </h3>

                                <div className="space-y-1 text-xs font-bold text-gray-700">
                                    <p className="flex items-center gap-1.5">
                                        <span>🗓️</span> <span>{ev.date} • {ev.time}</span>
                                    </p>
                                    <p className="flex items-center gap-1.5 truncate">
                                        <span>📍</span> <span>{ev.venue}</span>
                                    </p>
                                </div>

                                <p className="text-xs font-medium text-gray-600 line-clamp-2 leading-relaxed">
                                    {ev.summary || ev.details}
                                </p>
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="p-4 bg-[#fcf9f1] border-t-[3px] border-black flex items-center justify-between gap-2">
                            <button
                                onClick={() => openEditModal(ev)}
                                className="flex-1 py-2 px-3 rounded-xl bg-[#4285F4] text-white border-[2px] border-black text-xs font-black uppercase flex items-center justify-center gap-1.5 hover:bg-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                            >
                                ✏️ Edit Event / Image
                            </button>

                            <button
                                onClick={() => handleDelete(ev.id, ev.title)}
                                className="py-2 px-3 rounded-xl bg-[#EA4335] text-white border-[2px] border-black text-xs font-black uppercase flex items-center justify-center hover:bg-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                                title="Delete event"
                            >
                                🗑️
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredEvents.length === 0 && (
                <div className="text-center py-16 bg-white rounded-[32px] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-gray-500 font-bold text-sm">No events found matching search criteria.</p>
                </div>
            )}

            {/* Create / Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-2xl max-h-[90vh] bg-white border-[3.5px] border-black rounded-[36px] p-6 md:p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-y-auto z-10 text-black"
                        >
                            <div className="flex items-center justify-between pb-4 mb-6 border-b-[3px] border-black">
                                <div>
                                    <h2 className="text-2xl font-black uppercase text-black">
                                        {editingEvent ? 'Edit Event Details' : 'Create New Event'}
                                    </h2>
                                    <p className="text-xs font-bold text-gray-600">
                                        Saved updates will be published live instantly.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2.5 rounded-2xl bg-[#FFD700] hover:bg-black hover:text-white border-[2.5px] border-black font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="space-y-4 font-sans">
                                <div>
                                    <label className="block text-xs font-black uppercase text-black mb-1">
                                        Event Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. Build Your AI-Powered Second Brain"
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs font-black uppercase text-black mb-1">
                                            Category
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                                        >
                                            {categories.map(c => (
                                                <option key={c.id} value={c.id}>{c.label}</option>
                                            ))}
                                        </select>
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
                                            className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase text-black mb-1">
                                            Time
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            placeholder="10:00 AM – 2:00 PM"
                                            className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase text-black mb-1">
                                        Venue
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.venue}
                                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                        placeholder="Seminar Hall, CIT Campus"
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                                    />
                                </div>

                                <ImageUploadDropzone
                                    value={formData.image}
                                    onChange={(newImg) => setFormData({ ...formData, image: newImg })}
                                    label="Event Card Image / Poster"
                                    aspectRatio="banner"
                                    helpText="Drag & drop any poster image here or browse from device."
                                />

                                <div>
                                    <label className="block text-xs font-black uppercase text-black mb-1">
                                        Summary Brief
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.summary}
                                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                        placeholder="Short 1-line event summary for cards"
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase text-black mb-1">
                                        Detailed Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={formData.details}
                                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                        placeholder="Full details regarding topics covered, registration rules, etc."
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-black uppercase text-black mb-1">
                                            Registration Link URL
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.registerUrl}
                                            onChange={(e) => setFormData({ ...formData, registerUrl: e.target.value })}
                                            placeholder="https://..."
                                            className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase text-black mb-1">
                                            Resources / Slides URL
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.resourcesUrl}
                                            onChange={(e) => setFormData({ ...formData, resourcesUrl: e.target.value })}
                                            placeholder="https://..."
                                            className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-5 h-5 rounded-lg bg-white border-[2.5px] border-black text-[#4285F4] focus:ring-0 cursor-pointer"
                                    />
                                    <label htmlFor="featured" className="text-xs font-black uppercase text-black cursor-pointer">
                                        ⭐ Mark as Featured Event (Highlights on Homepage & Event Hero)
                                    </label>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t-[3px] border-black">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-5 py-2.5 rounded-2xl bg-gray-200 hover:bg-gray-300 text-black font-black text-xs uppercase border-[2px] border-black cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className={`px-6 py-2.5 rounded-2xl bg-[#4285F4] hover:bg-[#34A853] text-white font-black text-xs uppercase border-[2.5px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${isSaving ? 'opacity-75 cursor-not-allowed' : 'hover:translate-x-0.5 hover:-translate-y-0.5'}`}
                                    >
                                        {isSaving ? 'Saving...' : (editingEvent ? 'Save Event Changes' : 'Publish Event')}
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
