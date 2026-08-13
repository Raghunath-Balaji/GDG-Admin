import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/home/Navbar'; // Using home Navbar for consistency
import { Footer } from '../components/layout/Footer';
import { DotBackground } from '../components/home/DotBackground';
import { EventFilter } from '../components/event/EventFilter';
import { EventList } from '../components/event/EventList';
import { EventPagination } from '../components/event/EventPagination';
import { HeroCarousel } from '../components/event/HeroCarousel';
import { useContent } from '../core/hooks/useContent';
import { isFutureDate } from '../core/utils/formatDate';

const ITEMS_PER_PAGE = 6;

const Events = () => {
    const { data: events, loading: eventsLoading } = useContent('events');
    const { data: activities, loading: activitiesLoading } = useContent('activities');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [upcomingPage, setUpcomingPage] = useState(1);
    const [pastPage, setPastPage] = useState(1);

    const loading = eventsLoading || activitiesLoading;

    // Filter events by category
    const filteredEvents = events?.filter(event =>
        selectedCategory === 'all' || event.category === selectedCategory
    ) || [];

    // Separate upcoming and past events
    const upcomingEvents = useMemo(() =>
        filteredEvents.filter(e => isFutureDate(e.date)),
        [filteredEvents]
    );

    const pastEvents = useMemo(() =>
        filteredEvents.filter(e => !isFutureDate(e.date)),
        [filteredEvents]
    );

    // Reset pagination when category changes
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setUpcomingPage(1);
        setPastPage(1);
    };

    // Paginated data
    const paginatedUpcoming = useMemo(() => {
        const start = (upcomingPage - 1) * ITEMS_PER_PAGE;
        return upcomingEvents.slice(start, start + ITEMS_PER_PAGE);
    }, [upcomingEvents, upcomingPage]);

    const paginatedPast = useMemo(() => {
        const start = (pastPage - 1) * ITEMS_PER_PAGE;
        return pastEvents.slice(start, start + ITEMS_PER_PAGE);
    }, [pastEvents, pastPage]);

    const upcomingTotalPages = Math.ceil(upcomingEvents.length / ITEMS_PER_PAGE);
    const pastTotalPages = Math.ceil(pastEvents.length / ITEMS_PER_PAGE);

    if (loading) {
        return (
            <div className="min-h-screen w-full relative overflow-hidden bg-white">
                <Navbar />
                <DotBackground />
                <main className="min-h-screen pt-40 pb-20 relative z-10 flex items-center justify-center">
                    <h2 className="text-4xl font-black uppercase">Loading Events...</h2>
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
            <main className="relative z-10 pt-32 pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    
                    {/* Hero Carousel */}
                    <HeroCarousel events={events} activities={activities} />

                    {/* Stats Marquee */}
                    <div className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden mb-20 bg-black/5 py-8 border-y-[3px] border-black">
                        {(() => {
                            const statsData = [
                                { title: 'Upcoming', value: upcomingEvents.length, bg: '#34A853', text: 'white' },
                                { title: 'Total Events', value: events?.length || 0, bg: '#FFD700', text: 'black' },
                                { title: 'Participants', value: '800+', bg: '#4285F4', text: 'white' },
                                { title: 'Articles Published', value: activities?.length || 0, bg: '#FFD700', text: 'black' },
                                { title: 'Contributors', value: '50+', bg: '#EA4335', text: 'white' },
                                { title: 'Readers', value: '10K+', bg: '#34A853', text: 'white' }
                            ];
                            
                            // Duplicate array for seamless infinite scroll
                            const marqueeItems = [...statsData, ...statsData];

                            return (
                                <div className="flex w-max">
                                    <motion.div
                                        className="flex gap-6 px-3"
                                        animate={{ x: ["0%", "-50%"] }}
                                        transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                                    >
                                        {marqueeItems.map((stat, i) => (
                                            <div 
                                                key={i} 
                                                className="border-[3px] border-black rounded-3xl px-8 py-6 flex flex-col justify-center min-w-[250px]"
                                                style={{ backgroundColor: stat.bg, color: stat.text }}
                                            >
                                                <div className="text-4xl md:text-5xl font-black mb-2 text-center">{stat.value}</div>
                                                <div className="font-bold uppercase tracking-widest text-sm text-center">{stat.title}</div>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            );
                        })()}
                    </div>

                    {/* Filter */}
                    <EventFilter
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                    />

                    {/* Upcoming Events */}
                    {upcomingEvents.length > 0 && (
                        <div>
                            <EventList events={paginatedUpcoming} title="Upcoming Events" />
                            <EventPagination
                                currentPage={upcomingPage}
                                totalPages={upcomingTotalPages}
                                onPageChange={setUpcomingPage}
                                itemsPerPage={ITEMS_PER_PAGE}
                                totalItems={upcomingEvents.length}
                            />
                        </div>
                    )}

                    {/* Past Events */}
                    {pastEvents.length > 0 && (
                        <div>
                            <EventList events={paginatedPast} title="Past Events" />
                            <EventPagination
                                currentPage={pastPage}
                                totalPages={pastTotalPages}
                                onPageChange={setPastPage}
                                itemsPerPage={ITEMS_PER_PAGE}
                                totalItems={pastEvents.length}
                            />
                        </div>
                    )}

                    {/* No Events State */}
                    {filteredEvents.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-8xl mb-8">🔍</div>
                            <h2 className="text-3xl font-black uppercase tracking-widest mb-8">No Events Found</h2>
                            <button
                                onClick={() => handleCategoryChange('all')}
                                className="px-8 py-4 bg-[#EA4335] text-white border-[3px] border-black rounded-full font-black uppercase tracking-widest hover:-translate-y-1 transition-transform"
                            >
                                View All Events
                            </button>
                        </div>
                    )}
                    
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Events;
