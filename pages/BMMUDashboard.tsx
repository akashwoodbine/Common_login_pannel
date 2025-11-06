
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from './DashboardLayout';
import { UsersIcon } from '../components/Icons';

export const BMMUDashboard: React.FC = () => {
  const { user } = useAuth();

  const welcomeContent = (
     <p className="text-lg">
      Welcome to the Block--level dashboard, <span className="font-semibold">{user?.name} ({user?.id})</span>.
    </p>
  );

  return (
    <DashboardLayout title="BMMU Dashboard" welcomeContent={welcomeContent}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="font-semibold text-lg">Reports</h3>
          <p className="text-gray-600 mt-2">View and generate block-level reports.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="font-semibold text-lg">Analytics</h3>
          <p className="text-gray-600 mt-2">Analyze performance data for your block.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="font-semibold text-lg">Settings</h3>
          <p className="text-gray-600 mt-2">Configure your dashboard settings.</p>
        </div>
        <Link to="/dashboard/bmmu/beneficiaries" className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <UsersIcon className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="font-semibold text-lg">Beneficiary Details</h3>
              <p className="text-gray-600 mt-2">View and manage beneficiary information.</p>
            </div>
          </div>
        </Link>
      </div>
    </DashboardLayout>
  );
};
