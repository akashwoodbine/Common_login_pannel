import React from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from './DashboardLayout';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const welcomeContent = (
    <p className="text-lg">Welcome, <span className="font-semibold">{user?.name} ({user?.id})</span>!</p>
  );

  return (
    <DashboardLayout title="Admin Dashboard" welcomeContent={welcomeContent}>
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        <p className="text-gray-600">
          Here you can view, edit, or reset passwords for any BMMU, DMMU, or SMMU users.
        </p>
        <div className="mt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Manage Users</button>
        </div>
      </div>
    </DashboardLayout>
  );
};
