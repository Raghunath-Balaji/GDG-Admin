import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../core/context/AuthContext';
import { useContentContext } from '../../core/context/ContentContext';
import { DotBackground } from '../../components/home/DotBackground';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout() {
    const { user, logout, isSuperAdmin, isEventsTeam } = useAuth();
    const { resetToDefaults } = useContentContext();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navigationItems = [
        {
            name: 'Dashboard Overview',
            path: '/admin',
            icon: '📊',
            allowed: true,
            badge: null
        },
        {
            name: 'Events & Event Images',
            path: '/admin/events',
            icon: '📅',
            allowed: true,
            badge: isEventsTeam ? 'Events Scope' : 'Full Access'
        },
        {
            name: 'Core Team List',
            path: '/admin/team',
            icon: '👥',
            allowed: isSuperAdmin,
            restrictedTo: 'Super Admin Only'
        },
        {
            name: 'Gallery Management',
            path: '/admin/gallery',
            icon: '📸',
            allowed: true,
            badge: isEventsTeam ? 'Events Scope' : 'Full Access'
        },
        {
            name: 'Mission, Vision & Text',
            path: '/admin/site-info',
            icon: '🎯',
            allowed: isSuperAdmin,
            restrictedTo: 'Super Admin Only'
        },
        {
            name: 'Contact & Socials',
            path: '/admin/contact',
            icon: '📞',
            allowed: isSuperAdmin,
            restrictedTo: 'Super Admin Only'
        }
    ];

    return (
        <div className="min-h-screen bg-[#fcf9f1] text-black flex flex-col md:flex-row font-sans relative selection:bg-[#FFD700] selection:text-black">
            <DotBackground />

            {/* Mobile Header Bar */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white border-b-[3px] border-black sticky top-0 z-40 shadow-[0_4px_0_0_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2.5">
                    <div className="flex gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] border border-black" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335] border border-black" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC04] border border-black" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] border border-black" />
                    </div>
                    <span className="font-black text-sm uppercase text-black">GDG CIT Admin</span>
                </div>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-xl bg-[#FFD700] border-[2px] border-black text-black font-black text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                    {sidebarOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Sidebar Overlay for Mobile */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Navigation */}
            <aside
                className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-white border-r-[3px] border-black p-5 flex flex-col justify-between z-50 transition-transform duration-300 md:translate-x-0 shadow-[4px_0px_0px_0px_rgba(0,0,0,1)] ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div>
                    {/* Brand Header */}
                    <div className="mb-6 pb-4 border-b-[3px] border-black">
                        <a href="/" className="inline-flex items-center gap-2.5 group">
                            <div className="flex gap-1 bg-black p-1.5 rounded-xl border-[2px] border-black">
                                <span className="w-3 h-3 rounded-full bg-[#4285F4]" />
                                <span className="w-3 h-3 rounded-full bg-[#EA4335]" />
                                <span className="w-3 h-3 rounded-full bg-[#FBBC04]" />
                                <span className="w-3 h-3 rounded-full bg-[#34A853]" />
                            </div>
                            <div>
                                <h2 className="font-black text-base uppercase text-black tracking-tight group-hover:text-[#4285F4] transition-colors">
                                    GDG CIT Admin
                                </h2>
                                <span className="text-[10px] font-black uppercase bg-[#4285F4] text-white px-2 py-0.5 rounded-full border-[1.5px] border-black inline-block">
                                    Control Center
                                </span>
                            </div>
                        </a>
                    </div>

                    {/* Active User Card */}
                    <div className="mb-6 p-4 rounded-2xl bg-[#FFD700] border-[2.5px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
                        <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                isSuperAdmin ? 'bg-[#EA4335]' : 'bg-[#34A853]'
                            }`}
                        >
                            {isSuperAdmin ? '👑' : '📅'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-black uppercase text-black truncate">{user?.name}</p>
                            <span className="inline-block text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-white text-black border-[1.5px] border-black mt-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                {isSuperAdmin ? 'Super Admin / Head' : 'Events Team'}
                            </span>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className="space-y-2">
                        <p className="text-[10px] font-black text-black uppercase tracking-wider px-2 mb-2">
                            Admin Modules
                        </p>

                        {navigationItems.map((item) => {
                            if (!item.allowed) {
                                return (
                                    <div
                                        key={item.path}
                                        className="px-3 py-2.5 rounded-2xl bg-gray-100 border-[2px] border-gray-300 text-gray-400 flex items-center justify-between text-xs font-black uppercase cursor-not-allowed opacity-60"
                                        title={`Restricted to ${item.restrictedTo}`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-base grayscale">{item.icon}</span>
                                            <span>{item.name}</span>
                                        </div>
                                        <span className="text-[9px] font-black bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full border border-gray-400">
                                            🔒 Locked
                                        </span>
                                    </div>
                                );
                            }

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === '/admin'}
                                    onClick={() => setSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        `px-3 py-2.5 rounded-2xl font-black text-xs uppercase flex items-center justify-between border-[2.5px] border-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                            isActive
                                                ? 'bg-[#4285F4] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-1'
                                                : 'bg-white text-black hover:bg-[#FFD700] hover:-translate-y-0.5'
                                        }`
                                    }
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className="text-base">{item.icon}</span>
                                        <span>{item.name}</span>
                                    </div>
                                    {item.badge && (
                                        <span className="text-[9px] font-black bg-white text-black px-2 py-0.5 rounded-full border-[1.5px] border-black">
                                            {item.badge}
                                        </span>
                                    )}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t-[3px] border-black space-y-2">
                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full px-3 py-2 rounded-2xl bg-white hover:bg-black hover:text-white border-[2.5px] border-black text-xs font-black uppercase flex items-center gap-2 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <span>🌐</span>
                        <span>View Live Website</span>
                        <span className="ml-auto text-[10px]">↗</span>
                    </a>

                    <button
                        onClick={resetToDefaults}
                        className="w-full px-3 py-2 rounded-2xl bg-[#FFD700] hover:bg-[#FBBC04] border-[2.5px] border-black text-black text-xs font-black uppercase flex items-center gap-2 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer text-left"
                    >
                        <span>🔄</span>
                        <span>Reset Content Defaults</span>
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full px-3 py-2.5 rounded-2xl bg-[#EA4335] hover:bg-[#d9382a] text-white border-[2.5px] border-black text-xs font-black uppercase flex items-center justify-center gap-2 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 cursor-pointer mt-2"
                    >
                        <span>🚪</span>
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full z-10 relative">
                <Outlet />
            </main>
        </div>
    );
}
