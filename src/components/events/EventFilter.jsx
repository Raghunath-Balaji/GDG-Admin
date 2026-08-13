 /**
 * EventFilter Component - Modern pill-style category filter
 */
import { motion } from 'framer-motion';
import { CATEGORY_LABELS } from '../../core/utils/constants';

export const EventFilter = ({ selectedCategory, onCategoryChange }) => {
    const categories = [
        { id: 'all', label: 'All Events', icon: '🎯' },
        { id: 'hackathon', label: 'Hackathons', icon: '💻' },
        { id: 'android', label: 'Android', icon: '📱' },
        { id: 'web', label: 'Web', icon: '🌐' },
        { id: 'cloud', label: 'Cloud', icon: '☁️' },
        { id: 'ml', label: 'ML/AI', icon: '🤖' }
    ];

    const categoryColors = {
        'all': 'from-gray-600 to-gray-700',
        'hackathon': 'from-blue-500 to-blue-600',
        'android': 'from-green-500 to-green-600',
        'web': 'from-red-500 to-red-600',
        'cloud': 'from-yellow-500 to-yellow-600',
        'ml': 'from-purple-500 to-purple-600'
    };

    return (
        <div className="mb-16">
            <motion.div
                className="flex flex-wrap gap-3 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {categories.map((category, index) => (
                    <motion.button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={`group relative px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 overflow-hidden ${selectedCategory === category.id
                                ? 'text-white shadow-xl scale-105'
                                : 'text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg'
                            }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Gradient background for active state */}
                        {selectedCategory === category.id && (
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-r ${categoryColors[category.id]}`}
                                layoutId="activeCategory"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}

                        {/* Content */}
                        <span className="relative z-10 flex items-center gap-2">
                            <span className="text-lg">{category.icon}</span>
                            <span>{category.label}</span>
                        </span>

                        {/* Hover glow effect */}
                        {selectedCategory === category.id && (
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                                style={{
                                    background: 'radial-gradient(circle, white 0%, transparent 70%)'
                                }}
                            />
                        )}
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
};
