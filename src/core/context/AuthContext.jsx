import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser as firebaseLogout } from '../../fbconnect/services';

const AuthContext = createContext();

export const ROLES = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    EVENTS_TEAM: 'EVENTS_TEAM'
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Get credentials securely from environment variables
    const SUPERADMIN_EMAIL = import.meta.env.VITE_SUPERADMIN_EMAIL || '';
    const SUPERADMIN_PASSWORD = import.meta.env.VITE_SUPERADMIN_PASSWORD || '';
    const EVENTSTEAM_EMAIL = import.meta.env.VITE_EVENTSTEAM_EMAIL || '';
    const EVENTSTEAM_PASSWORD = import.meta.env.VITE_EVENTSTEAM_PASSWORD || '';

    useEffect(() => {
        // Restore session on page load
        const storedUser = localStorage.getItem('gdg_admin_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error('Failed to restore auth session:', err);
                localStorage.removeItem('gdg_admin_user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const cleanEmail = email.trim().toLowerCase();

        // 1. Authenticate with Firebase first
        const fbResult = await loginUser(cleanEmail, password);
        
        if (!fbResult.success) {
            console.error("Firebase Auth Error:", fbResult.error);
            return { 
                success: false, 
                error: fbResult.error === 'Firebase: Error (auth/invalid-credential).' 
                    ? 'Invalid credentials. Make sure this user is added in Firebase Authentication.' 
                    : fbResult.error 
            };
        }
        
        const superAdminEmail = SUPERADMIN_EMAIL.toLowerCase();
        const eventsTeamEmail = EVENTSTEAM_EMAIL.toLowerCase();

        const superAdminEmails = [superAdminEmail, 'gdg.cit.super@gmail.com', 'superadmin@gdgcit.com'];
        const eventsTeamEmails = [eventsTeamEmail, 'gdg.cit.admin@gmail.com', 'events@gdgcit.com'];

        const isSuper = superAdminEmails.includes(cleanEmail);
        const isEvents = eventsTeamEmails.includes(cleanEmail);

        if (!isSuper && !isEvents) {
            await firebaseLogout();
            return { success: false, error: "Unauthorized email address. You do not have permission to access the admin portal." };
        }

        let role = isSuper ? ROLES.SUPER_ADMIN : ROLES.EVENTS_TEAM;

        const userData = {
            email: cleanEmail,
            name: role === ROLES.SUPER_ADMIN ? 'Super Admin / Head' : 'Events Team Lead',
            role: role,
            loggedInAt: new Date().toISOString(),
            uid: fbResult.user.uid
        };

        setUser(userData);
        localStorage.setItem('gdg_admin_user', JSON.stringify(userData));
        return { success: true, user: userData };
    };

    const logout = async () => {
        await firebaseLogout();
        setUser(null);
        localStorage.removeItem('gdg_admin_user');
    };

    const isSuperAdmin = user?.role === ROLES.SUPER_ADMIN;
    const isEventsTeam = user?.role === ROLES.EVENTS_TEAM;

    const value = {
        user,
        loading,
        login,
        logout,
        isSuperAdmin,
        isEventsTeam,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
