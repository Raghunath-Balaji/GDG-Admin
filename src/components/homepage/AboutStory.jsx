/**
 * AboutStory Component - Our story and mission
 * Unique content for GDG CIT
 */
import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';

export const AboutStory = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Our Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gdgBlue to-gdgGreen flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-heading font-bold text-gray-900">
                                    Our Mission
                                </h2>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                At GDG CIT, we believe in thinking beyond the conventional. Our resources aren't just directed toward organizing events, but also towards fostering a culture of <span className="font-semibold text-gdgBlue">continuous learning</span> and <span className="font-semibold text-gdgGreen">collaborative growth</span>.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                We host flagship events, competitive programming challenges, and insightful workshops that empower students to learn, build, and innovate with cutting-edge technologies.
                            </p>
                            <Link to="/contact">
                                <Button variant="primary">
                                    Join Our Community
                                </Button>
                            </Link>
                        </Card>
                    </motion.div>

                    {/* Our Story */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card className="h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gdgRed to-gdgYellow flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-heading font-bold text-gray-900">
                                    Our Story
                                </h2>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed mb-4">
                                GDG CIT started as a vision to create a thriving tech community at Chennai Institute of Technology. What began as a small group of passionate developers has grown into a vibrant community of innovators and learners.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed mb-4">
                                Over the years, we've empowered countless students through hands-on workshops, hackathons, and study jams. From web development to machine learning, cloud computing to mobile development — we cover it all.
                            </p>
                            <div className="bg-gradient-to-r from-gdgBlue/10 via-gdgGreen/10 to-gdgYellow/10 rounded-lg p-6 mt-6">
                                <p className="text-gray-700 font-medium text-center">
                                    A community proudly powered by <span className="font-bold text-gdgBlue">Google</span><span className="font-bold text-gdgRed">For</span><span className="font-bold text-gdgYellow">Dev</span><span className="font-bold text-gdgGreen">s</span>
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};
