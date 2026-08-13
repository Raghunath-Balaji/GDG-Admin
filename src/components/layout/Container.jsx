/**
 * Container Component - Reusable layout container
 */
export const Container = ({ children, className = '' }) => {
    return (
        <div className={`container mx-auto px-4 lg:px-8 ${className}`}>
            {children}
        </div>
    );
};
