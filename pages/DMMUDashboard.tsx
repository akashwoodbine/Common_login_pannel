
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { DashboardLayout } from './DashboardLayout';
// import { UsersIcon } from '../components/Icons';

// export const DMMUDashboard: React.FC = () => {
//   const { user } = useAuth();

//   const welcomeContent = (
//     <>
//       {user && user.type === 'DMMU' && (
//         <div className="bg-white p-6 rounded-lg shadow-md space-y-4 border">
//           <p className="text-lg">
//             Welcome, you are logged in for the following area:
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
//             <div>
//               <p className="text-sm text-gray-500">District</p>
//               <p className="font-semibold text-lg">{user.districtName}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Block</p>
//               <p className="font-semibold text-lg">{user.name}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Block ID</p>
//               <p className="font-mono text-lg">{user.id}</p>
//             </div>
//           </div>
//           <p className="text-xs text-gray-400 pt-2 border-t border-gray-200 mt-4">
//             Last login: {new Date().toLocaleString()} (Placeholder)
//           </p>
//         </div>
//       )}
//     </>
//   );

//   return (
//     <DashboardLayout title="DMMU Dashboard" welcomeContent={welcomeContent}>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md border">
//           <h3 className="font-semibold text-lg">District Overview</h3>
//           <p className="text-gray-600 mt-2">High-level statistics for your district.</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md border">
//           <h3 className="font-semibold text-lg">Block Management</h3>
//           <p className="text-gray-600 mt-2">Monitor and manage blocks within the district.</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md border">
//           <h3 className="font-semibold text-lg">Resource Allocation</h3>
//           <p className="text-gray-600 mt-2">Manage resource distribution across blocks.</p>
//         </div>
//          <Link to="/dashboard/dmmu/beneficiaries" className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
//           <div className="flex items-center space-x-4">
//             <UsersIcon className="w-8 h-8 text-blue-500" />
//             <div>
//               <h3 className="font-semibold text-lg">Beneficiary Details</h3>
//               <p className="text-gray-600 mt-2">View and manage beneficiary information.</p>
//             </div>
//           </div>
//         </Link>
//       </div>
//     </DashboardLayout>
//   );
// };


import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';
import { UsersIcon } from '../components/Icons';
import HeaderLangDate from '@/components/HeaderLangDate';

// Define your DMMU sidebar navigation items
const navItems = [
  { icon: <UsersIcon />, label: 'Beneficiaries', href: '/dashboard/dmmu/beneficiaries' },
  // Add other nav items for DMMU here as needed
];

export const DMMUDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { user } = useAuth();
  const primaryColor = '#6770d2';

  const welcomeContent = (
    <>
      {/* ...existing welcomeContent JSX */}
    </>
  );

  return (
    <><HeaderLangDate /><div className="flex">
      {/* Sidebar */}
      <Sidebar
        title="DMMU Dashboard"
        userType={user?.type || ''}
        navItems={navItems}
        onLogout={onLogout} />

      {/* Main content area with margin to the left for sidebar */}
      <main className="flex-grow ml-64 p-6 max-w-screen-xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
            DMMU Dashboard
          </h1>
          {welcomeContent && <div className="text-lg">{welcomeContent}</div>}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            className="bg-white p-6 rounded-lg shadow-md border"
            style={{
              borderColor: primaryColor,
              boxShadow: `0 1px 3px 0 ${primaryColor}55`,
            }}
          >
            <h3 className="font-semibold text-lg" style={{ color: primaryColor }}>
              District Overview
            </h3>
            <p className="mt-2 text-gray-600">
              High-level statistics for your district.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white p-6 rounded-lg shadow-md border"
            style={{
              borderColor: primaryColor,
              boxShadow: `0 1px 3px 0 ${primaryColor}55`,
            }}
          >
            <h3 className="font-semibold text-lg" style={{ color: primaryColor }}>
              Block Management
            </h3>
            <p className="mt-2 text-gray-600">
              Monitor and manage blocks within the district.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white p-6 rounded-lg shadow-md border"
            style={{
              borderColor: primaryColor,
              boxShadow: `0 1px 3px 0 ${primaryColor}55`,
            }}
          >
            <h3 className="font-semibold text-lg" style={{ color: primaryColor }}>
              Resource Allocation
            </h3>
            <p className="mt-2 text-gray-600">
              Manage resource distribution across blocks.
            </p>
          </div>

          {/* Beneficiary Details Link Card */}
          <Link
            to="/dashboard/dmmu/beneficiaries"
            className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow"
            style={{
              borderColor: primaryColor,
              boxShadow: `0 1px 3px 0 ${primaryColor}55`,
            }}
          >
            <div className="flex items-center space-x-4">
              <UsersIcon className="w-8 h-8" style={{ color: primaryColor }} />
              <div>
                <h3 className="font-semibold text-lg" style={{ color: primaryColor }}>
                  Beneficiary Details
                </h3>
                <p className="mt-2 text-gray-600">
                  View and manage beneficiary information.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div></>
  );
};
