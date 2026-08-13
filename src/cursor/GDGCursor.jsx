import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const GDGCursor = () => {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    // 1. Pointer (Blue Chevron) - Snappy response at exact mouse coordinates
    const springPointerX = useSpring(mouseX, { damping: 32, stiffness: 600, mass: 0.15 });
    const springPointerY = useSpring(mouseY, { damping: 32, stiffness: 600, mass: 0.15 });

    // 2. Red Circle - Follows pointer with offset (22px down-right)
    const targetRedX = useTransform(springPointerX, (x) => x + 20);
    const targetRedY = useTransform(springPointerY, (y) => y + 20);
    const springRedX = useSpring(targetRedX, { damping: 24, stiffness: 350, mass: 0.25 });
    const springRedY = useSpring(targetRedY, { damping: 24, stiffness: 350, mass: 0.25 });

    // 3. Yellow Circle - Follows Red Circle with offset (+12px)
    const targetYellowX = useTransform(springRedX, (x) => x + 12);
    const targetYellowY = useTransform(springRedY, (y) => y + 12);
    const springYellowX = useSpring(targetYellowX, { damping: 20, stiffness: 280, mass: 0.35 });
    const springYellowY = useSpring(targetYellowY, { damping: 20, stiffness: 280, mass: 0.35 });

    // 4. Green Circle - Follows Yellow Circle with offset (+10px)
    const targetGreenX = useTransform(springYellowX, (x) => x + 10);
    const targetGreenY = useTransform(springYellowY, (y) => y + 10);
    const springGreenX = useSpring(targetGreenX, { damping: 18, stiffness: 220, mass: 0.45 });
    const springGreenY = useSpring(targetGreenY, { damping: 18, stiffness: 220, mass: 0.45 });

    // 5. Mini Tail Dot (Google Blue) - End of tail (+8px)
    const targetTailX = useTransform(springGreenX, (x) => x + 8);
    const targetTailY = useTransform(springGreenY, (y) => y + 8);
    const springTailX = useSpring(targetTailX, { damping: 15, stiffness: 180, mass: 0.55 });
    const springTailY = useSpring(targetTailY, { damping: 15, stiffness: 180, mass: 0.55 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isVisible) setIsVisible(true);
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const target = e.target;
            if (target) {
                const isInteractive = Boolean(
                    target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-interactive="true"]')
                );
                setIsHovered(isInteractive);
            }
        };

        const handleMouseDown = () => setIsMouseDown(true);
        const handleMouseUp = () => setIsMouseDown(false);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [mouseX, mouseY, isVisible]);

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    const scale = isMouseDown ? 0.78 : isHovered ? 1.15 : 0.85;

    return (
        <>
            <style>{`
                html, body, *, *::before, *::after {
                    cursor: none !important;
                }
            `}</style>

            <div
                className="fixed top-0 left-0 pointer-events-none z-[99999]"
                style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s ease' }}
            >
                {/* 5. Mini Tail Dot (Blue) */}
                <motion.div
                    className="absolute top-0 left-0"
                    style={{
                        x: springTailX,
                        y: springTailY,
                    }}
                >
                    <motion.svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        className="overflow-visible"
                        style={{ transform: 'translate(-5px, -5px)' }}
                        animate={{ scale }}
                    >
                        <circle cx="5" cy="5" r="4" fill="#FFFFFF" filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.15))" />
                        <circle cx="5" cy="5" r="2.5" fill="#4285F4" />
                    </motion.svg>
                </motion.div>

                {/* 4. Green Circle */}
                <motion.div
                    className="absolute top-0 left-0"
                    style={{
                        x: springGreenX,
                        y: springGreenY,
                    }}
                >
                    <motion.svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        className="overflow-visible"
                        style={{ transform: 'translate(-7px, -7px)' }}
                        animate={{ scale }}
                    >
                        <circle cx="7" cy="7" r="5.5" fill="#FFFFFF" filter="drop-shadow(0px 1px 3px rgba(0,0,0,0.18))" />
                        <circle cx="7" cy="7" r="3.6" fill="#34A853" />
                    </motion.svg>
                </motion.div>

                {/* 3. Yellow Circle */}
                <motion.div
                    className="absolute top-0 left-0"
                    style={{
                        x: springYellowX,
                        y: springYellowY,
                    }}
                >
                    <motion.svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        className="overflow-visible"
                        style={{ transform: 'translate(-9px, -9px)' }}
                        animate={{ scale }}
                    >
                        <circle cx="9" cy="9" r="7" fill="#FFFFFF" filter="drop-shadow(0px 1px 3px rgba(0,0,0,0.18))" />
                        <circle cx="9" cy="9" r="4.8" fill="#FBBC04" />
                    </motion.svg>
                </motion.div>

                {/* 2. Red Circle */}
                <motion.div
                    className="absolute top-0 left-0"
                    style={{
                        x: springRedX,
                        y: springRedY,
                    }}
                >
                    <motion.svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        className="overflow-visible"
                        style={{ transform: 'translate(-11px, -11px)' }}
                        animate={{ scale }}
                    >
                        <circle cx="11" cy="11" r="8.5" fill="#FFFFFF" filter="drop-shadow(0px 1px 3px rgba(0,0,0,0.2))" />
                        <circle cx="11" cy="11" r="6" fill="#EA4335" />
                    </motion.svg>
                </motion.div>

                {/* 1. Blue Chevron Pointer (Hotspot Tip at 0,0) */}
                <motion.div
                    className="absolute top-0 left-0"
                    style={{
                        x: springPointerX,
                        y: springPointerY,
                    }}
                >
                    <motion.svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        className="overflow-visible"
                        style={{ transform: 'translate(-3px, -3px)' }}
                        animate={{ scale }}
                        transition={{ type: 'spring', damping: 22, stiffness: 450 }}
                    >
                        <g filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.22))">
                            {/* White Outer Border */}
                            <path
                                d="M 22 7 H 11 C 7.68 7 5 9.68 5 13 V 24"
                                fill="none"
                                stroke="#FFFFFF"
                                strokeWidth="9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            {/* Blue Inner Chevron */}
                            <path
                                d="M 22 7 H 11 C 7.68 7 5 9.68 5 13 V 24"
                                fill="none"
                                stroke="#4285F4"
                                strokeWidth="5.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </motion.svg>
                </motion.div>
            </div>
        </>
    );
};

export default GDGCursor;
