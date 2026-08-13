/**
 * Highlights Component - Premium "What We Do" cards
 */
import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Card } from '../common/Card';

const projects = [
    {
        title: 'DevFest 2023',
        description: 'Chennai\'s biggest developer festival with 800+ attendees',
        icon: '🎉',
        color: '#4285F4',
        gradient: 'from-blue-500 to-blue-600'
    },
    {
        title: 'Study Jams',
        description: 'Hands-on learning programs for Cloud, Android, and Web',
        icon: '📚',
        color: '#34A853',
        gradient: 'from-green-500 to-green-600'
    },
    {
        title: 'Hackathons',
        description: 'Innovation challenges solving real-world problems',
        icon: '💻',
        color: '#EA4335',
        gradient: 'from-red-500 to-red-600'
    },
    {
        title: 'Workshops',
        description: 'Expert-led sessions on cutting-edge technologies',
        icon: '🛠️',
        color: '#FBBC04',
        gradient: 'from-yellow-500 to-yellow-600'
    }
];

export const Highlights = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-96 h-96 bg-gdgBlue rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gdgGreen rounded-full blur-3xl" />
            </div>

            <Container className="relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        What We Do
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Empowering developers through diverse learning opportunities
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.7,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                        >
                            <Card className="text-center h-full relative overflow-hidden group bg-white" hover={true}>
                                {/* Gradient background on hover */}
                                <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-all duration-500`}
                                />

                                {/* Icon with background circle */}
                                <div className="relative mb-6">
                                    <motion.div
                                        className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center relative"
                                        style={{
                                            background: `linear-gradient(135deg, ${project.color}15, ${project.color}30)`
                                        }}
                                        whileHover={{
                                            rotate: [0, -5, 5, -5, 0],
                                            scale: 1.1,
                                            transition: { duration: 0.5 }
                                        }}
                                    >
                                        <span className="text-5xl">{project.icon}</span>
                                    </motion.div>
                                </div>

                                <h3
                                    className="text-2xl font-black mb-3 relative z-10"
                                    style={{ color: project.color }}
                                >
                                    {project.title}
                                </h3>

                                <p className="text-gray-600 relative z-10 leading-relaxed text-base">
                                    {project.description}
                                </p>

                                {/* Bottom accent line with gradient */}
                                <motion.div
                                    className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${project.gradient}`}
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.5, duration: 0.7 }}
                                />
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
};
