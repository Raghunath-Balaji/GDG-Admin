import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/home/Navbar';
import { Footer } from '../components/layout/Footer';
import { DotBackground } from '../components/home/DotBackground';
import { useContent } from '../core/hooks/useContent';
import { CATEGORY_COLORS } from '../core/utils/constants';

export const Gallery = () => {
    const { data: galleryItems, loading: galleryLoading } = useContent('gallery');
    
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activePhoto, setActivePhoto] = useState(null);

    // Group photos into event albums
    const eventAlbums = useMemo(() => {
        if (!galleryItems) return [];
        const albumMap = {};
        galleryItems.forEach(item => {
            if (!albumMap[item.eventId]) {
                albumMap[item.eventId] = {
                    eventId: item.eventId,
                    eventName: item.eventName,
                    category: item.category,
                    date: item.date,
                    venue: item.venue,
                    coverImage: item.image,
                    photos: []
                };
            }
            albumMap[item.eventId].photos.push(item);
        });
        return Object.values(albumMap);
    }, [galleryItems]);

    // Active photos list for Lightbox keyboard navigation
    const activePhotosList = useMemo(() => {
        if (selectedEvent) {
            return selectedEvent.photos;
        }
        return galleryItems || [];
    }, [selectedEvent, galleryItems]);

    // Keyboard navigation (Escape to close, Left/Right arrows to navigate)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!activePhoto || !activePhotosList.length) return;
            const currentIndex = activePhotosList.findIndex(img => img.id === activePhoto.id);

            if (e.key === 'Escape') {
                setActivePhoto(null);
            } else if (e.key === 'ArrowRight') {
                const nextIndex = (currentIndex + 1) % activePhotosList.length;
                setActivePhoto(activePhotosList[nextIndex]);
            } else if (e.key === 'ArrowLeft') {
                const prevIndex = (currentIndex - 1 + activePhotosList.length) % activePhotosList.length;
                setActivePhoto(activePhotosList[prevIndex]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activePhoto, activePhotosList]);

    if (galleryLoading) {
        return (
            <div className="min-h-screen w-full relative overflow-hidden bg-white">
                <Navbar />
                <DotBackground />
                <main className="min-h-screen pt-40 pb-20 relative z-10 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-[4px] border-black border-t-[#4285F4] rounded-full animate-spin mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"></div>
                    <h2 className="text-3xl font-black uppercase tracking-wider text-black">Loading Event Gallery...</h2>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: '#fcf9f1' }}>
            <Navbar />
            <DotBackground />

            {/* Main Content */}
            <main className="relative z-10 pt-32 sm:pt-40 pb-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    
                    {/* Header Section */}
                    {selectedEvent ? (
                        /* Selected Event Header with Back Button */
                        <div className="mb-10">
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-[3px] border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-sm uppercase tracking-wider text-black hover:-translate-y-1 hover:bg-[#4285F4] hover:text-white transition-all mb-6"
                            >
                                <span>←</span> Back to All Event Albums
                            </button>

                            <div className="bg-white border-[3px] border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span
                                        className="px-4 py-1.5 border-[2px] border-black rounded-full text-xs font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
                                        style={{
                                            backgroundColor: CATEGORY_COLORS[selectedEvent.category] || '#4285F4',
                                            color: CATEGORY_COLORS[selectedEvent.category] === '#FBBC04' ? '#000000' : '#FFFFFF'
                                        }}
                                    >
                                        {selectedEvent.category}
                                    </span>
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                        📅 {selectedEvent.date}
                                    </span>
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                        📍 {selectedEvent.venue}
                                    </span>
                                </div>

                                <h1 className="text-3xl sm:text-5xl font-black text-black uppercase tracking-tight leading-tight mb-2">
                                    {selectedEvent.eventName}
                                </h1>

                                <p className="text-sm sm:text-base font-bold text-gray-700">
                                    Showing all <span className="text-[#4285F4] font-black">{selectedEvent.photos.length}</span> photos. Click any photo to view in high resolution.
                                </p>
                            </div>
                        </div>
                    ) : (
                        /* Main Hero Header */
                        <div className="text-center max-w-4xl mx-auto mb-12">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-4xl sm:text-6xl md:text-7xl font-black text-black tracking-tight uppercase leading-none mb-6"
                            >
                                EVENT <span className="text-[#4285F4]">GAL</span><span className="text-[#EA4335]">LA</span><span className="text-[#34A853]">RY</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-base sm:text-xl font-bold text-gray-800 leading-relaxed max-w-2xl mx-auto"
                            >
                                Select an event below to open the album and view all photos!
                            </motion.p>
                        </div>
                    )}

                    {/* Stats Ticker Marquee (Only shown on main view) */}
                    {!selectedEvent && (
                        <div className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden mb-12 bg-black/5 py-6 border-y-[3px] border-black">
                            {(() => {
                                const statsData = [
                                    { title: 'Event Albums', value: eventAlbums.length, bg: '#4285F4', text: 'white' },
                                    { title: 'TechSprint Hackathon', value: '27 Photos', bg: '#FBBC04', text: 'black' },
                                    { title: 'Ground to Cloud', value: '8 Photos', bg: '#34A853', text: 'white' },
                                    { title: 'Total Event Photos', value: galleryItems?.length || 35, bg: '#EA4335', text: 'white' }
                                ];
                                const marqueeItems = [...statsData, ...statsData, ...statsData];

                                return (
                                    <div className="flex w-max">
                                        <motion.div
                                            className="flex gap-4 sm:gap-6 px-3"
                                            animate={{ x: ["0%", "-33.33%"] }}
                                            transition={{ repeat: Infinity, ease: "linear", duration: 18 }}
                                        >
                                            {marqueeItems.map((stat, i) => (
                                                <div 
                                                    key={i} 
                                                    className="border-[3px] border-black rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-4 sm:py-5 flex items-center gap-4 min-w-[200px] sm:min-w-[240px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                                    style={{ backgroundColor: stat.bg, color: stat.text }}
                                                >
                                                    <div className="text-3xl sm:text-4xl font-black">{stat.value}</div>
                                                    <div className="font-bold uppercase tracking-wider text-xs sm:text-sm">{stat.title}</div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    </div>
                                );
                            })()}
                        </div>
                    )}

                    {/* Main Display: Event Albums OR Photos of Selected Event */}
                    {!selectedEvent ? (
                        /* EVENT ALBUMS LIST VIEW */
                        <div>
                            <div className="flex items-center justify-between mb-8 px-2">
                                <h2 className="text-xl sm:text-2xl font-black uppercase text-black">
                                    📁 Select an Event Album ({eventAlbums.length})
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {eventAlbums.map((album, index) => {
                                    const categoryColor = CATEGORY_COLORS[album.category] || '#4285F4';

                                    return (
                                        <motion.div
                                            key={album.eventId}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            onClick={() => setSelectedEvent(album)}
                                            className="group cursor-pointer bg-white border-[3.5px] border-black rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                                        >
                                            {/* Album Cover Container */}
                                            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 border-b-[3.5px] border-black">
                                                <img
                                                    src={album.coverImage}
                                                    alt={album.eventName}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <span className="bg-[#4285F4] text-white border-[2.5px] border-black rounded-full px-5 py-2.5 font-black text-sm uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                                        Open Album ({album.photos.length} Photos) ➔
                                                    </span>
                                                </div>

                                                {/* Category Badge */}
                                                <div
                                                    className="absolute top-4 left-4 border-[2.5px] border-black rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                                    style={{
                                                        backgroundColor: categoryColor,
                                                        color: categoryColor === '#FBBC04' ? '#000000' : '#FFFFFF'
                                                    }}
                                                >
                                                    {album.category}
                                                </div>

                                                {/* Photo Count Pill */}
                                                <div className="absolute top-4 right-4 bg-white/95 text-black border-[2.5px] border-black rounded-full px-3.5 py-1 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                    📸 {album.photos.length} Photos
                                                </div>
                                            </div>

                                            {/* Album Title Footer */}
                                            <div className="p-6 flex items-center justify-between">
                                                <div>
                                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                                                        📅 {album.date}
                                                    </div>
                                                    <h3 className="text-2xl font-black text-black uppercase leading-tight group-hover:text-[#4285F4] transition-colors">
                                                        {album.eventName}
                                                    </h3>
                                                </div>

                                                <span className="w-10 h-10 bg-[#FBBC04] text-black border-[2px] border-black rounded-full font-black text-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-[#4285F4] group-hover:text-white transition-colors flex-shrink-0">
                                                    ➔
                                                </span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        /* PHOTOS GRID OF SELECTED EVENT (Clean Image-Only Cards, No Text Descriptions) */
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {selectedEvent.photos.map((photo, index) => {
                                    return (
                                        <motion.div
                                            key={photo.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.03 }}
                                            onClick={() => setActivePhoto(photo)}
                                            className="group cursor-pointer bg-white border-[3px] border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 relative aspect-[4/3]"
                                        >
                                            <img
                                                src={photo.image}
                                                alt="Event photo"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <span className="bg-white border-[2px] border-black rounded-full px-3.5 py-1.5 font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black">
                                                    🔍 View
                                                </span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Clean Lightbox Modal (High-Res Image, Prev/Next, Download, Close - No Text Description) */}
            <AnimatePresence>
                {activePhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActivePhoto(null)}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-6 md:p-8 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 10 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 10 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-5xl w-full max-h-[90vh] bg-black border-[4px] border-black rounded-3xl overflow-hidden shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center group"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setActivePhoto(null)}
                                className="absolute top-4 right-4 z-30 w-11 h-11 bg-[#EA4335] text-white border-[2.5px] border-black rounded-full font-black text-xl flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform"
                                title="Close (Esc)"
                            >
                                ✕
                            </button>

                            {/* Download Button */}
                            <a
                                href={activePhoto.image}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="absolute top-4 right-18 z-30 px-4 py-2 bg-[#34A853] text-white border-[2.5px] border-black rounded-full font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-transform flex items-center gap-1.5"
                                title="Download Full Image"
                            >
                                <span>📥</span> Download
                            </a>

                            {/* Main High-Res Image */}
                            <img
                                src={activePhoto.image}
                                alt="Event photo full view"
                                className="max-h-[85vh] max-w-full object-contain"
                            />

                            {/* Lightbox Prev / Next Controls */}
                            {activePhotosList.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const currIndex = activePhotosList.findIndex(i => i.id === activePhoto.id);
                                            const prevIndex = (currIndex - 1 + activePhotosList.length) % activePhotosList.length;
                                            setActivePhoto(activePhotosList[prevIndex]);
                                        }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border-[2.5px] border-black rounded-full font-black text-2xl flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform text-black z-20"
                                        title="Previous Photo (←)"
                                    >
                                        ‹
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const currIndex = activePhotosList.findIndex(i => i.id === activePhoto.id);
                                            const nextIndex = (currIndex + 1) % activePhotosList.length;
                                            setActivePhoto(activePhotosList[nextIndex]);
                                        }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border-[2.5px] border-black rounded-full font-black text-2xl flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform text-black z-20"
                                        title="Next Photo (→)"
                                    >
                                        ›
                                    </button>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Gallery;
