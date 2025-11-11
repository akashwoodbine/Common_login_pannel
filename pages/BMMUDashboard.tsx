import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from './DashboardLayout';
import { UsersIcon } from '../components/Icons';

export const BMMUDashboard: React.FC = () => {
  const { user } = useAuth();

  const welcomeContent = (
    <div className="flex justify-between items-center mb-4">
      <p className="text-lg">
        Welcome to the Block-level dashboard,&nbsp;
        <span className="font-semibold">
          {user?.name} ({user?.id})
        </span>.
      </p>
    </div>
  );

  return (
    <DashboardLayout title="BMMU Dashboard" welcomeContent={welcomeContent}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Reports Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg text-gray-800">Reports</h3>
          <p className="text-gray-600 mt-2">
            View and generate block-level reports.
          </p>
        </div> 

        {/* Analytics Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg text-gray-800">Analytics</h3>
          <p className="text-gray-600 mt-2">
            Analyze performance data for your block.
          </p>
        </div>

        {/* Settings Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg text-gray-800">Settings</h3>
          <p className="text-gray-600 mt-2">
            Configure your dashboard settings.
          </p>
        </div>

        {/* Beneficiary Details Card */}
        <Link
          to="/dashboard/bmmu/beneficiaries"
          className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <UsersIcon className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Beneficiary Details
              </h3>
              <p className="text-gray-600 mt-2">
                View and manage beneficiary information.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </DashboardLayout>
  );
};

