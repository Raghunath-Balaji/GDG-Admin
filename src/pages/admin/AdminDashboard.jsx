import { useAuth } from '../../core/context/AuthContext';
import { useContentContext } from '../../core/context/ContentContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
    const { user, isSuperAdmin } = useAuth();
    const { events, team } = useContentContext();

    const upcomingEventsCount = events?.filter(e => new Date(e.date) >= new Date()).length || 0;

    return (
        <div className="space-y-8">
            {/* Header Banner */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 rounded-[36px] border-[3px] border-black bg-[#FFD700] text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
            >
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase mb-3 bg-white text-black border-[2.5px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <span>{isSuperAdmin ? '👑 Super Admin Access' : '📅 Events Team Restricted Access'}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black" style={{ WebkitTextStroke: '1px black' }}>
                            Welcome, {user?.name}!
                        </h1>
                        <p className="text-black font-bold text-sm mt-3 max-w-2xl leading-relaxed">
                            {isSuperAdmin
                                ? 'You have full administrative authority over the GDG CIT website. Manage events, core team roster, mission/vision statements, and contact details.'
                                : 'You have restricted access to manage all GDG CIT events and event images.'}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 min-w-[220px]">
                        <Link
                            to="/admin/events"
                            className="px-5 py-3.5 rounded-2xl bg-[#4285F4] hover:bg-black text-white font-black text-xs uppercase text-center border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                        >
                            <span>📅</span>
                            <span>Manage Events & Images</span>
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-[28px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
                    <div>
                        <p className="text-xs font-black uppercase text-gray-600 tracking-wider">Total Events</p>
                        <h3 className="text-4xl font-black text-black mt-1">{events?.length || 0}</h3>
                        <p className="text-xs font-black text-[#34A853] mt-1">✓ Active in System</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-[#4285F4] text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-2xl font-black">
                        📅
                    </div>
                </div>

                <div className="p-6 rounded-[28px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
                    <div>
                        <p className="text-xs font-black uppercase text-gray-600 tracking-wider">Upcoming Events</p>
                        <h3 className="text-4xl font-black text-black mt-1">{upcomingEventsCount}</h3>
                        <p className="text-xs font-bold text-gray-500 mt-1">Scheduled sessions</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-[#FFD700] text-black border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-2xl font-black">
                        🚀
                    </div>
                </div>

                <div className="p-6 rounded-[28px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
                    <div>
                        <p className="text-xs font-black uppercase text-gray-600 tracking-wider">Core Team</p>
                        <h3 className="text-4xl font-black text-black mt-1">{team?.length || 0}</h3>
                        <p className="text-xs font-bold text-gray-500 mt-1">
                            {isSuperAdmin ? 'Editable by Head' : 'Read-only'}
                        </p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-[#EA4335] text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-2xl font-black">
                        👥
                    </div>
                </div>

                <div className="p-6 rounded-[28px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
                    <div>
                        <p className="text-xs font-black uppercase text-gray-600 tracking-wider">Site Status</p>
                        <h3 className="text-4xl font-black text-[#34A853] mt-1">Live</h3>
                        <p className="text-xs font-bold text-gray-500 mt-1">Directly connected</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-[#34A853] text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-2xl font-black">
                        🌐
                    </div>
                </div>
            </div>
        </div>
    );
}
