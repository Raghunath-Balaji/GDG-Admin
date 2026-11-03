import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../core/context/AuthContext';
import { ImageUploadDropzone } from '../../components/common/ImageUploadDropzone';
import { getCollectionData, addDocument, updateDocument, deleteDocument } from '../../fbconnect/services';

// Blogs live in the Firestore `blogs` collection and are shown on the public site at /blog
const COLLECTION = 'blogs';

const emptyForm = () => ({
    title: '',
    author: '',
    authorRole: '',
    authorImage: '',
    coverImage: '',
    date: new Date().toISOString().split('T')[0],
    tags: '',
    excerpt: '',
    content: '',
    externalUrl: '',
    published: true
});

const inputClass = "w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]";
const labelClass = "block text-xs font-black uppercase text-black mb-1";

const toTagList = (tags) => (Array.isArray(tags) ? tags : String(tags || '').split(','))
    .map(t => String(t).trim())
    .filter(Boolean);

export default function ManageBlogs() {
    const { isEventsTeam } = useAuth();

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState(emptyForm());
    const [isSaving, setIsSaving] = useState(false);

    const loadBlogs = async () => {
        try {
            setLoading(true);
            const data = await getCollectionData(COLLECTION);
            data.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
            setBlogs(data);
            setLoadError('');
        } catch (error) {
            console.error("❌ [ManageBlogs] Error loading blogs:", error);
            setLoadError('Could not load blogs from Firestore. Check your connection and permissions.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBlogs();
    }, []);

    const openAddModal = () => {
        setEditingBlog(null);
        setFormData(emptyForm());
        setIsModalOpen(true);
    };

    const openEditModal = (blog) => {
        setEditingBlog(blog);
        setFormData({ ...emptyForm(), ...blog, tags: toTagList(blog.tags).join(', ') });
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const { id, ...rest } = formData;
            const payload = {
                ...rest,
                title: rest.title.trim(),
                author: rest.author.trim(),
                tags: toTagList(rest.tags),
                published: rest.published !== false,
                updatedAt: new Date().toISOString()
            };

            if (editingBlog) {
                await updateDocument(COLLECTION, editingBlog.id, payload);
            } else {
                await addDocument(COLLECTION, { ...payload, createdAt: new Date().toISOString() });
            }

            setIsModalOpen(false);
            await loadBlogs();
        } catch (error) {
            console.error("❌ [ManageBlogs] Error saving blog:", error);
            alert("Failed to save blog. If you uploaded large images, try smaller ones (Firestore allows about 1 MB per blog).");
        } finally {
            setIsSaving(false);
        }
    };

    const togglePublished = async (blog) => {
        try {
            await updateDocument(COLLECTION, blog.id, { published: blog.published === false });
            await loadBlogs();
        } catch (error) {
            console.error("❌ [ManageBlogs] Error updating publish status:", error);
            alert("Failed to update publish status.");
        }
    };

    const handleDelete = async (blog) => {
        if (!window.confirm(`Are you sure you want to delete "${blog.title}"?`)) return;
        try {
            await deleteDocument(COLLECTION, blog.id);
            await loadBlogs();
        } catch (error) {
            console.error("❌ [ManageBlogs] Error deleting blog:", error);
            alert("Failed to delete blog.");
        }
    };

    const filteredBlogs = blogs.filter(b => {
        const q = searchTerm.toLowerCase();
        return String(b.title || '').toLowerCase().includes(q) || String(b.author || '').toLowerCase().includes(q);
    });

    return (
        <div className="space-y-6 text-black">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-[32px] border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#EA4335] text-white border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            {isEventsTeam ? 'Events Team Authorized' : 'Super Admin Authorized'}
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black uppercase text-black" style={{ WebkitTextStroke: '1px black' }}>
                        Student Blogs
                    </h1>
                    <p className="text-xs font-bold text-gray-600 uppercase mt-1">
                        Upload student blogs. Published blogs appear on the website's Blog page instantly.
                    </p>
                </div>

                <button
                    onClick={openAddModal}
                    className="px-6 py-3.5 rounded-2xl bg-[#4285F4] hover:bg-[#34A853] text-white font-black text-xs uppercase border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2"
                >
                    <span>➕</span>
                    <span>Add New Blog</span>
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search blogs by title or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-10 rounded-2xl bg-white border-[3px] border-black text-black font-bold text-xs focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black text-sm">🔍</span>
            </div>

            {loadError && (
                <div className="p-4 rounded-2xl bg-[#EA4335] text-white border-[3px] border-black font-black text-xs uppercase">
                    {loadError}
                </div>
            )}

            {/* Blog Grid */}
            {loading ? (
                <div className="text-center py-16 bg-white rounded-[32px] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-gray-500 font-bold text-sm">Loading blogs...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBlogs.map((blog) => (
                        <motion.div
                            layout
                            key={blog.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white border-[3px] border-black rounded-[28px] overflow-hidden flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all group"
                        >
                            <div>
                                <div className="h-40 bg-[#4285F4] relative border-b-[3px] border-black overflow-hidden flex items-center justify-center">
                                    {blog.coverImage ? (
                                        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="px-6 text-center text-white font-black uppercase text-lg line-clamp-2">{blog.title}</span>
                                    )}
                                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${blog.published === false ? 'bg-gray-200 text-gray-700' : 'bg-[#34A853] text-white'}`}>
                                        {blog.published === false ? 'Hidden' : 'Published'}
                                    </span>
                                </div>

                                <div className="p-5 space-y-2">
                                    <h3 className="font-black text-lg text-black tracking-tight line-clamp-2">{blog.title}</h3>
                                    <p className="text-xs font-bold text-gray-700">
                                        ✍️ {blog.author || 'Unknown author'}{blog.date ? ` • ${blog.date}` : ''}
                                    </p>
                                    {toTagList(blog.tags).length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {toTagList(blog.tags).map(tag => (
                                                <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#fcf9f1] border-[1.5px] border-black">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-4 bg-[#fcf9f1] border-t-[3px] border-black flex items-center justify-between gap-2">
                                <button
                                    onClick={() => openEditModal(blog)}
                                    className="flex-1 py-2 px-3 rounded-xl bg-[#4285F4] text-white border-[2px] border-black text-xs font-black uppercase flex items-center justify-center gap-1.5 hover:bg-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => togglePublished(blog)}
                                    className="py-2 px-3 rounded-xl bg-[#FFD700] text-black border-[2px] border-black text-xs font-black uppercase hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                                    title={blog.published === false ? 'Show on website' : 'Hide from website'}
                                >
                                    {blog.published === false ? '👁️ Show' : '🙈 Hide'}
                                </button>
                                <button
                                    onClick={() => handleDelete(blog)}
                                    className="py-2 px-3 rounded-xl bg-[#EA4335] text-white border-[2px] border-black text-xs font-black uppercase hover:bg-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                                    title="Delete blog"
                                >
                                    🗑️
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {!loading && filteredBlogs.length === 0 && (
                <div className="text-center py-16 bg-white rounded-[32px] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-gray-500 font-bold text-sm">
                        {blogs.length === 0 ? 'No blogs yet. Click "Add New Blog" to upload the first one.' : 'No blogs match your search.'}
                    </p>
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
                                        {editingBlog ? 'Edit Blog' : 'Add New Blog'}
                                    </h2>
                                    <p className="text-xs font-bold text-gray-600">
                                        Saved blogs are published live instantly (unless hidden).
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
                                    <label className={labelClass}>Blog Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. How I Built My First Android App"
                                        className={inputClass}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <label className={labelClass}>Student Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.author}
                                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                            placeholder="e.g. Priya S"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Year / Department</label>
                                        <input
                                            type="text"
                                            value={formData.authorRole}
                                            onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                                            placeholder="e.g. II Year, AI & DS"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Date *</label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        placeholder="e.g. Android, Kotlin, Beginner"
                                        className={inputClass}
                                    />
                                </div>

                                <ImageUploadDropzone
                                    value={formData.coverImage}
                                    onChange={(newImg) => setFormData({ ...formData, coverImage: newImg })}
                                    label="Cover Image (optional)"
                                    required={false}
                                    aspectRatio="banner"
                                    helpText="Shown at the top of the blog card and post. Leave empty for a coloured title card."
                                />

                                <ImageUploadDropzone
                                    value={formData.authorImage}
                                    onChange={(newImg) => setFormData({ ...formData, authorImage: newImg })}
                                    label="Student Photo (optional)"
                                    required={false}
                                    aspectRatio="square"
                                    helpText="Leave empty to show the first letter of the student's name."
                                />

                                <div>
                                    <label className={labelClass}>Short Summary</label>
                                    <textarea
                                        rows={2}
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        placeholder="One or two lines shown on the blog card. Leave empty to use the start of the blog."
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Blog Content *</label>
                                    <textarea
                                        rows={12}
                                        required
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        placeholder={"Paste the full blog here.\n\nLeave a blank line between paragraphs.\n## Start a line with ## for a heading\n- Start lines with - for bullet points"}
                                        className={`${inputClass} font-medium leading-relaxed`}
                                    />
                                    <p className="text-[10px] font-bold text-gray-500 mt-1">
                                        Blank line = new paragraph • "## " = heading • "- " = bullet point
                                    </p>
                                </div>

                                <div>
                                    <label className={labelClass}>Original Blog Link (optional)</label>
                                    <input
                                        type="url"
                                        value={formData.externalUrl}
                                        onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                                        placeholder="https://medium.com/@student/..."
                                        className={inputClass}
                                    />
                                </div>

                                <label className="flex items-center gap-3 p-3 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.published !== false}
                                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                        className="w-5 h-5 accent-[#34A853]"
                                    />
                                    <span className="text-xs font-black uppercase">Publish on website</span>
                                </label>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-3 rounded-2xl bg-white border-[3px] border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-1 py-3 rounded-2xl bg-[#34A853] text-white border-[3px] border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer disabled:opacity-60"
                                    >
                                        {isSaving ? 'Saving...' : editingBlog ? 'Save Changes' : 'Publish Blog'}
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
