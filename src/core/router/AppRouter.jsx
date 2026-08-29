/**
 * App Router - React Router configuration with lazy loading
 */
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ProtectedRoute } from '../../components/admin/ProtectedRoute';
import { ROLES } from '../context/AuthContext';

// Admin pages
const Login = lazy(() => import('../../pages/admin/Login'));
const AdminLayout = lazy(() => import('../../pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('../../pages/admin/AdminDashboard'));
const ManageEvents = lazy(() => import('../../pages/admin/ManageEvents'));
const ManageGallery = lazy(() => import('../../pages/admin/ManageGallery'));
const ManageTeam = lazy(() => import('../../pages/admin/ManageTeam'));
const ManageSiteInfo = lazy(() => import('../../pages/admin/ManageSiteInfo'));
const ManageContact = lazy(() => import('../../pages/admin/ManageContact'));

// Loading component
const PageLoader = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black font-sans">
        <div className="w-14 h-14 relative mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-gray-100 border-t-[#4285F4] border-r-[#EA4335] border-b-[#FBBC04] border-l-[#34A853] animate-spin"></div>
        </div>
        <span className="font-black text-sm uppercase tracking-widest text-black">GDG CIT ADMIN</span>
    </div>
);

export const AppRouter = () => {
    return (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {/* Redirect Root to Admin */}
                    <Route path="/" element={<Navigate to="/admin" replace />} />

                    {/* Admin Login Route */}
                    <Route path="/admin/login" element={<Login />} />

                    {/* Admin Dashboard Protected Routes */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.EVENTS_TEAM]}>
                                <AdminLayout />
                            </ProtectedRoute>
                        }
                    >
                        {/* Shared Admin Dashboard Home */}
                        <Route index element={<AdminDashboard />} />

                        {/* Events & Images Management (Super Admin & Events Team) */}
                        <Route
                            path="events"
                            element={
                                <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.EVENTS_TEAM]}>
                                    <ManageEvents />
                                </ProtectedRoute>
                            }
                        />

                        {/* Gallery Management (Super Admin & Events Team) */}
                        <Route
                            path="gallery"
                            element={
                                <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.EVENTS_TEAM]}>
                                    <ManageGallery />
                                </ProtectedRoute>
                            }
                        />

                        {/* Core Team Management (Super Admin Exclusive) */}
                        <Route
                            path="team"
                            element={
                                <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
                                    <ManageTeam />
                                </ProtectedRoute>
                            }
                        />

                        {/* Mission, Vision & Site Text (Super Admin Exclusive) */}
                        <Route
                            path="site-info"
                            element={
                                <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
                                    <ManageSiteInfo />
                                </ProtectedRoute>
                            }
                        />

                        {/* Contact Details & Socials (Super Admin Exclusive) */}
                        <Route
                            path="contact"
                            element={
                                <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
                                    <ManageContact />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

