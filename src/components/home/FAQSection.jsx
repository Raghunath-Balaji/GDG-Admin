import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../core/hooks/useContent';

const PacmanBackground = () => {
    const dotsCount = 15;
    const offsetFrac = 0.026;
    
    return (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-full pointer-events-none z-0">
            <div className="relative w-full h-full py-20">
                
                {/* ROW 1 (Top, R -> L) */}
                {Array.from({ length: dotsCount }).map((_, i) => {
                    let x = (i + 0.5) / dotsCount;
                    let targetX = x + offsetFrac;
                    let hitTime = 0.5 - (targetX * 0.5);
                    if (hitTime < 0) hitTime = 0;
                    if (hitTime > 0.5) hitTime = 0.5;
                    return (
                        <motion.div key={`r1-${i}`} 
                            className="w-4 h-4 bg-[#FFD700] rounded-full border-[3px] border-black absolute"
                            style={{ left: `${x * 100}%`, top: '40%' }}
                            initial={{ x: "-50%", y: "-50%" }}
                            animate={{ opacity: [1, 1, 0, 0] }}
                            transition={{ duration: 16, repeat: Infinity, ease: "linear", times: [0, hitTime, hitTime, 1] }}
                        />
                    );
                })}

                {/* ROW 2 (Bottom, L -> R) */}
                {Array.from({ length: dotsCount }).map((_, i) => {
                    let x = (i + 0.5) / dotsCount;
                    let targetX = x - offsetFrac;
                    let hitTime = 0.501 + (targetX * 0.499);
                    if (hitTime < 0.501) hitTime = 0.501;
                    if (hitTime > 1) hitTime = 1;
                    return (
                        <motion.div key={`r2-${i}`} 
                            className="w-4 h-4 bg-[#FFD700] rounded-full border-[3px] border-black absolute"
                            style={{ left: `${x * 100}%`, top: '80%' }}
                            initial={{ x: "-50%", y: "-50%" }}
                            animate={{ opacity: [1, 1, 0, 0] }}
                            transition={{ duration: 16, repeat: Infinity, ease: "linear", times: [0, hitTime, hitTime, 1] }}
                        />
                    );
                })}

                {/* Pac-Man */}
                <motion.div
                    className="absolute"
                    initial={{ x: "-50%", y: "-50%" }}
                    animate={{ 
                        left: ["100%", "0%", "0%", "100%"],
                        top: ["40%", "40%", "80%", "80%"],
                        rotateY: [180, 180, 0, 0]
                    }}
                    transition={{ 
                        duration: 16, 
                        repeat: Infinity, 
                        ease: "linear",
                        times: [0, 0.5, 0.501, 1]
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24 overflow-visible drop-shadow-xl">
                        <path
                            fill="#FFD700"
                            stroke="black"
                            strokeWidth="6"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            d="M 50 50 L 100 25 A 50 50 0 1 0 100 75 Z"
                        />
                    </svg>
                </motion.div>
            </div>
        </div>
    );
};

export const FAQSection = () => {
    const { data: faqs, loading } = useContent('faq');
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading || !faqs || faqs.length === 0) return null;

    const colors = ['#4285F4', '#34A853', '#FFD700', '#EA4335']; // Google colors

    return (
        <section className="w-full relative z-20 py-16 mb-16 overflow-hidden">
            <PacmanBackground />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
                
                <div className="flex justify-center mb-12">
                    <div className="inline-block bg-[#34A853] border-[3px] border-black rounded-full px-8 py-3 rotate-2">
                        <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-widest">
                            FAQ
                        </h2>
                    </div>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        const color = colors[index % colors.length];

                        return (
                            <motion.div
                                key={faq.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white border-[3px] border-black rounded-3xl overflow-hidden transition-all duration-300 relative group"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left cursor-pointer z-10 relative bg-white"
                                >
                                    <span className="text-xl md:text-2xl font-black uppercase tracking-tight text-black pr-8">
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-shrink-0 w-10 h-10 rounded-full border-[3px] border-black flex items-center justify-center bg-white z-10"
                                        style={{ backgroundColor: isOpen ? color : 'white' }}
                                    >
                                        <svg
                                            className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-black'}`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div 
                                                className="px-6 md:px-8 pb-6 pt-2 border-t-[3px] border-black relative z-10"
                                                style={{ backgroundColor: color }}
                                            >
                                                <p className="text-white font-bold text-lg leading-relaxed mt-4">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};
