/**
 * ActivitiesSlider Component - Enhanced sliding carousel for past activities
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../core/hooks/useContent';
import { Container } from '../layout/Container';

export const ActivitiesSlider = () => {
    const { data: activities, loading } = useContent('activities');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto-play functionality
    useEffect(() => {
        if (!activities || activities.length === 0) return;

        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % activities.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, [activities]);

    const handlePrevious = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + activities.length) % activities.length);
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % activities.length);
    };

    const goToSlide = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    if (loading || !activities || activities.length === 0) {
        return null;
    }

    const currentActivity = activities[currentIndex];

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            x: direction > 0 ? -1000 : 1000,
            opacity: 0,
            scale: 0.8
        })
    };

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-96 h-96 bg-gdgYellow rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gdgBlue rounded-full blur-3xl" />
            </div>

            <Container className="relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-6xl font-black mb-4 text-gray-900">
                        Past Activities
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Moments from our vibrant community events
                    </p>
                </motion.div>

                {/* Carousel Container */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Slides */}
                    <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-3xl">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.4 },
                                    scale: { duration: 0.4 }
                                }}
                                className="absolute inset-0"
                            >
                                <div className="relative h-full bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
                                    {/* Image Section */}
                                    <div className="relative h-2/3 bg-gradient-to-br from-gdgBlue/10 via-gdgGreen/10 to-gdgYellow/10">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center p-8">
                                                <div className="text-8xl mb-4">📸</div>
                                                <p className="text-gray-500 text-sm">
                                                    Activity cover image placeholder
                                                </p>
                                            </div>
                                        </div>

                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                                    </div>

                                    {/* Content Section */}
                                    <div className="relative h-1/3 p-8 md:p-10">
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {currentActivity.tags?.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                                                    style={{
                                                        backgroundColor: ['#4285F4', '#34A853', '#FBBC04', '#EA4335'][index % 4]
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 line-clamp-2">
                                            {currentActivity.title}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-gray-600 text-base leading-relaxed line-clamp-2 mb-4">
                                            {currentActivity.excerpt}
                                        </p>

                                        {/* Meta info */}
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                {currentActivity.author}
                                            </span>
                                            <span>•</span>
                                            <span>{new Date(currentActivity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all z-10 group"
                        aria-label="Previous slide"
                    >
                        <svg className="w-6 h-6 text-gray-700 group-hover:text-gdgBlue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all z-10 group"
                        aria-label="Next slide"
                    >
                        <svg className="w-6 h-6 text-gray-700 group-hover:text-gdgBlue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-3 mt-8">
                        {activities.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-2.5 rounded-full transition-all ${index === currentIndex
                                        ? 'w-12 bg-gradient-to-r from-gdgBlue to-gdgGreen'
                                        : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                                    }`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Slide counter */}
                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-500 font-medium">
                            {currentIndex + 1} / {activities.length}
                        </span>
                    </div>
                </div>
            </Container>
        </section>
    );
};
