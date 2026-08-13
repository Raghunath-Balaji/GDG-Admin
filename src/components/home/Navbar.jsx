import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const navItems = [
        { name: 'Home', color: '#4285F4', path: '/' },       // Blue
        { name: 'Events', color: '#FBBC04', path: '/events' }, // Yellow
        { name: 'Gallery', color: '#34A853', path: '/gallery' }, // Green
        { name: 'Team', color: '#EA4335', path: '/team' },   // Red
        { name: 'Contact', color: '#4285F4', path: '/contact' } // Blue
    ];

    return (
        <nav className="w-full absolute top-0 left-0 right-0 z-50 pt-4 sm:pt-8 px-3 sm:px-8 lg:px-12 flex flex-wrap justify-between items-center max-w-7xl mx-auto gap-3">
            {/* Brutalist Logo with GDG Logo Image inside */}
            <Link to="/">
                <motion.div 
                    whileHover={{ rotate: 0 }}
                    className="bg-white border-[3px] border-black rounded-3xl px-3 sm:px-4 py-1.5 sm:py-2 -rotate-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 sm:gap-3"
                >
                    <img 
                        src="/images/gdg-logo.png" 
                        alt="GDG Logo" 
                        className="w-6 h-6 sm:w-10 sm:h-10 object-contain"
                    />
                    <span className="text-lg sm:text-2xl md:text-3xl font-black tracking-tighter uppercase text-black leading-none">
                        GDG <span className="text-[#EA4335]">CIT</span>
                    </span>
                </motion.div>
            </Link>

            {/* Nav Buttons */}
            <ul className="flex items-center gap-1.5 sm:gap-4 md:gap-6">
                {navItems.map((item, index) => (
                    <li key={index}>
                        <motion.a 
                            href={item.path}
                            whileHover={{ scale: 1.05, y: -4, rotate: (index % 2 === 0 ? 3 : -3) }}
                            whileTap={{ scale: 0.95, y: 0 }}
                            className="text-[11px] sm:text-sm md:text-lg font-black border-[2.5px] sm:border-[3px] border-black rounded-full px-2.5 sm:px-5 md:px-6 py-1 sm:py-2 block uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            style={{ 
                                backgroundColor: item.color,
                                color: item.color === '#FBBC04' ? '#000000' : '#FFFFFF'
                            }}
                        >
                            {item.name}
                        </motion.a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
