import { useState, useEffect } from 'react';
import { useContentContext } from '../../core/context/ContentContext';
import { motion } from 'framer-motion';

export default function ManageContact() {
    const { contact, updateContact } = useContentContext();
    const [savedNotice, setSavedNotice] = useState(false);

    const [formData, setFormData] = useState({
        email: 'gdg@citchennai.net',
        phone: '+91 98765 43210',
        address: 'Chennai Institute of Technology, Sarathy Nagar, Kundrathur, Chennai, Tamil Nadu 600069',
        mapUrl: 'https://maps.google.com/?q=Chennai+Institute+of+Technology',
        socials: {
            instagram: 'https://instagram.com/gdg_cit',
            linkedin: 'https://linkedin.com/company/gdg-cit',
            github: 'https://github.com/gdg-cit',
            youtube: 'https://youtube.com',
            discord: 'https://discord.gg',
            twitter: 'https://twitter.com'
        }
    });

    useEffect(() => {
        if (contact) {
            setFormData({
                ...contact,
                socials: contact.socials || {}
            });
        }
    }, [contact]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateContact(formData);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 4000);
    };

    return (
        <div className="space-y-6 max-w-4xl text-black">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-6 md:p-8 rounded-[32px] border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#EA4335] text-white border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            👑 Super Admin Exclusive
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black uppercase text-black" style={{ WebkitTextStroke: '1px black' }}>
                        Contact Info & Socials
                    </h1>
                    <p className="text-xs font-bold text-gray-600 uppercase mt-1">
                        Update official chapter email, telephone, campus address, map link, and social profiles.
                    </p>
                </div>
            </div>

            {savedNotice && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-[#34A853] text-white border-[3px] border-black rounded-2xl text-xs font-black uppercase flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                    <span className="text-lg">✓</span>
                    <span>Contact information and social links saved live!</span>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                {/* Official Contact Details */}
                <div className="p-6 bg-white border-[3px] border-black rounded-[28px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
                    <h3 className="text-lg font-black uppercase text-black flex items-center gap-2 pb-3 border-b-[3px] border-black">
                        <span>📞</span> Official Chapter Contact Info
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase text-black mb-1">
                                Official Email Address *
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="gdg@citchennai.net"
                                className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase text-black mb-1">
                                Contact Telephone
                            </label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+91 98765 43210"
                                className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase text-black mb-1">
                            Campus Address
                        </label>
                        <textarea
                            rows={2}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase text-black mb-1">
                            Google Maps Embed / Location URL
                        </label>
                        <input
                            type="text"
                            value={formData.mapUrl}
                            onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                            placeholder="https://maps.google.com/..."
                            className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                        />
                    </div>
                </div>

                {/* Official Social Links */}
                <div className="p-6 bg-white border-[3px] border-black rounded-[28px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
                    <h3 className="text-lg font-black uppercase text-black flex items-center gap-2 pb-3 border-b-[3px] border-black">
                        <span>🌐</span> Social Media Handles & Community Links
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase text-black mb-1">
                                Instagram Profile URL
                            </label>
                            <input
                                type="text"
                                value={formData.socials?.instagram || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    socials: { ...formData.socials, instagram: e.target.value }
                                })}
                                placeholder="https://instagram.com/..."
                                className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase text-black mb-1">
                                LinkedIn Page URL
                            </label>
                            <input
                                type="text"
                                value={formData.socials?.linkedin || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    socials: { ...formData.socials, linkedin: e.target.value }
                                })}
                                placeholder="https://linkedin.com/company/..."
                                className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase text-black mb-1">
                                GitHub Organization URL
                            </label>
                            <input
                                type="text"
                                value={formData.socials?.github || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    socials: { ...formData.socials, github: e.target.value }
                                })}
                                placeholder="https://github.com/..."
                                className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase text-black mb-1">
                                Discord / Community Invite Link
                            </label>
                            <input
                                type="text"
                                value={formData.socials?.discord || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    socials: { ...formData.socials, discord: e.target.value }
                                })}
                                placeholder="https://discord.gg/..."
                                className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="px-8 py-3.5 rounded-2xl bg-[#4285F4] hover:bg-[#34A853] text-white font-black text-xs uppercase border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                        Save Contact Details & Social Links
                    </button>
                </div>
            </form>
        </div>
    );
}
