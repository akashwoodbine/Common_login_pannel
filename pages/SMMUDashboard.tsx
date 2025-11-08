import React from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from './DashboardLayout';

export const SMMUDashboard: React.FC = () => {
  const { user } = useAuth();

  const welcomeContent = (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg">
          Welcome to the State dashboard for theme{' '}
          <span className="font-semibold">
            {user?.name} ({user?.id})
          </span>.
        </p>
      </div>
    </>
  );

  return (
    <DashboardLayout title="SMMU Dashboard" welcomeContent={welcomeContent}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="font-semibold text-lg">State-wide Analytics</h3>
          <p className="text-gray-600 mt-2">
            View analytics for the entire state.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="font-semibold text-lg">Theme Performance</h3>
          <p className="text-gray-600 mt-2">
            Track performance metrics related to your theme.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="font-semibold text-lg">Policy Management</h3>
          <p className="text-gray-600 mt-2">
            Manage and review state-level policies.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};
