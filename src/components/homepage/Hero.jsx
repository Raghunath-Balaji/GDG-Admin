/**
 * Hero Component - Enhanced with better fonts, dynamic background, responsive, interactive
 */
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '../common/Button';

export const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
        x.set(mousePosition.x);
        y.set(mousePosition.y);
    }, [mousePosition, x, y]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* Enhanced Dynamic 3D Background with More Spline Effects */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Large animated gradient orbs */}
                <motion.div
                    className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
                    style={{
                        background: 'radial-gradient(circle, #4285F4 0%, #34A853 50%, transparent 70%)',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                    className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full blur-3xl opacity-30"
                    style={{
                        background: 'radial-gradient(circle, #FBBC04 0%, #A855F7 50%, transparent 70%)',
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -120, 0],
                        x: [0, -80, 0],
                        y: [0, 60, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                    className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
                    style={{
                        background: 'radial-gradient(circle, #34A853 0%, #4285F4 50%, transparent 70%)',
                    }}
                    animate={{
                        scale: [1, 1.4, 1],
                        rotate: [0, 180, 0],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Morphing blob shapes */}
                <motion.div
                    className="absolute top-1/4 right-1/4 w-64 h-64 opacity-10"
                    animate={{
                        scale: [1, 1.3, 0.8, 1],
                        rotate: [0, 180, 360],
                        borderRadius: ["30%", "50%", "40%", "30%"],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        background: 'linear-gradient(135deg, #A855F7, #FBBC04)',
                    }}
                />

                <motion.div
                    className="absolute bottom-1/4 left-1/4 w-72 h-72 opacity-10"
                    animate={{
                        scale: [1, 0.7, 1.2, 1],
                        rotate: [0, -180, -360],
                        borderRadius: ["40%", "30%", "50%", "40%"],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        background: 'linear-gradient(135deg, #4285F4, #34A853)',
                    }}
                />

                {/* Floating 3D-like geometric shapes */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute opacity-15"
                        style={{
                            top: `${15 + i * 12}%`,
                            left: `${8 + i * 13}%`,
                            width: `${80 + i * 10}px`,
                            height: `${80 + i * 10}px`,
                        }}
                        animate={{
                            y: [0, -60, 0],
                            x: [0, Math.sin(i) * 40, 0],
                            rotate: [0, 360],
                            scale: [1, 1.3, 1],
                            borderRadius: [`${20 + i * 5}%`, `${40 + i * 3}%`, `${20 + i * 5}%`],
                        }}
                        transition={{
                            duration: 12 + i * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3,
                        }}
                    >
                        <div
                            className="w-full h-full"
                            style={{
                                background: `linear-gradient(${45 + i * 30}deg, ${['#4285F4', '#EA4335', '#FBBC04', '#34A853'][i % 4]
                                    }50, transparent)`,
                            }}
                        />
                    </motion.div>
                ))}

                {/* Small particle dots */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                            background: ['#4285F4', '#EA4335', '#FBBC04', '#34A853'][i % 4],
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -150, 0],
                            x: [0, Math.random() * 100 - 50, 0],
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 2, 1],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5,
                        }}
                    />
                ))}

                {/* Animated wave lines */}
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M0,150 Q300,100 600,150 T1200,150"
                        stroke="#4285F4"
                        strokeWidth="3"
                        fill="none"
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.1, 0.25, 0.1]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M0,400 Q400,350 800,400 T1600,400"
                        stroke="#34A853"
                        strokeWidth="3"
                        fill="none"
                        animate={{
                            y: [0, 20, 0],
                            opacity: [0.1, 0.25, 0.1]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                </svg>

                {/* Grid overlay for depth */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(66, 133, 244, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(66, 133, 244, 0.3) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

                        {/* Left GDG Logo - Larger and Interactive */}
                        <motion.div
                            className="flex justify-center lg:col-span-2 order-1 lg:order-1"
                            initial={{ opacity: 0, x: -80, rotate: -20 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{ delay: 0.2, duration: 1, type: "spring", stiffness: 100 }}
                        >
                            <motion.img
                                src="/images/gdg-logo-left.png"
                                alt="GDG Logo"
                                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain drop-shadow-2xl"
                                whileHover={{
                                    scale: 1.15,
                                    rotate: 10,
                                    filter: "drop-shadow(0 20px 40px rgba(66, 133, 244, 0.4))"
                                }}
                                animate={{
                                    y: [0, -15, 0],
                                }}
                                transition={{
                                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                }}
                            />
                        </motion.div>

                        {/* Center Text Content */}
                        <div className="lg:col-span-8 text-center px-4 order-2 lg:order-2">
                            {/* Top badge */}
                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, type: "spring" }}
                                className="inline-block mb-6 sm:mb-8"
                            >
                                <div className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 border-gray-300 bg-white/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow">
                                    <span className="text-xs sm:text-sm font-semibold text-gray-700 tracking-wide">
                                        Google Developer Groups On Campus
                                    </span>
                                </div>
                            </motion.div>

                            {/* Main Heading - Reduced Font Sizes */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, type: "spring" }}
                                className="mb-6 sm:mb-10"
                            >
                                <h1 className="font-black leading-[0.95] tracking-tight">
                                    {/* Google Developer Groups */}
                                    <motion.div
                                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-900 mb-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        Google Developer Groups
                                    </motion.div>

                                    {/* On Campus */}
                                    <motion.div
                                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-900 mb-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        On Campus
                                    </motion.div>

                                    {/* CIT Chennai */}
                                    <motion.div
                                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gdgBlue via-gdgGreen to-gdgBlue bg-clip-text text-transparent"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8, type: "spring" }}
                                    >
                                        CIT Chennai
                                    </motion.div>
                                </h1>
                            </motion.div>

                            {/* Tagline */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mb-8 sm:mb-12"
                            >
                                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                                    Converting Ideas Into Reality!
                                </p>
                                <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                    Join our vibrant community of developers, innovators, and learners
                                </p>
                            </motion.div>

                            {/* CTA Buttons - Enhanced */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                            >
                                <Link to="/events">
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button variant="primary" className="min-w-[220px] text-base sm:text-lg px-10 py-4 shadow-xl">
                                            Explore Events
                                        </Button>
                                    </motion.div>
                                </Link>
                                <a
                                    href="https://docs.google.com/forms/d/1eAviUoX97nlOQmzvBN_T2qYkFVcD8QpDpXoNgW2A1Uc"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button variant="outline" className="min-w-[220px] text-base sm:text-lg px-10 py-4">
                                            Join Us
                                        </Button>
                                    </motion.div>
                                </a>
                            </motion.div>
                        </div>

                        {/* Right GDG Logo - Larger and Interactive */}
                        <motion.div
                            className="flex justify-center lg:col-span-2 order-3 lg:order-3"
                            initial={{ opacity: 0, x: 80, rotate: 20 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{ delay: 0.2, duration: 1, type: "spring", stiffness: 100 }}
                        >
                            <motion.img
                                src="/images/gdg-logo-right.png"
                                alt="GDG Logo"
                                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain drop-shadow-2xl"
                                whileHover={{
                                    scale: 1.15,
                                    rotate: -10,
                                    filter: "drop-shadow(0 20px 40px rgba(52, 168, 83, 0.4))"
                                }}
                                animate={{
                                    y: [0, -15, 0],
                                }}
                                transition={{
                                    y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                                }}
                            />
                        </motion.div>
                    </div>

                    {/* Scroll indicator - Enhanced */}
                    <motion.div
                        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                        animate={{
                            y: [0, 15, 0],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        whileHover={{ scale: 1.2 }}
                    >
                        <span className="text-xs sm:text-sm text-gray-500 font-bold tracking-widest">SCROLL</span>
                        <motion.div
                            className="w-8 h-12 border-2 border-gray-400 rounded-full flex items-start justify-center p-2"
                            whileHover={{ borderColor: "#4285F4" }}
                        >
                            <motion.div
                                className="w-1.5 h-2 bg-gdgBlue rounded-full"
                                animate={{ y: [0, 16, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section >
    );
};
