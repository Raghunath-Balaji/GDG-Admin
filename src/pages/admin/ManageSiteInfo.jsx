import { useState, useEffect } from 'react';
import { useContentContext } from '../../core/context/ContentContext';
import { motion } from 'framer-motion';

export default function ManageSiteInfo() {
    const { siteData, updateSiteData } = useContentContext();
    const [formData, setFormData] = useState({
        hero: {
            title: 'Google Developer Groups',
            subtitle: 'CIT Chapter',
            tagline: 'Building the Future, One Line of Code at a Time',
            description: 'Join Chennai\'s most vibrant tech community. Learn, build, and grow with fellow developers.',
            cta: {
                primary: 'Explore Events',
                secondary: 'Join Community'
            }
        },
        about: {
            title: 'About GDG CIT',
            description: 'We are a community of passionate developers, designers, and tech enthusiasts at Chennai Institute of Technology. Our mission is to create a platform for learning, collaboration, and innovation in technology.'
        },
        footer: {
            tagline: 'Building Tomorrow\'s Tech Leaders',
            copyright: '© 2026 GDG CIT Chapter. All rights reserved.',
            disclaimer: 'GDG CIT is an independent group; our activities and the opinions expressed here should in no way be linked to Google, the corporation.'
        }
    });

    const [savedNotice, setSavedNotice] = useState(false);

    useEffect(() => {
        if (siteData) {
            setFormData(siteData);
        }
    }, [siteData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSiteData(formData);
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
                        Mission, Vision & Site Content
                    </h1>
                    <p className="text-xs font-bold text-gray-600 uppercase mt-1">
                        Edit homepage hero title, tagline, about description, and footer disclaimers.
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
                    <span>Site content successfully saved and published live!</span>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                {/* Hero Section Card */}
                <div className="p-6 bg-white border-[3px] border-black rounded-[28px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
                    <h3 className="text-lg font-black uppercase text-black flex items-center gap-2 pb-3 border-b-[3px] border-black">
                        <span>🚀</span> Hero Headline & Tagline
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase text-black mb-1">
                                Main Title
                            </label>
                            <input
                                type="text"
                                value={formData.hero?.title || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    hero: { ...formData.hero, title: e.target.value }
                                })}
                                className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase text-black mb-1">
                                Subtitle
                            </label>
                            <input
                                type="text"
                                value={formData.hero?.subtitle || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    hero: { ...formData.hero, subtitle: e.target.value }
                                })}
                                className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase text-black mb-1">
                            Catchy Tagline
                        </label>
                        <input
                            type="text"
                            value={formData.hero?.tagline || ''}
                            onChange={(e) => setFormData({
                                ...formData,
                                hero: { ...formData.hero, tagline: e.target.value }
                            })}
                            className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase text-black mb-1">
                            Hero Description Paragraph
                        </label>
                        <textarea
                            rows={3}
                            value={formData.hero?.description || ''}
                            onChange={(e) => setFormData({
                                ...formData,
                                hero: { ...formData.hero, description: e.target.value }
                            })}
                            className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white resize-none"
                        />
                    </div>
                </div>

                {/* About & Mission Section */}
                <div className="p-6 bg-white border-[3px] border-black rounded-[28px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
                    <h3 className="text-lg font-black uppercase text-black flex items-center gap-2 pb-3 border-b-[3px] border-black">
                        <span>🎯</span> About, Mission & Vision Statement
                    </h3>

                    <div>
                        <label className="block text-xs font-black uppercase text-black mb-1">
                            About Section Title
                        </label>
                        <input
                            type="text"
                            value={formData.about?.title || ''}
                            onChange={(e) => setFormData({
                                ...formData,
                                about: { ...formData.about, title: e.target.value }
                            })}
                            className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase text-black mb-1">
                            Mission Statement / Description
                        </label>
                        <textarea
                            rows={4}
                            value={formData.about?.description || ''}
                            onChange={(e) => setFormData({
                                ...formData,
                                about: { ...formData.about, description: e.target.value }
                            })}
                            className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white resize-none"
                        />
                    </div>
                </div>

                {/* Footer Section Card */}
                <div className="p-6 bg-white border-[3px] border-black rounded-[28px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
                    <h3 className="text-lg font-black uppercase text-black flex items-center gap-2 pb-3 border-b-[3px] border-black">
                        <span>📄</span> Footer Branding & Disclaimers
                    </h3>

                    <div>
                        <label className="block text-xs font-black uppercase text-black mb-1">
                            Footer Tagline
                        </label>
                        <input
                            type="text"
                            value={formData.footer?.tagline || ''}
                            onChange={(e) => setFormData({
                                ...formData,
                                footer: { ...formData.footer, tagline: e.target.value }
                            })}
                            className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase text-black mb-1">
                            Google Disclaimer Text
                        </label>
                        <textarea
                            rows={2}
                            value={formData.footer?.disclaimer || ''}
                            onChange={(e) => setFormData({
                                ...formData,
                                footer: { ...formData.footer, disclaimer: e.target.value }
                            })}
                            className="w-full px-4 py-2.5 rounded-2xl bg-[#fcf9f1] border-[2.5px] border-black text-black font-bold text-xs focus:outline-none focus:bg-white resize-none"
                        />
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="px-8 py-3.5 rounded-2xl bg-[#FFD700] hover:bg-[#4285F4] hover:text-white text-black font-black text-xs uppercase border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                        Save & Publish Site Info Changes Live
                    </button>
                </div>
            </form>
        </div>
    );
}
