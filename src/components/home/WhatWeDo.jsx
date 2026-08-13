import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const WhatWeDo = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const items = [
        {
            title: "Workshops",
            description: "Hands-on sessions diving deep into specific Google technologies, frameworks, and APIs. We learn by building together.",
            color: "#4285F4" // Blue
        },
        {
            title: "Hackathons",
            description: "Intense, collaborative coding events where we build innovative solutions to real-world problems in rapid timeframes.",
            color: "#34A853" // Green
        },
        {
            title: "Bootcamps",
            description: "Intensive training programs designed to rapidly take you from absolute beginner to proficient in various tech stacks.",
            color: "#FFD700" // Yellow
        },
        {
            title: "Study Jams",
            description: "Community-driven study groups where we collectively work through Google courses, get certified, and share knowledge.",
            color: "#EA4335" // Red
        }
    ];

    return (
        <section className="w-full relative z-20 py-16 mb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                
                <div className="mb-12">
                    <div className="inline-block bg-[#4285F4] border-[3px] border-black rounded-full px-8 py-3 rotate-1">
                        <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-widest">
                            What We Do
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-stretch">
                    
                    {/* LHS: Vertical stack of cards */}
                    <div className="flex flex-col gap-6">
                        {items.map((item, index) => (
                            <motion.div
                                key={index}
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                whileHover={{ scale: 1.02, x: 10 }}
                                className="bg-white border-[3px] border-black rounded-[30px] p-6 md:p-8 cursor-pointer transition-colors relative overflow-hidden group"
                            >
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black relative z-10 group-hover:text-white transition-colors" style={{ WebkitTextStroke: '1px black' }}>
                                    {item.title}
                                </h3>
                            </motion.div>
                        ))}
                    </div>

                    {/* RHS: Dynamic Display */}
                    <div className="bg-white border-[3px] border-black rounded-[40px] p-8 md:p-12 flex items-center justify-center min-h-[400px] lg:min-h-full overflow-hidden relative">
                        <AnimatePresence mode="wait">
                            {hoveredIndex === null ? (
                                <motion.div
                                    key="default"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col items-center justify-center text-center p-4 relative z-10"
                                >
                                    <div className="flex items-center justify-center gap-3 mb-6">
                                        <img src="/images/gdg-logo.png" alt="GDG Logo" className="w-14 h-14 object-contain" />
                                        <div className="flex gap-2">
                                            <span className="w-3.5 h-3.5 rounded-full bg-[#4285F4] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-3.5 h-3.5 rounded-full bg-[#EA4335] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-3.5 h-3.5 rounded-full bg-[#FBBC04] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                            <span className="w-3.5 h-3.5 rounded-full bg-[#34A853] animate-bounce" style={{ animationDelay: '450ms' }}></span>
                                        </div>
                                    </div>

                                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-black tracking-tight mb-4">
                                        BUILD. LEARN. GROW.
                                    </h3>

                                    <p className="text-gray-700 font-bold uppercase text-xs sm:text-sm tracking-widest max-w-md bg-[#fcf9f1] border-[3px] border-black rounded-2xl px-5 py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                        👆 Hover over any category to explore what we do
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="description"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-left w-full relative z-10"
                                >
                                    <div 
                                        className="inline-block border-[3px] border-black rounded-full px-6 py-2 mb-6"
                                        style={{ backgroundColor: items[hoveredIndex].color }}
                                    >
                                        <span className="font-black uppercase tracking-widest text-white">
                                            {items[hoveredIndex].title}
                                        </span>
                                    </div>
                                    <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-black leading-tight">
                                        {items[hoveredIndex].description}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
};
