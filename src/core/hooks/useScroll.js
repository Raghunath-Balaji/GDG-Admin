/**
 * Custom hook to track scroll position for sticky navbar
 */
import { useState, useEffect } from 'react';

export const useScroll = (threshold = 50) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > threshold;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Check initial scroll position
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled, threshold]);

    return scrolled;
};
