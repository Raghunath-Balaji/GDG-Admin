/**
 * Button Component - Enhanced with ripple effect and Google-style animations
 */
import { useState } from 'react';
import { motion } from 'framer-motion';

export const Button = ({
    children,
    variant = 'primary',
    onClick,
    href,
    className = '',
    loading = false,
    disabled = false,
    ...props
}) => {
    const [ripples, setRipples] = useState([]);

    const baseStyles = 'relative overflow-hidden px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-block text-center';

    const variants = {
        primary: 'bg-gdgBlue text-white hover:bg-opacity-90 shadow-lg hover:shadow-glow-blue hover:shadow-2xl active:scale-95',
        secondary: 'bg-gdgGreen text-white hover:bg-opacity-90 shadow-lg hover:shadow-glow-green hover:shadow-2xl active:scale-95',
        outline: 'border-2 border-gdgBlue text-gdgBlue hover:bg-gdgBlue hover:text-white hover:shadow-lg active:scale-95',
        red: 'bg-gdgRed text-white hover:bg-opacity-90 shadow-lg hover:shadow-glow-red hover:shadow-2xl active:scale-95',
        yellow: 'bg-gdgYellow text-gray-900 hover:bg-opacity-90 shadow-lg hover:shadow-glow-yellow hover:shadow-2xl active:scale-95',
    };

    const buttonClasses = `${baseStyles} ${variants[variant]} ${className} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`;

    const handleClick = (e) => {
        if (disabled || loading) return;

        // Create ripple effect (Material Design style)
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const newRipple = { x, y, size, key: Date.now() };
        setRipples([...ripples, newRipple]);

        setTimeout(() => {
            setRipples(ripples => ripples.filter(r => r.key !== newRipple.key));
        }, 600);

        if (onClick) onClick(e);
    };

    const content = (
        <>
            {/* Ripple effects */}
            {ripples.map((ripple) => (
                <motion.span
                    key={ripple.key}
                    className="absolute bg-white rounded-full opacity-30 pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                    }}
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                />
            ))}

            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {loading && (
                    <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                )}
                {children}
            </span>
        </>
    );

    if (href && !disabled && !loading) {
        return (
            <motion.a
                href={href}
                className={buttonClasses}
                onClick={handleClick}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ y: 0, scale: 0.98 }}
                {...props}
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.button
            className={buttonClasses}
            onClick={handleClick}
            disabled={disabled || loading}
            whileHover={!disabled && !loading ? { y: -3, scale: 1.02 } : {}}
            whileTap={!disabled && !loading ? { y: 0, scale: 0.98 } : {}}
            {...props}
        >
            {content}
        </motion.button>
    );
};
