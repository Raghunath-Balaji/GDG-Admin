/**
 * PulseCounters Component - Animated metric counters
 */
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { useSiteContext } from '../../core/context/SiteContext';
import { Container } from '../layout/Container';

const Counter = ({ value, label, color, delay = 0 }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, value, {
            duration: 2,
            delay: delay,
            ease: 'easeOut'
        });

        return animation.stop;
    }, [count, value, delay]);

    return (
        <motion.div
            className="text-center p-6"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        >
            <motion.div
                className="text-5xl md:text-6xl font-heading font-bold mb-2"
                style={{ color }}
            >
                <motion.span>{rounded}</motion.span>+
            </motion.div>
            <div className="text-gray-600 font-medium text-lg">{label}</div>
        </motion.div>
    );
};

export const PulseCounters = () => {
    const { settings } = useSiteContext();
    const metrics = settings?.communityMetrics;

    const counters = [
        { value: metrics?.eventsCompleted || 25, label: 'Events Conducted', color: '#4285F4' },
        { value: metrics?.totalMembers || 500, label: 'Community Members', color: '#EA4335' },
        { value: metrics?.bootcampsHeld || 8, label: 'Bootcamps', color: '#FBBC04' },
        { value: metrics?.awardsWon || 3, label: 'Awards Won', color: '#34A853' },
    ];

    return (
        <section className="py-20 bg-white">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {counters.map((counter, index) => (
                        <Counter
                            key={counter.label}
                            value={counter.value}
                            label={counter.label}
                            color={counter.color}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};
