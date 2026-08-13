import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const EventPopupModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show modal automatically on site load after brief delay
        const timer = setTimeout(() => {
            const hasSeen = sessionStorage.getItem('gdg_event_popup_seen');
            if (!hasSeen) {
                setIsOpen(true);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('gdg_event_popup_seen', 'true');
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    // Keyboard support (Escape key to close modal)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <>
            {/* Pop-up Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-hidden">
                        
                        {/* Backdrop Blur & Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
                        />

                        {/* Stay Tuned Card Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative max-w-md w-full bg-[#fcf9f1] border-[3.5px] border-black rounded-3xl p-8 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center flex flex-col items-center z-10 my-auto overflow-hidden"
                        >
                            {/* Floating Close Button */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleClose}
                                aria-label="Close popup"
                                className="absolute top-4 right-4 bg-[#EA4335] text-white border-[2.5px] border-black rounded-full w-9 h-9 font-black text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center z-30 cursor-pointer"
                            >
                                ✕
                            </motion.button>

                            {/* Google Color Accent Dots */}
                            <div className="flex gap-2.5 mb-6">
                                <span className="w-3.5 h-3.5 rounded-full bg-[#4285F4] border-[2px] border-black"></span>
                                <span className="w-3.5 h-3.5 rounded-full bg-[#EA4335] border-[2px] border-black"></span>
                                <span className="w-3.5 h-3.5 rounded-full bg-[#FBBC04] border-[2px] border-black"></span>
                                <span className="w-3.5 h-3.5 rounded-full bg-[#34A853] border-[2px] border-black"></span>
                            </div>

                            {/* Rocket Icon */}
                            <div className="w-20 h-20 bg-[#FFD700] border-[3px] border-black rounded-3xl flex items-center justify-center text-4xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 transform -rotate-3">
                                🚀
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-900 mb-3">
                                Stay Tuned!
                            </h2>

                            {/* Subtitle */}
                            <p className="text-gray-700 font-medium text-base sm:text-lg leading-relaxed mb-8 max-w-xs">
                                We're preparing exciting new workshops, hackathons, and sessions. Check back soon!
                            </p>

                            {/* Action Button */}
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleClose}
                                className="bg-[#4285F4] hover:bg-[#3367d6] text-white border-[3px] border-black rounded-full py-3 px-8 font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                            >
                                Got It
                            </motion.button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Persistent Floating Widget */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpen}
                    className="fixed bottom-6 right-6 z-40 bg-[#FBBC04] text-black border-[3px] border-black rounded-full px-5 py-3 font-black text-xs sm:text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 cursor-pointer"
                >
                    <span>Upcoming Event</span>
                </motion.button>
            )}
        </>
    );
};

