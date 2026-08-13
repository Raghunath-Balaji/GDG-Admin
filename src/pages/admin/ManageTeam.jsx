import { useState } from 'react';
import { useContentContext } from '../../core/context/ContentContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ManageTeam() {
    const { team, addTeamMember, editTeamMember, deleteTeamMember } = useContentContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        role: '',
        bio: '',
        image: '/images/team/subhashree.jpeg',
        socials: {
            github: '',
            linkedin: '',
            instagram: ''
        }
    });

    const openAddModal = () => {
        setEditingMember(null);
        setFormData({
            id: 'member-' + Date.now(),
            name: '',
            role: '',
            bio: '',
            image: '/images/team/subhashree.jpeg',
            socials: {
                github: '',
                linkedin: '',
                instagram: ''
            }
        });
        setIsModalOpen(true);
    };

    const openEditModal = (member) => {
        setEditingMember(member);
        setFormData({
            ...member,
            socials: member.socials || { github: '', linkedin: '', instagram: '' }
        });
        setIsModalOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (editingMember) {
            editTeamMember(formData.id, formData);
        } else {
            addTeamMember(formData);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`Are you sure you want to remove ${name} from the core team list?`)) {
            deleteTeamMember(id);
        }
    };

    return (
        <div className="space-y-6 text-black">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-[32px] border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#EA4335] text-white border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            👑 Super Admin Exclusive
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black uppercase text-black" style={{ WebkitTextStroke: '1px black' }}>
                        Core Team Roster
                    </h1>
                    <p className="text-xs font-bold text-gray-600 uppercase mt-1">
                        Manage GDGoC organizers, vice presidents, team leads, bios, images, and social links.
                    </p>
                </div>

                <button
                    onClick={openAddModal}
                    className="px-6 py-3.5 rounded-2xl bg-[#EA4335] hover:bg-black text-white font-black text-xs uppercase border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2"
                >
                    <span>➕</span>
                    <span>Add Team Member</span>
                </button>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team?.map((member) => (
                    <motion.div
                        layout
                        key={member.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border-[3px] border-black rounded-[28px] p-6 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all group"
                    >
                        <div>
                            <div className="flex items-start gap-4 mb-4">
                                <img
                                    src={member.image || '/images/team/subhashree.jpeg'}
                                    alt={member.name}
                                    className="w-16 h-16 rounded-2xl object-cover border-[2.5px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400';
                                    }}
                                />
                                <div>
                                    <h3 className="font-black text-lg text-black uppercase tracking-tight group-hover:text-[#4285F4] transition-colors">
                                        {member.name}
                                    </h3>
                                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase bg-[#FFD700] text-black border-[1.5px] border-black mt-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                        {member.role}
                                    </span>
                                </div>
                            </div>

                            <p className="text-xs font-bold text-gray-700 leading-relaxed mb-4 line-clamp-3">
                                {member.bio || 'No bio provided.'}
                            </p>

                            {/* Social Handles */}
                            <div className="flex gap-3 text-xs font-black uppercase text-black pt-3 border-t-[2px] border-black">
                                {member.socials?.github && (
                                    <a
                                        href={member.socials.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:bg-[#FFD700] px-2 py-0.5 rounded-full border border-black transition-colors"
                                    >
                                        GitHub ↗
                                    </a>
                                )}
                                {member.socials?.linkedin && (
                                    <a
                                        href={member.socials.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:bg-[#4285F4] hover:text-white px-2 py-0.5 rounded-full border border-black transition-colors"
                                    >
                                        LinkedIn ↗
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-6 pt-4 border-t-[2.5px] border-black">
                            <button
                                onClick={() => openEditModal(member)}
                                className="flex-1 py-2 px-3 rounded-xl bg-[#4285F4] text-white border-[2px] border-black text-xs font-black uppercase flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-all cursor-pointer"
                            >
                                ✏️ Edit Profile
                            </button>
                            <button
                                onClick={() => handleDelete(member.id, member.name)}
                                className="py-2 px-3 rounded-xl bg-[#EA4335] text-white border-[2px] border-black text-xs font-black uppercase flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-all cursor-pointer"
                            >
                                🗑️
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
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
                            className="relative w-full max-w-lg bg-white border-[3.5px] border-black rounded-[36px] p-6 md:p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] z-10 text-black"
                        >
                            <div className="flex items-center justify-between pb-4 mb-6 border-b-[3px] border-black">
                                <h2 className="text-2xl font-black uppercase text-black">
                                    {editingMember ? 'Edit Member Details' : 'Add Team Member'}
                                </h2>
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
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Subhashree B"
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase text-black mb-1">
                                        Role / Designation *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        placeholder="e.g. GDGoC Organizer"
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase text-black mb-1">
                                        Profile Image URL / Path
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="/images/team/subhashree.jpeg or https://..."
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase text-black mb-1">
                                        Bio & Overview
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        placeholder="Brief background and leadership responsibilities..."
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div>
                                        <label className="block text-xs font-black uppercase text-black mb-1">
                                            LinkedIn URL
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.socials?.linkedin || ''}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                socials: { ...formData.socials, linkedin: e.target.value }
                                            })}
                                            placeholder="https://linkedin.com/in/..."
                                            className="w-full px-4 py-2 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase text-black mb-1">
                                            GitHub URL
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.socials?.github || ''}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                socials: { ...formData.socials, github: e.target.value }
                                            })}
                                            placeholder="https://github.com/..."
                                            className="w-full px-4 py-2 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none"
                                        />
                                    </div>
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
                                        className="px-6 py-2.5 rounded-2xl bg-[#EA4335] hover:bg-[#4285F4] text-white font-black text-xs uppercase border-[2.5px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer"
                                    >
                                        Save Member Details
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
