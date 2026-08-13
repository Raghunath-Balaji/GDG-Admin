/**
 * Activities Page - Modern blog-style layout with enhanced design and pagination
 */
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Container } from '../components/layout/Container';
import { Card } from '../components/common/Card';
import { Pagination } from '../components/common/Pagination';
import { useContent } from '../core/hooks/useContent';
import { SkeletonCard } from '../components/common/Loading';

const ITEMS_PER_PAGE = 6;

const Activities = () => {
    const { data: activities, loading } = useContent('activities');
    const [currentPage, setCurrentPage] = useState(1);

    // Paginated data
    const paginatedActivities = useMemo(() => {
        if (!activities) return [];
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return activities.slice(start, start + ITEMS_PER_PAGE);
    }, [activities, currentPage]);

    const totalPages = Math.ceil((activities?.length || 0) / ITEMS_PER_PAGE);

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <main className="pt-24 pb-16">
                    <Container>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    </Container>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 opacity-[0.04]">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gdgYellow rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gdgRed rounded-full blur-3xl" />
                </div>

                <Container className="relative z-10">
                    <motion.div
                        className="text-center max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="inline-block mb-6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                            <span className="px-4 py-2 bg-gradient-to-r from-gdgYellow to-gdgRed text-white rounded-full text-sm font-bold shadow-lg">
                                📝 Community Stories
                            </span>
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Activities & Insights
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                            Explore our community's journey through articles, tutorials, and event recaps
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mt-12">
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <div className="text-4xl font-black text-gdgYellow mb-2">
                                    {activities?.length || 0}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Articles Published</div>
                            </motion.div>
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="text-4xl font-black text-gdgRed mb-2">
                                    50+
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Contributors</div>
                            </motion.div>
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <div className="text-4xl font-black text-gdgGreen mb-2">
                                    10K+
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Readers</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Activities Grid */}
            <main className="pb-20">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {paginatedActivities?.map((activity, index) => (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Card className="h-full flex flex-col overflow-hidden group" hover={true}>
                                    {/* Cover Image */}
                                    <div className="relative h-48 -mx-8 -mt-8 mb-6 overflow-hidden">
                                        {activity.coverImage ? (
                                            <img
                                                src={activity.coverImage}
                                                alt={activity.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gdgBlue/20 via-gdgGreen/20 to-gdgYellow/20 flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-6xl mb-2">📸</div>
                                                    <p className="text-gray-400 text-sm">Activity cover</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                                        {/* Hover effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gdgBlue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        />
</div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {activity.tags?.slice(0, 3).map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 rounded-lg text-xs font-bold text-white"
                                                style={{
                                                    backgroundColor: ['#4285F4', '#34A853', '#FBBC04', '#EA4335'][i % 4]
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-black text-gray-900 mb-3 line-clamp-2 group-hover:text-gdgBlue transition-colors duration-300">
                                        {activity.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                                        {activity.excerpt}
                                    </p>

                                    {/* Meta info */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(activity.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Read more arrow */}
                                        <motion.div
                                            className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-gdgBlue flex items-center justify-center transition-colors duration-300"
                                            whileHover={{ x: 5 }}
                                        >
                                            <svg
                                                className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        itemsPerPage={ITEMS_PER_PAGE}
                        totalItems={activities?.length || 0}
                    />

                    {/* No activities message */}
                    {(!activities || activities.length === 0) && (
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="text-6xl mb-4">📝</div>
                            <p className="text-gray-500 text-xl font-medium">No activities yet</p>
                            <p className="text-gray-400 mt-2">Check back soon for new content!</p>
                        </motion.div>
                    )}
                </Container>
            </main>

            <Footer />
        </div>
    );
};

export default Activities;