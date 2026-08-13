import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroCarousel = ({ activities, events }) => {
    // Prioritize activities as they contain actual photos in public/images/activities-img/
    const items = (activities && activities.length > 0) ? activities : (events || []);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!items || items.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [items?.length]);

    if (!items || items.length === 0) return null;

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

    const currentItem = items[currentIndex];
    const currentTags = Array.isArray(currentItem.tags) 
        ? currentItem.tags 
        : [currentItem.category || 'EVENT'];

    return (
        <div className="w-full max-w-6xl mx-auto mb-16 px-4">
            {/* 1. 3D Card Stack Carousel */}
            <div className="relative w-full h-[380px] sm:h-[450px] md:h-[500px] flex items-center justify-center overflow-hidden py-4">
                {items.map((item, index) => {
                    let pos = index - currentIndex;
                    if (pos < -1) pos += items.length;
                    if (pos > 1) pos -= items.length;

                    const isCenter = pos === 0;
                    const isLeft = pos === -1 || (index === items.length - 1 && currentIndex === 0);
                    const isRight = pos === 1 || (index === 0 && currentIndex === items.length - 1);

                    let transformStyle = {
                        zIndex: isCenter ? 30 : 10,
                        opacity: isCenter ? 1 : isLeft || isRight ? 0.45 : 0,
                        scale: isCenter ? 1 : 0.85,
                        translateX: isCenter ? '0%' : isLeft ? '-42%' : isRight ? '42%' : '0%',
                    };

                    const imageSrc = item.coverImage || item.image || '/images/activities-img/tech-sprint-thumbnail.JPG';

                    return (
                        <motion.div
                            key={item.id || index}
                            initial={false}
                            animate={{
                                scale: transformStyle.scale,
                                opacity: transformStyle.opacity,
                                x: transformStyle.translateX,
                                zIndex: transformStyle.zIndex
                            }}
                            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                            onClick={() => {
                                if (isLeft) prevSlide();
                                if (isRight) nextSlide();
                            }}
                            className={`absolute w-full max-w-4xl h-full rounded-3xl overflow-hidden shadow-2xl ${
                                !isCenter ? 'cursor-pointer pointer-events-auto filter blur-[1px]' : 'pointer-events-none'
                            }`}
                        >
                            {/* Event / Activity Photo */}
                            <div className="w-full h-full relative bg-gray-900">
                                <img
                                    src={imageSrc}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

                                {/* Top Left Badges */}
                                <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-20">
                                    {(Array.isArray(item.tags) ? item.tags : [item.category || 'EVENT']).map((tag, tagIdx) => (
                                        <span 
                                            key={tagIdx}
                                            className="bg-white/95 backdrop-blur-md text-black font-bold text-xs px-3.5 py-1.5 rounded-full shadow border border-gray-200"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Top Right Featured Badge */}
                                <div className="absolute top-5 right-5 z-20">
                                    <span className="bg-[#FBBC04] text-black font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow">
                                        FEATURED
                                    </span>
                                </div>

                                {/* Bottom Left Date & Location Badges */}
                                <div className="absolute bottom-5 left-5 flex flex-wrap items-center gap-2.5 z-20">
                                    <div className="bg-white/95 backdrop-blur-md text-gray-900 font-bold text-xs sm:text-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
                                        <span>📅</span>
                                        <span>{item.date || 'January 6, 2026'}</span>
                                    </div>
                                    <div className="bg-white/95 backdrop-blur-md text-gray-900 font-bold text-xs sm:text-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
                                        <span>📍</span>
                                        <span>{item.venue || 'CIT Campus'}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* 2. Bottom Details Section */}
            <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-gray-100 pt-8">
                {/* Left Side: Title + Description + Buttons */}
                <div className="flex-1 max-w-3xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentItem.id || currentIndex}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
                                {currentItem.title}
                            </h2>
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium line-clamp-2 mb-6">
                                {currentItem.excerpt || currentItem.summary || currentItem.content}
                            </p>

                            {/* Past event - registration closed */}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Side: Navigation Controls */}
                <div className="flex items-center gap-3 self-end md:self-auto pt-4 md:pt-0">
                    <button
                        onClick={prevSlide}
                        className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-all cursor-pointer shadow-sm"
                        aria-label="Previous Slide"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-12 h-12 bg-[#18191C] hover:bg-black text-white rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md"
                        aria-label="Next Slide"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroCarousel;
