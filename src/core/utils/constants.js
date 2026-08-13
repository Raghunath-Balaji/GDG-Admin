/**
 * Global constants and configuration
 */

// Color tokens for event categories
export const CATEGORY_COLORS = {
    web: '#4285F4', // Blue
    android: '#34A853', // Green
    cloud: '#FBBC04', // Yellow
    ml: '#EA4335', // Red
    hackathon: '#9334E6', // Purple - custom
    default: '#6B7280' // Gray
};

// Category labels
export const CATEGORY_LABELS = {
    web: 'Web Development',
    android: 'Android & Mobile',
    cloud: 'Cloud Computing',
    ml: 'Machine Learning',
    hackathon: 'Hackathon',
    all: 'All Events'
};

// Responsive breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
};

// Animation durations (in seconds)
export const ANIMATION_DURATION = {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5
};

// Social media icon names
export const SOCIAL_ICONS = {
    github: 'GitHub',
    linkedin: 'LinkedIn',
    instagram: 'Instagram',
    twitter: 'Twitter',
    youtube: 'YouTube',
    email: 'Email'
};

// Navigation links
export const NAV_LINKS = [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Team', path: '/team' },
    { label: 'Contact', path: '/contact' }
];
