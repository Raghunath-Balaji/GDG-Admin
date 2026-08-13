/**
 * SectionTitle Component - Enhanced with animated underline
 */
import { motion } from 'framer-motion';

export const SectionTitle = ({ title, subtitle, centered = true }) => {
    return (
        <motion.div
            className={`mb-12 ${centered ? 'text-center' : ''}`}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="relative inline-block">
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gray-900">
                    {title}
                </h2>
                {/* Animated underline with Google colors */}
                <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-gdgBlue via-gdgGreen to-gdgYellow rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                />
            </div>
            {subtitle && (
                <motion.p
                    className="text-lg text-gray-600 max-w-2xl mx-auto mt-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    {subtitle}
                </motion.p>
            )}
        </motion.div>
    );
};
