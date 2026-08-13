/**
 * Pagination Component - Modern pagination with animations
 */
import { motion } from 'framer-motion';

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage = 6,
    totalItems = 0
}) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) pages.push(i);
                pages.push('ellipsis');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('ellipsis');
                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('ellipsis');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('ellipsis');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="flex flex-col items-center gap-4 mt-12">
            {/* Items count */}
            <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{startItem}</span> to{' '}
                <span className="font-semibold text-gray-900">{endItem}</span> of{' '}
                <span className="font-semibold text-gray-900">{totalItems}</span> items
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center gap-2">
                {/* Previous button */}
                <motion.button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition-all ${currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gdgBlue hover:text-gdgBlue hover:shadow-md'
                        }`}
                    whileHover={currentPage === 1 ? {} : { scale: 1.05 }}
                    whileTap={currentPage === 1 ? {} : { scale: 0.95 }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </motion.button>

                {/* Page numbers */}
                {getPageNumbers().map((page, index) => {
                    if (page === 'ellipsis') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-3 text-gray-400">
                                ...
                            </span>
                        );
                    }

                    const isActive = page === currentPage;
                    return (
                        <motion.button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-10 h-10 rounded-lg font-bold transition-all ${isActive
                                    ? 'bg-gradient-to-r from-gdgBlue to-gdgGreen text-white shadow-lg'
                                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gdgBlue hover:text-gdgBlue hover:shadow-md'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {page}
                        </motion.button>
                    );
                })}

                {/* Next button */}
                <motion.button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition-all ${currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gdgBlue hover:text-gdgBlue hover:shadow-md'
                        }`}
                    whileHover={currentPage === totalPages ? {} : { scale: 1.05 }}
                    whileTap={currentPage === totalPages ? {} : { scale: 0.95 }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </motion.button>
            </div>
        </div>
    );
};
