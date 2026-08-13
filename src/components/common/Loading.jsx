/**
 * Loading Components - Google-style loaders
 */
import { motion } from 'framer-motion';

// Spinning loader with Google colors
export const Spinner = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24'
    };

    return (
        <div className={`${sizes[size]} ${className} relative`}>
            <motion.div
                className="absolute inset-0 rounded-full border-4 border-gray-200"
                style={{ borderTopColor: '#4285F4', borderRightColor: '#EA4335', borderBottomColor: '#FBBC04', borderLeftColor: '#34A853' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
};

// Page loader with Google branding
export const PageLoader = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
            >
                <motion.div
                    className="text-6xl font-heading font-bold mb-6 text-gradient"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    GDG
                </motion.div>
                <Spinner size="lg" />
                <motion.p
                    className="mt-6 text-gray-600 font-medium"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    Loading...
                </motion.p>
            </motion.div>
        </div>
    );
};

// Skeleton loader for cards
export const SkeletonCard = () => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-soft">
            <motion.div
                className="space-y-4"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse" />
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 animate-pulse" />
                <div className="space-y-2">
                    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
                    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-5/6 animate-pulse" />
                </div>
            </motion.div>
        </div>
    );
};

// Loading bar for top of page
export const LoadingBar = ({ progress = 0 }) => {
    return (
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
            <motion.div
                className="h-full bg-gradient-to-r from-gdgBlue via-gdgGreen to-gdgYellow"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
            />
        </div>
    );
};

// Dots loader
export const DotsLoader = ({ color = '#4285F4' }) => {
    return (
        <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                    }}
                />
            ))}
        </div>
    );
};

// Skeleton for team grid
export const SkeletonTeamCard = () => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-soft text-center">
            <motion.div
                initial={{ opacity: 0.6 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-2/3 mx-auto mb-2 animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 mx-auto mb-4 animate-pulse" />
                <div className="space-y-2">
                    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
                    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-4/5 mx-auto animate-pulse" />
                </div>
            </motion.div>
        </div>
    );
};
