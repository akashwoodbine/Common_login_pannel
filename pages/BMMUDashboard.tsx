
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { DashboardLayout } from './DashboardLayout';
// import { UsersIcon } from '../components/Icons';

// export const BMMUDashboard: React.FC = () => {
//   const { user } = useAuth();

//   const welcomeContent = (
//      <p className="text-lg">
//       Welcome to the Block--level dashboard, <span className="font-semibold">{user?.name} ({user?.id})</span>.
//     </p>
//   );

//   return (
//     <DashboardLayout title="BMMU Dashboard" welcomeContent={welcomeContent}>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md border">
//           <h3 className="font-semibold text-lg">Reports</h3>
//           <p className="text-gray-600 mt-2">View and generate block-level reports.</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md border">
//           <h3 className="font-semibold text-lg">Analytics</h3>
//           <p className="text-gray-600 mt-2">Analyze performance data for your block.</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md border">
//           <h3 className="font-semibold text-lg">Settings</h3>
//           <p className="text-gray-600 mt-2">Configure your dashboard settings.</p>
//         </div>
//         <Link to="/dashboard/bmmu/beneficiaries" className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
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
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';
import { Dashboard } from '../components/Dashboard';
import { TmsIcon, EnterpriseSakhiIcon, LakhpatiSakhiIcon, UsersIcon } from '../components/Icons';
import HeaderLangDate from '@/components/HeaderLangDate';

export const BMMUDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { icon: <TmsIcon />, label: 'TMS', href: '/tms' },
    { icon: <EnterpriseSakhiIcon />, label: 'Enterprise Sakhi', href: '/enterprise' },
    { icon: <LakhpatiSakhiIcon />, label: 'Lakhpati Sakhi', href: '/lakhpati' },
  ];

  const welcomeContent = (
    <p>
      Welcome to the Block--level dashboard,{' '}
      <span className="font-semibold">
        {user?.name} ({user?.id})
      </span>
      .
    </p>
  );

  const dashboardItems = [
    {
      title: 'Reports',
      description: 'View and generate block-level reports.',
    },
    {
      title: 'Analytics',
      description: 'Analyze performance data for your block.',
    },
    {
      title: 'Settings',
      description: 'Configure your dashboard settings.',
    },
    {
      title: 'Beneficiary Details',
      description: 'View and manage beneficiary information.',
      icon: <UsersIcon />,
      to: '/dashboard/bmmu/beneficiaries',
    },
  ];

  return (
    <><HeaderLangDate /><div className="flex">
      <Sidebar
        title="Dashboard"
        userType={user?.type}
        navItems={navItems}
        onLogout={logout} />

      <main className="flex-1 ml-64 p-6">
        <Dashboard
          title="BMMU Dashboard"
          welcomeContent={welcomeContent}
          items={dashboardItems}
          colors={{
            titleColor: '#6770d2', // Heading color
            iconColor: '#6770d2', // Icon color (matches heading)
            descriptionColor: '#4b5563', // Keep description default gray
            cardHoverShadowColor: '#6770d2', // Card hover shadow color
          }} />
      </main>
    </div></>
  );
};
