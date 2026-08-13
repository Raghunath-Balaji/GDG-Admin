/**
 * Badge Component - Enhanced with pulse animation
 */
import { motion } from 'framer-motion';
import { CATEGORY_COLORS } from '../../core/utils/constants';

export const Badge = ({ label, category = 'default', pulse = false, className = '' }) => {
    const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.default;

    return (
        <motion.span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${className}`}
            style={{
                backgroundColor: `${color}20`,
                color: color,
                border: `1px solid ${color}40`
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            animate={pulse ? {
                scale: [1, 1.05, 1],
                boxShadow: [
                    `0 0 0 0 ${color}40`,
                    `0 0 0 4px ${color}20`,
                    `0 0 0 0 ${color}40`
                ]
            } : {}}
            transition={pulse ? { duration: 2, repeat: Infinity } : { duration: 0.3 }}
        >
            {label}
        </motion.span>
    );
};
