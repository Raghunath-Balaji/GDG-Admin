import { Navigate } from 'react-router-dom';
import { useAuth } from '../../core/context/AuthContext';
import { DotBackground } from '../home/DotBackground';
import { motion } from 'framer-motion';

export const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading, isAuthenticated } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#4285F4]"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <div className="min-h-screen bg-[#fcf9f1] flex flex-col items-center justify-center p-6 text-center text-black relative">
                <DotBackground />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md bg-white border-[3.5px] border-black p-8 rounded-[36px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 relative"
                >
                    <div className="w-16 h-16 bg-[#EA4335] text-white rounded-full flex items-center justify-center mx-auto mb-4 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-3xl font-black">
                        🔒
                    </div>
                    <h2 className="text-2xl font-black uppercase mb-2 text-black" style={{ WebkitTextStroke: '0.5px black' }}>
                        Access Restricted
                    </h2>
                    <p className="text-gray-700 mb-6 text-xs font-bold leading-relaxed">
                        Your account <span className="font-black text-black">({user.name} - {user.role})</span> is not authorized to access this specific module.
                        Requires <span className="text-[#4285F4] font-black">{allowedRoles.join(' / ')}</span> permissions.
                    </p>
                    <a
                        href="/admin"
                        className="inline-block px-6 py-3 bg-[#4285F4] text-white text-xs font-black uppercase rounded-2xl border-[2.5px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-all"
                    >
                        Back to Authorized Dashboard
                    </a>
                </motion.div>
            </div>
        );
    }

    return children;
};
