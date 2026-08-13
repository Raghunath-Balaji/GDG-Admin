/**
 * EventTimeline Component - Clean, professional vertical timeline
 */
import { motion } from 'framer-motion';
import { Container } from '../layout/Container';

// Helper to check if date is in the future
const isFutureDate = (dateString) => {
    return new Date(dateString) > new Date();
};

// Format date to friendly format
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const EventTimeline = ({ events = [] }) => {
    const upcomingEvents = events.filter(e => isFutureDate(e.date));
    const pastEvents = events.filter(e => !isFutureDate(e.date)).slice(0, 5);

    const categoryColors = {
        'workshop': '#A855F7',
        'hackathon': '#4285F4',
        'android': '#34A853',
        'cloud': '#FBBC04',
        'web': '#EA4335',
        'ml': '#A855F7'
    };

    const getEventColor = (category) => {
        return categoryColors[category] || '#6B7280';
    };

    const TimelineEvent = ({ event, isUpcoming, isLast }) => {
        const color = getEventColor(event.category);

        return (
            <motion.div
                className="relative pb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex gap-8">
                    {/* Timeline Column */}
                    <div className="relative flex flex-col items-center">
                        {/* Node */}
                        <motion.div
                            className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-10 relative"
                            style={{ backgroundColor: color }}
                            whileHover={{ scale: 1.15 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="w-7 h-7 bg-white rounded-full" />

                            {isUpcoming && (
                                <motion.div
                                    className="absolute inset-0 rounded-full"
                                    style={{ border: `3px solid ${color}` }}
                                    animate={{
                                        scale: [1, 1.4, 1],
                                        opacity: [0.8, 0, 0.8]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            )}
                        </motion.div>

                        {/* Vertical Line */}
                        {!isLast && (
                            <div
                                className="absolute top-14 bottom-0 w-1 rounded-full"
                                style={{
                                    background: isUpcoming
                                        ? `linear-gradient(to bottom, ${color}, ${color}50)`
                                        : '#E5E7EB'
                                }}
                            />
                        )}
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 -mt-1">
                        <motion.div
                            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300"
                            whileHover={{ y: -4 }}
                        >
                            {/* Category Badge */}
                            <div
                                className="inline-block px-3 py-1 rounded-full text-white text-xs font-bold mb-3"
                                style={{ backgroundColor: color }}
                            >
                                {event.category.toUpperCase()}
                            </div>

                            {/* Title */}
                            <h4 className="text-xl font-bold text-gray-900 mb-3">
                                {event.title}
                            </h4>

                            {/* Meta Info */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {formatDate(event.date)}
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {event.time}
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {event.venue}
                                </span>
                            </div>

                            {/* Summary */}
                            {event.summary && (
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {event.summary}
                                </p>
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <section className="py-24 bg-white">
            <Container>
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-6xl font-black mb-4 text-gray-900">
                        Event Timeline
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Our journey of learning and innovation
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {/* Upcoming Events */}
                    {upcomingEvents.length > 0 && (
                        <div className="mb-16">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">
                                Upcoming Events
                            </h3>
                            {upcomingEvents.map((event, index) => (
                                <TimelineEvent
                                    key={event.id}
                                    event={event}
                                    isUpcoming={true}
                                    isLast={index === upcomingEvents.length - 1 && pastEvents.length === 0}
                                />
                            ))}
                        </div>
                    )}

                    {/* Past Events */}
                    {pastEvents.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-bold text-gray-700 mb-8">
                                Recent Past Events
                            </h3>
                            {pastEvents.map((event, index) => (
                                <TimelineEvent
                                    key={event.id}
                                    event={event}
                                    isUpcoming={false}
                                    isLast={index === pastEvents.length - 1}
                                />
                            ))}
                        </div>
                    )}

                    {/* No events message */}
                    {upcomingEvents.length === 0 && pastEvents.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No events to display at the moment.</p>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
};
