import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContext } from '../../core/context/SiteContext';

export const Roadmap = ({ events = [] }) => {
    const [hoveredEvent, setHoveredEvent] = useState(null);
    const { socialLinks } = useSiteContext();

    const displayEvents = events.slice(0, 7);

    // Positions for the events on the rectangular S-path (X%, Y%)
    const positions = [
        { x: 15, y: 20 },
        { x: 60, y: 20 },
        { x: 90, y: 35 },
        { x: 50, y: 50 },
        { x: 10, y: 65 },
        { x: 40, y: 80 },
        { x: 85, y: 80 }
    ];

    const categoryColors = {
        'workshop': '#A855F7',
        'hackathon': '#4285F4',
        'android': '#34A853',
        'cloud': '#FBBC04',
        'web': '#EA4335',
        'ml': '#A855F7'
    };

    const getEventColor = (category) => categoryColors[category?.toLowerCase()] || '#FFD700';

    return (
        <section className="w-full relative z-20 mt-8" id="events">
            {/* Transparent Full-Width Band sitting directly on dotted background */}
            <div className="w-full py-8 relative">
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="inline-block bg-[#EA4335] border-[3px] border-black rounded-full px-8 py-3 -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-widest">
                            Roadmap
                        </h2>
                    </div>
                    
                    {/* Social Icons for whitespace filling */}
                    <div className="flex items-center gap-3">
                        {socialLinks?.github && (
                            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border-[3px] border-black bg-[#4285F4] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                            </a>
                        )}
                        {socialLinks?.linkedin && (
                            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border-[3px] border-black bg-[#34A853] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                        )}
                        {socialLinks?.instagram && (
                            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border-[3px] border-black bg-[#FFD700] text-black flex items-center justify-center hover:-translate-y-1 transition-transform shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" /></svg>
                            </a>
                        )}
                        {socialLinks?.discord && (
                            <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border-[3px] border-black bg-[#A855F7] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
                            </a>
                        )}
                    </div>
                </div>

                {displayEvents.length === 0 ? (
                    <div className="text-center max-w-2xl mx-auto font-bold text-xl uppercase border-[3px] border-black rounded-3xl p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        No events plotted yet.
                    </div>
                ) : (
                    <div className="relative w-full h-[400px] md:h-[500px] mt-8 max-w-[1600px] mx-auto">
                        {/* S-Shaped Literal Road SVG with rounded 90-degree corners */}
                        <svg 
                            viewBox="0 0 100 100" 
                            preserveAspectRatio="none" 
                            className="absolute inset-0 w-full h-full overflow-visible"
                        >
                            {/* Road base (Dark gray asphalt) */}
                            <path 
                                d="M 0 20 L 90 20 L 90 50 L 10 50 L 10 80 L 100 80" 
                                fill="none" 
                                stroke="#222" 
                                strokeWidth="48" 
                                strokeLinejoin="round" 
                                vectorEffect="non-scaling-stroke" 
                            />
                            
                            {/* Road center line (Solid Yellow) */}
                            <path 
                                d="M 0 20 L 90 20 L 90 50 L 10 50 L 10 80 L 100 80" 
                                fill="none" 
                                stroke="#FFD700" 
                                strokeWidth="6" 
                                strokeLinejoin="round" 
                                vectorEffect="non-scaling-stroke" 
                            />
                        </svg>

                        {/* Event Dots */}
                        {displayEvents.map((event, i) => {
                            const pos = positions[i];
                            const isHovered = hoveredEvent === i;
                            const color = getEventColor(event.category);
                            
                            // Custom collision-free popover positioning for each node on the S-curve
                            const popoverClasses = [
                                "top-full mt-4 left-0",                       // 0: Top-left -> open down-right
                                "top-full mt-4 right-0",                      // 1: Top-right -> open down-left
                                "right-full mr-4 -top-6",                     // 2: Far-right -> open left
                                "top-full mt-4 left-1/2 -translate-x-1/2",    // 3: Center -> open down
                                "left-full ml-4 -top-6",                      // 4: Far-left -> open right
                                "bottom-full mb-4 left-0",                    // 5: Bottom-left -> open up-right
                                "bottom-full mb-4 right-0"                    // 6: Bottom-right -> open up-left
                            ];

                            const popoverClass = popoverClasses[i] || "bottom-full mb-4 left-1/2 -translate-x-1/2";

                            return (
                                <div 
                                    key={event.id || i}
                                    className={`absolute w-8 h-8 md:w-12 md:h-12 -ml-4 -mt-4 md:-ml-6 md:-mt-6 rounded-full border-[3px] border-black flex items-center justify-center cursor-pointer transition-transform hover:scale-125 ${isHovered ? 'z-50' : 'z-20'}`}
                                    style={{ 
                                        left: `${pos.x}%`, 
                                        top: `${pos.y}%`,
                                        backgroundColor: color,
                                        zIndex: isHovered ? 50 : 20
                                    }}
                                    onMouseEnter={() => setHoveredEvent(i)}
                                    onMouseLeave={() => setHoveredEvent(null)}
                                >
                                    <div className="w-2 h-2 md:w-3 md:h-3 bg-white border-[3px] border-black rounded-full"></div>

                                    {/* Event Popover */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div 
                                                initial={{ opacity: 0, scale: 0.9, y: 5 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, y: 5 }}
                                                className={`absolute ${popoverClass} w-[82vw] max-w-[280px] md:w-72 bg-white border-[3px] border-black rounded-3xl p-4 sm:p-5 z-50 cursor-default pointer-events-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
                                            >
                                                <div 
                                                    className="text-xs font-black uppercase text-white border-[3px] border-black rounded-full px-3 py-1 inline-block mb-3"
                                                    style={{ backgroundColor: color }}
                                                >
                                                    {event.category || 'Event'}
                                                </div>
                                                <h3 className="font-black text-xl md:text-2xl text-black leading-tight mb-3 uppercase tracking-tight">
                                                    {event.title}
                                                </h3>
                                                <div className="flex flex-col gap-1 text-sm font-bold text-gray-800 uppercase">
                                                    <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                    {event.time && <span className="text-gray-500">{event.time}</span>}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};
