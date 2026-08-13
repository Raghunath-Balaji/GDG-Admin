import React from 'react';
import { motion } from 'framer-motion';
import mascotImg from '../../assets/gdg-mascot.png';

export const Hero = () => {
    return (
        <section className="w-full min-h-[85vh] md:min-h-[90vh] flex items-center justify-center pt-24 sm:pt-20 md:pt-10 font-sans relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-24">
                
                {/* Left Hand Side: 3D Neubrutalist Mascot */}
                <div className="w-full md:w-1/2 flex justify-center relative my-4 md:my-0">
                    <div className="relative w-full max-w-[280px] sm:max-w-[380px] md:max-w-[440px] flex justify-center items-center">
                        
                        {/* Main Mascot Container */}
                        <motion.div
                            animate={{ y: [0, -14, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative z-10 w-full flex justify-center"
                        >
                            {/* Neubrutalist Accent Yellow Backdrop Box */}
                            <div className="absolute inset-0 bg-[#FFD700] rounded-[30px] sm:rounded-[40px] md:rounded-[55px] border-[3px] sm:border-[4px] border-black -z-10 transform scale-95 translate-x-2.5 translate-y-3 sm:translate-x-3 sm:translate-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"></div>
                            
                            {/* Developer Community Illustration Image */}
                            <motion.img 
                                src={mascotImg} 
                                alt="GDG CIT Developer Community"
                                whileHover={{ scale: 1.03, rotate: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                className="w-full max-w-[300px] sm:max-w-[380px] md:max-w-[460px] object-cover rounded-[32px] sm:rounded-[45px] border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                            />
                        </motion.div>

                        {/* Decorative Neubrutalist Star & Geometric Accents */}
                        <motion.div 
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 z-20 text-2xl sm:text-3xl select-none"
                        >
                            ⭐
                        </motion.div>
                        
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-2 -right-2 z-20 text-xl sm:text-2xl select-none"
                        >
                            ✨
                        </motion.div>

                    </div>
                </div>

                {/* Right Hand Side: Lettering with Logo and Button */}
                <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                    
                    {/* Title with Full Name + Logo */}
                    <div className="flex flex-col space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                        {/* On Campus Badge */}
                        <div className="inline-block bg-[#FBBC04] text-black border-[3px] border-black rounded-full px-3.5 sm:px-4 py-1 sm:py-1.5 font-black uppercase tracking-widest text-xs sm:text-sm w-max -rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            GDG On Campus
                        </div>

                        {/* Full Name Title */}
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-tight" style={{ WebkitTextStroke: '1.5px black' }}>
                            <span style={{ color: '#4285F4' }}>Google </span>
                            <br className="hidden sm:block" />
                            <span style={{ color: '#EA4335' }}>Developer </span>
                            <br className="hidden sm:block" />
                            <span style={{ color: '#34A853' }}>Group</span>
                        </h1>
                        
                        {/* Institution Name */}
                        <div className="bg-[#B47A1B] border-[3px] border-black rounded-2xl sm:rounded-3xl px-4 sm:px-5 py-2 sm:py-2.5 inline-block mt-2 sm:mt-3 -rotate-1 transform transition-transform hover:rotate-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                            <span className="text-sm sm:text-lg md:text-2xl font-extrabold text-white tracking-tight uppercase">
                                Chennai Institute of Technology
                            </span>
                        </div>
                    </div>
                    
                    {/* Neubrutalist Button */}
                    <motion.a 
                        href="/events"
                        whileHover={{ scale: 1.02, x: -2, y: -2 }}
                        whileTap={{ scale: 0.98, x: 2, y: 2 }}
                        className="mt-2 sm:mt-4 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#4285F4] text-white border-[3px] border-black rounded-full font-black text-base sm:text-lg uppercase tracking-wider flex items-center gap-3 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                        View more
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 border-[2.5px] sm:border-[3px] border-white rounded-full p-0.5 bg-black text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </motion.a>
                </div>

            </div>
        </section>
    );
};

