import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from './DashboardLayout';
import { UsersIcon } from '../components/Icons';

export const DMMUDashboard: React.FC = () => {
  const { user } = useAuth();

  const welcomeContent = (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome to DMMU Dashboard
        </h2>
      </div>

      {user && user.type === 'DMMU' && (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4 border">
          <p className="text-lg">You are logged in for the following area:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
            <div>
              <p className="text-sm text-gray-500">District</p>
              <p className="font-semibold text-lg">{user.districtName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Block</p>
              <p className="font-semibold text-lg">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Block ID</p>
              <p className="font-mono text-lg">{user.id}</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 pt-2 border-t border-gray-200 mt-4">
            Last login: {new Date().toLocaleString()} (Placeholder)
          </p>
        </div>
      )}
    </>
  );

  return (
    <DashboardLayout title="DMMU Dashboard" welcomeContent={welcomeContent}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="font-semibold text-lg">District Overview</h3>
          <p className="text-gray-600 mt-2">
            High-level statistics for your district.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="font-semibold text-lg">Block Management</h3>
          <p className="text-gray-600 mt-2">
            Monitor and manage blocks within the district.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="font-semibold text-lg">Resource Allocation</h3>
          <p className="text-gray-600 mt-2">
            Manage resource distribution across blocks.
          </p>
        </div>

        <Link
          to="/dashboard/dmmu/beneficiaries"
          className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <UsersIcon className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="font-semibold text-lg">Beneficiary Details</h3>
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
