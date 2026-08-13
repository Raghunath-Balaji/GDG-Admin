import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const WigglyLine = () => {
    const width = 4000;
    const periodWidth = 100;
    const periods = width / periodWidth;
    
    // Lowered amplitude: instead of Q 25 0 (reaching 0), we use Q 25 25 (reaching 25, which is closer to the center 50)
    let d = "M 0 50 Q 25 25 50 50 ";
    for (let i = 1; i < periods * 2; i++) {
        d += `T ${50 + i * 50} 50 `;
    }

    return (
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-24 md:h-32 overflow-hidden pointer-events-none z-0">
            <motion.div
                animate={{ x: [0, -200] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 4 }}
                className="h-full"
                style={{ width: '4000px' }}
            >
                <svg 
                    viewBox={`0 0 ${width} 100`} 
                    className="w-full h-full"
                    preserveAspectRatio="none"
                >
                    <path 
                        d={d} 
                        fill="none" 
                        stroke="#d8c8b8" 
                        strokeWidth="6" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                    />
                </svg>
            </motion.div>
        </div>
    );
};

const StatCard = ({ label, targetNumber, suffix, color, delay }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, targetNumber, {
                duration: 2,
                ease: "easeOut",
                delay: delay,
                onUpdate: (value) => {
                    setCount(Math.floor(value));
                }
            });
            return () => controls.stop();
        }
    }, [isInView, targetNumber, delay]);

    return (
        <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: delay }}
            whileHover={{ scale: 1.05 }}
            className="bg-white border-[3px] border-black rounded-[40px] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group z-10"
        >
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                style={{ backgroundColor: color }}
            ></div>
            <h3 
                className="text-6xl md:text-7xl font-black mb-2 tracking-tighter"
                style={{ color: color }}
            >
                {count}{suffix}
            </h3>
            <p className="text-black font-black uppercase text-lg tracking-widest">
                {label}
            </p>
        </motion.div>
    );
};

export const StatsSection = () => {
    const stats = [
        { label: "Events Conducted", targetNumber: 25, suffix: "+", color: "#4285F4" }, // Blue
        { label: "Team Members", targetNumber: 500, suffix: "+", color: "#34A853" }, // Green
        { label: "Bootcamps", targetNumber: 8, suffix: "+", color: "#FFD700" }, // Yellow
        { label: "Awards", targetNumber: 3, suffix: "+", color: "#EA4335" } // Red
    ];

    return (
        <section className="w-full relative z-20 py-16 mb-8 overflow-hidden">
            <WigglyLine />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <StatCard 
                            key={index}
                            label={stat.label}
                            targetNumber={stat.targetNumber}
                            suffix={stat.suffix}
                            color={stat.color}
                            delay={index * 0.15}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};
