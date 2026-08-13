import { Link } from 'react-router-dom';
import { useSiteContext } from '../../core/context/SiteContext';
import { NAV_LINKS } from '../../core/utils/constants';
import { motion } from 'framer-motion';

export const Footer = () => {
    const { siteData, socialLinks, settings } = useSiteContext();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t-[3px] border-black relative z-30 pt-16 pb-8 rounded-t-[40px] md:rounded-t-[60px] mt-16">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
                    
                    {/* About Section */}
                    <div className="border-[3px] border-black rounded-[40px] p-8 bg-[#FFD700]">
                        <div className="mb-6 border-b-[3px] border-black pb-4">
                            <h3 className="text-3xl font-black uppercase tracking-tighter" style={{ WebkitTextStroke: '1px black' }}>
                                <span className="text-white">GDG</span> 
                                <span className="ml-2 text-black">CIT</span>
                            </h3>
                            <div className="text-xs font-black uppercase mt-3 bg-[#4285F4] text-white inline-block px-4 py-2 rounded-full border-[3px] border-black">
                                Google Developer Groups
                            </div>
                        </div>
                        <p className="text-black font-bold text-sm leading-relaxed mb-6 uppercase tracking-tight">
                            {siteData?.footer?.tagline || 'Building Tomorrow\'s Tech Leaders at Chennai Institute of Technology'}
                        </p>
                        <div className="inline-flex items-center gap-2 text-xs text-black font-black uppercase border-[3px] border-black rounded-full px-4 py-2 bg-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{settings?.location || 'Chennai Institute of Technology'}</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="border-[3px] border-black rounded-[40px] p-8 bg-[#4285F4] flex flex-col shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex items-center justify-between mb-6 border-b-[3px] border-black pb-4">
                            <h4 className="font-black text-2xl text-white uppercase inline-block tracking-tight" style={{ WebkitTextStroke: '1px black' }}>
                                Quick Links
                            </h4>
                            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border-[2.5px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335] border border-black inline-block"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC04] border border-black inline-block"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] border border-black inline-block"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] border border-black inline-block"></span>
                            </div>
                        </div>
                        <ul className="space-y-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-black bg-white hover:bg-black hover:text-white transition-all text-base font-black uppercase flex items-center border-[3px] border-black rounded-2xl p-2.5 px-4 group shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1"
                                    >
                                        <span className="w-2 h-2 bg-[#4285F4] group-hover:bg-[#34A853] transition-all mr-3 rounded-full border border-black"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect Section */}
                    <div className="border-[3px] border-black rounded-[40px] p-8 bg-[#EA4335]">
                        <h4 className="font-black text-2xl text-white mb-6 uppercase border-b-[3px] border-black pb-2 inline-block">
                            Connect
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {socialLinks?.github && (
                                <a 
                                    href={socialLinks.github} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-2 text-sm font-black uppercase text-black bg-white rounded-2xl border-[3px] border-black p-2.5 hover:bg-black hover:text-white hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group"
                                >
                                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                    </svg>
                                    GitHub
                                </a>
                            )}
                            {socialLinks?.linkedin && (
                                <a 
                                    href={socialLinks.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-2 text-sm font-black uppercase text-black bg-white rounded-2xl border-[3px] border-black p-2.5 hover:bg-[#0A66C2] hover:text-white hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group"
                                >
                                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    LinkedIn
                                </a>
                            )}
                            {socialLinks?.instagram && (
                                <a 
                                    href={socialLinks.instagram} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-2 text-sm font-black uppercase text-black bg-white rounded-2xl border-[3px] border-black p-2.5 hover:bg-[#E4405F] hover:text-white hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group"
                                >
                                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                    </svg>
                                    Instagram
                                </a>
                            )}
                            {socialLinks?.discord && (
                                <a 
                                    href={socialLinks.discord} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-2 text-sm font-black uppercase text-black bg-white rounded-2xl border-[3px] border-black p-2.5 hover:bg-[#5865F2] hover:text-white hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group"
                                >
                                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                    </svg>
                                    Discord
                                </a>
                            )}
                        </div>

                        <div className="bg-white border-[3px] border-black rounded-2xl p-4">
                            <p className="text-xs font-black uppercase text-gray-500 mb-1">Email us:</p>
                            <a href={`mailto:${settings?.contactEmail || 'gdg@cit.edu.in'}`} className="text-black font-black hover:bg-[#FFD700] px-2 py-1 rounded-full transition-colors inline-block">
                                {settings?.contactEmail || 'gdg@cit.edu.in'}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t-[3px] border-black pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4 text-sm font-black uppercase text-black">
                            <p className="bg-[#4285F4] text-white px-4 py-2 rounded-full border-[3px] border-black">© {currentYear} GDG CIT.</p>
                            <a
                                href="https://github.com/gdgcit"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white px-4 py-2 rounded-full border-[3px] border-black hover:-translate-y-1 transition-all"
                            >
                                Open Source ↗
                            </a>
                            <Link
                                to="/admin/login"
                                className="bg-black text-white px-4 py-2 rounded-full border-[3px] border-black hover:bg-[#EA4335] transition-all"
                            >
                                🔒 Admin Portal
                            </Link>
                        </div>

                        <p className="text-xs font-bold uppercase text-black text-center md:text-right max-w-xl p-3 rounded-2xl border-[3px] border-black bg-[#fcf9f1]">
                            {siteData?.footer?.disclaimer || 'GDG CIT is an independent group; our activities and the opinions expressed here should in no way be linked to Google, the corporation.'}
                        </p>
                    </div>

                    {/* Easter Egg */}
                    <div className="mt-8 text-center flex justify-center">
                        <div className="bg-black text-white px-5 py-2 rounded-xl text-xs font-mono font-bold inline-block border-[3px] border-black">
                            <span className="text-[#34A853]">$</span> sudo rm -rf negativity/
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
