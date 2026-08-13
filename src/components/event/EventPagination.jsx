import { motion } from 'framer-motion';

export const EventPagination = ({
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
        <div className="flex flex-col items-center gap-6 mt-12 mb-16 z-20 relative">
            <div className="text-lg font-bold">
                SHOWING <span className="text-[#4285F4] font-black">{startItem}</span> TO{' '}
                <span className="text-[#4285F4] font-black">{endItem}</span> OF{' '}
                <span className="text-[#4285F4] font-black">{totalItems}</span> ITEMS
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-black border-[3px] border-black transition-transform ${
                        currentPage === 1
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-50'
                            : 'bg-white hover:-translate-y-1 hover:bg-[#FFD700]'
                    }`}
                >
                    &lt;
                </button>

                {getPageNumbers().map((page, index) => {
                    if (page === 'ellipsis') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-3 font-black text-2xl">
                                ...
                            </span>
                        );
                    }

                    const isActive = page === currentPage;
                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-12 h-12 rounded-xl font-black text-xl border-[3px] border-black transition-transform ${
                                isActive
                                    ? 'bg-[#34A853] text-white scale-110'
                                    : 'bg-white hover:-translate-y-1 hover:bg-[#4285F4] hover:text-white'
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-black border-[3px] border-black transition-transform ${
                        currentPage === totalPages
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-50'
                            : 'bg-white hover:-translate-y-1 hover:bg-[#FFD700]'
                    }`}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};
