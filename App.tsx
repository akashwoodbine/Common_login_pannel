
import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { BMMUDashboard } from './pages/BMMUDashboard';
import { DMMUDashboard } from './pages/DMMUDashboard';
import { SMMUDashboard } from './pages/SMMUDashboard';
import { LoginType } from './types';
import { DistrictSelectionPage } from './pages/DistrictSelectionPage';
import { BeneficiaryDetailsPage } from './pages/BeneficiaryDetailsPage';

const ProtectedRoute: React.FC<{ allowedTypes: LoginType[] }> = ({ allowedTypes }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-xl font-semibold text-gray-700 animate-pulse">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/" replace />;
    }

    if (!allowedTypes.includes(user.type)) {
        // This case should ideally not happen if logic is correct, but as a fallback:
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/select-district" element={<DistrictSelectionPage />} />
            <Route path="/login/:type" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            <Route element={<ProtectedRoute allowedTypes={[LoginType.BMMU]} />}>
                <Route path="/dashboard/bmmu" element={<BMMUDashboard />} />
                <Route path="/dashboard/bmmu/beneficiaries" element={<BeneficiaryDetailsPage />} />
            </Route>
            <Route element={<ProtectedRoute allowedTypes={[LoginType.DMMU]} />}>
                <Route path="/dashboard/dmmu" element={<DMMUDashboard />} />
                 <Route path="/dashboard/dmmu/beneficiaries" element={<BeneficiaryDetailsPage />} />
            </Route>
            <Route element={<ProtectedRoute allowedTypes={[LoginType.SMMU]} />}>
                <Route path="/dashboard/smmu" element={<SMMUDashboard />} />
            </Route>
            <Route element={<ProtectedRoute allowedTypes={[LoginType.ADMIN]} />}>
                <Route path="/dashboard/state-it-manager" element={<AdminDashboard />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

const App: React.FC = () => {
    return (
        <HashRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </HashRouter>
    );
};

export default App;
