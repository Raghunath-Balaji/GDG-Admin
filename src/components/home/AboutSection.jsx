import React from 'react';
import { motion } from 'framer-motion';

export const AboutSection = () => {
    return (
        <section className="w-full relative z-20 py-16 mt-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    
                    {/* Our Mission Card */}
                    <motion.div 
                        whileHover={{ scale: 1.02, rotate: 0 }}
                        className="bg-[#4285F4] border-[3px] border-black rounded-[40px] p-8 md:p-12 relative flex flex-col justify-between rotate-1 transition-transform"
                    >
                        {/* Decorative tag */}
                        <div className="absolute -top-5 left-10 bg-white border-[3px] border-black rounded-full px-6 py-2 -rotate-3">
                            <span className="font-black uppercase tracking-widest text-black text-sm">Target</span>
                        </div>
                        
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6 tracking-tighter" style={{ WebkitTextStroke: '1px black' }}>
                                Our Mission
                            </h2>
                            <p className="text-white text-lg md:text-xl font-bold leading-relaxed">
                                At GDG CIT, we believe in thinking beyond the conventional. Our resources aren't just directed toward organizing events, but also towards fostering a culture of continuous learning and collaborative growth.
We host flagship events, competitive programming challenges, and insightful workshops that empower students to learn, build, and innovate with cutting-edge technologies.
                            </p>
                        </div>

                        <div className="mt-8 self-end">
                            <div className="w-16 h-16 bg-[#FFD700] rounded-full border-[3px] border-black flex items-center justify-center">
                                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    {/* Our Story Card */}
                    <motion.div 
                        whileHover={{ scale: 1.02, rotate: 0 }}
                        className="bg-white border-[3px] border-black rounded-[40px] p-8 md:p-12 relative flex flex-col justify-between -rotate-1 transition-transform"
                    >
                        {/* Decorative tag */}
                        <div className="absolute -top-5 right-10 bg-[#EA4335] border-[3px] border-black rounded-full px-6 py-2 rotate-3">
                            <span className="font-black uppercase tracking-widest text-white text-sm">Origins</span>
                        </div>

                        <div>
                            <h2 className="text-4xl md:text-5xl font-black uppercase text-black mb-6 tracking-tighter">
                                Our <span className="text-[#34A853]">Story</span>
                            </h2>
                            <p className="text-gray-800 text-lg md:text-xl font-bold leading-relaxed">
                                GDG CIT started as a vision to create a thriving tech community at Chennai Institute of Technology. What began as a small group of passionate developers has grown into a vibrant community of innovators and learners. Over the years, we've empowered countless students through hands-on workshops, hackathons, and study jams. From web development to machine learning, cloud computing to mobile development - we cover it all.
                            </p>
                        </div>

                        <div className="mt-8 self-start">
                             <div className="flex -space-x-4">
                                <div className="w-12 h-12 bg-[#4285F4] rounded-full border-[3px] border-black"></div>
                                <div className="w-12 h-12 bg-[#EA4335] rounded-full border-[3px] border-black"></div>
                                <div className="w-12 h-12 bg-[#FFD700] rounded-full border-[3px] border-black"></div>
                                <div className="w-12 h-12 bg-[#34A853] rounded-full border-[3px] border-black"></div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
