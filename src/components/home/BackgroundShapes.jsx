import React from 'react';
import { motion } from 'framer-motion';

const shapes = [
    // --- LEFT SIDE (High Frequency) ---
    { id: 1, type: 'square', color: '#4285F4', size: 'w-12 h-12 md:w-16 md:h-16', initialX: '-5vw', initialY: '-10vh', delay: 0, duration: 12 },
    { id: 2, type: 'circle', color: '#EA4335', size: 'w-16 h-16 md:w-20 md:h-20', initialX: '2vw', initialY: '-20vh', delay: 4, duration: 15 },
    { id: 3, type: 'triangle', color: '#34A853', size: 'w-10 h-10 md:w-14 md:h-14', initialX: '8vw', initialY: '-15vh', delay: 7, duration: 10 },
    { id: 4, type: 'star', color: '#FFD700', size: 'w-16 h-16 md:w-24 md:h-24', initialX: '-2vw', initialY: '-25vh', delay: 1, duration: 14 },
    { id: 5, type: 'square', color: '#B47A1B', size: 'w-10 h-10 md:w-16 md:h-16', initialX: '12vw', initialY: '-5vh', delay: 5, duration: 11 },
    { id: 6, type: 'circle', color: '#4285F4', size: 'w-20 h-20 md:w-28 md:h-28', initialX: '5vw', initialY: '-30vh', delay: 2, duration: 18 },
    { id: 7, type: 'triangle', color: '#EA4335', size: 'w-12 h-12 md:w-16 md:h-16', initialX: '15vw', initialY: '-15vh', delay: 8, duration: 13 },

    // --- CENTER (Low Frequency) ---
    { id: 8, type: 'star', color: '#34A853', size: 'w-14 h-14 md:w-20 md:h-20', initialX: '40vw', initialY: '-20vh', delay: 3, duration: 16 },
    { id: 9, type: 'square', color: '#FFD700', size: 'w-16 h-16 md:w-24 md:h-24', initialX: '60vw', initialY: '-10vh', delay: 6, duration: 15 },

    // --- RIGHT SIDE (High Frequency) ---
    { id: 10, type: 'circle', color: '#B47A1B', size: 'w-8 h-8 md:w-12 md:h-12', initialX: '85vw', initialY: '-5vh', delay: 0, duration: 10 },
    { id: 11, type: 'triangle', color: '#4285F4', size: 'w-14 h-14 md:w-20 md:h-20', initialX: '92vw', initialY: '-25vh', delay: 4, duration: 14 },
    { id: 12, type: 'star', color: '#EA4335', size: 'w-12 h-12 md:w-16 md:h-16', initialX: '98vw', initialY: '-10vh', delay: 2, duration: 11 },
    { id: 13, type: 'square', color: '#34A853', size: 'w-20 h-20 md:w-28 md:h-28', initialX: '105vw', initialY: '-30vh', delay: 6, duration: 17 },
    { id: 14, type: 'circle', color: '#FFD700', size: 'w-10 h-10 md:w-14 md:h-14', initialX: '88vw', initialY: '-15vh', delay: 1, duration: 12 },
    { id: 15, type: 'triangle', color: '#B47A1B', size: 'w-16 h-16 md:w-24 md:h-24', initialX: '100vw', initialY: '-20vh', delay: 5, duration: 15 },
    { id: 16, type: 'star', color: '#4285F4', size: 'w-16 h-16 md:w-24 md:h-24', initialX: '95vw', initialY: '-5vh', delay: 7, duration: 13 },
];

export const BackgroundShapes = ({ slow = false, small = false, lessDensity = false }) => {
    // Filter shapes if lessDensity is true (keep about half)
    const displayShapes = lessDensity ? shapes.filter(s => s.id % 2 === 0) : shapes;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {displayShapes.map((shape) => {
                return (
                    <motion.div
                        key={shape.id}
                        className="absolute"
                        initial={{ 
                            x: shape.initialX, 
                            y: shape.initialY, 
                            rotate: 0,
                            scale: small ? 0.5 : 1
                        }}
                        animate={{ 
                            y: ['-20vh', '120vh'], 
                            rotate: [0, 360 * (shape.id % 2 === 0 ? 1 : -1)]
                        }}
                        transition={{
                            duration: shape.duration * (slow ? 2 : 1),
                            delay: shape.delay,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {shape.type === 'square' && (
                            <div 
                                className={`${shape.size} border-[3px] border-black rounded-3xl`}
                                style={{ backgroundColor: shape.color }}
                            />
                        )}
                        {shape.type === 'circle' && (
                            <div 
                                className={`${shape.size} rounded-full border-[3px] border-black`}
                                style={{ backgroundColor: shape.color }}
                            />
                        )}
                        {shape.type === 'triangle' && (
                            <div className={`${shape.size} relative flex items-center justify-center`}>
                                <svg viewBox="0 0 100 100" fill={shape.color} stroke="black" strokeWidth="6" strokeLinejoin="round" className="w-full h-full">
                                    <polygon points="50 15, 90 85, 10 85" />
                                </svg>
                            </div>
                        )}
                        {shape.type === 'star' && (
                            <div className={`${shape.size} relative flex items-center justify-center`}>
                                <svg viewBox="0 0 24 24" fill={shape.color} stroke="black" strokeWidth="1.5" strokeLinejoin="round" className="w-full h-full">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            </div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};
