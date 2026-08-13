/**
 * Card Component - Premium design with better shadows and modern styling
 */
import { motion, useMotionValue, useTransform } from 'framer-motion';

export const Card = ({
    children,
    className = '',
    glass = false,
    hover = true,
    tilt = false,
    ...props
}) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    const baseStyles = 'rounded-2xl p-8 border';
    const glassStyles = glass ? 'glass border-white/20' : 'bg-white border-gray-100 shadow-lg';
    const hoverStyles = hover ? 'hover:shadow-2xl hover:border-gray-200' : '';

    const handleMouseMove = (e) => {
        if (!tilt || !hover) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / 10);
        y.set((e.clientY - centerY) / 10);
    };

    const handleMouseLeave = () => {
        if (!tilt) return;
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className={`${baseStyles} ${glassStyles} ${hoverStyles} transition-all duration-500 ${className}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={hover ? {
                y: -12,
                scale: 1.03,
                transition: { duration: 0.4, ease: "easeOut" }
            } : {}}
            style={tilt ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : {}}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <div style={tilt ? { transform: 'translateZ(20px)' } : {}}>
                {children}
            </div>
        </motion.div>
    );
};
