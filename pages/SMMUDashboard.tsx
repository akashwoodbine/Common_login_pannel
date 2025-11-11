// import React from 'react';
// import { useAuth } from '../context/AuthContext';
// import { Dashboard } from '../components/Dashboard';
// import { ChartBarIcon, ArrowTrendingUpIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

// export const SMMUDashboard: React.FC = () => {
//   const { user } = useAuth();

//   const welcomeContent = (
//     <p className="text-lg">
//       Welcome to the State dashboard for theme{' '}
//       <span className="font-semibold">
//         {user?.name} ({user?.id})
//       </span>.
//     </p>
//   );

//   const dashboardItems = [
//     {
//       title: 'State-wide Analytics',
//       description: 'View analytics for the entire state.',
//       icon: <ChartBarIcon className="w-8 h-8" />,
//       to: '/analytics', // optional route if needed
//     },
//     {
//       title: 'Theme Performance',
//       description: 'Track performance metrics related to your theme.',
//       icon: <ArrowTrendingUpIcon className="w-8 h-8" />,
//       to: '/performance',
//     },
//     {
//       title: 'Policy Management',
//       description: 'Manage and review state-level policies.',
//       icon: <DocumentTextIcon className="w-8 h-8" />,
//       to: '/policies',
//     },
//   ];

//   const themeColors = {
//     titleColor: '#6770d2',
//     iconColor: '#6770d2',
//     descriptionColor: '#4b5563',
//     cardHoverShadowColor: '#6770d240',
//   };

//   return (
//     <Dashboard
//       title="SMMU Dashboard"
//       welcomeContent={welcomeContent}
//       items={dashboardItems}
//       colors={themeColors}
//     />
//   );
// };

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Dashboard } from '../components/Dashboard';
import { Sidebar } from '../components/Sidebar';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import {
  TmsIcon,
  EnterpriseSakhiIcon,
  LakhpatiSakhiIcon,
  LogoutIcon,
} from '../components/Icons';
import { useNavigate } from 'react-router-dom';
import HeaderLangDate from '@/components/HeaderLangDate';
import { LogoListScreen } from '@/components/SubHeader';

export const SMMUDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // --- Sidebar navigation items ---
  const navItems = [
    {
      icon: <TmsIcon />,
      label: 'Dashboard Home',
      href: '/dashboard/smmu',
    },
    {
      icon: <EnterpriseSakhiIcon />,
      label: 'Enterprise Sakhi',
      href: '/enterprise-sakhi',
    },
    {
      icon: <LakhpatiSakhiIcon />,
      label: 'Lakhpati Sakhi',
      href: '/lakhpati-sakhi',
    },
  ];

  // --- Sidebar logout handler ---
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // --- Dashboard content ---
  const welcomeContent = (
    <p className="text-lg">
      Welcome to the State dashboard for theme{' '}
      <span className="font-semibold">
        {user?.name} ({user?.id})
      </span>.
    </p>
  );

  const dashboardItems = [
    {
      title: 'State-wide Analytics',
      description: 'View analytics for the entire state.',
      icon: <ChartBarIcon className="w-8 h-8" />,
      to: '/analytics',
    },
    {
      title: 'Theme Performance',
      description: 'Track performance metrics related to your theme.',
      icon: <ArrowTrendingUpIcon className="w-8 h-8" />,
      to: '/performance',
    },
    {
      title: 'Policy Management',
      description: 'Manage and review state-level policies.',
      icon: <DocumentTextIcon className="w-8 h-8" />,
      to: '/policies',
    },
  ];

  const themeColors = {
    titleColor: '#6770d2',
    iconColor: '#6770d2',
    descriptionColor: '#4b5563',
    cardHoverShadowColor: '#6770d240',
  };

  return (
    <><HeaderLangDate />

    <div className="flex h-screen bg-gray-50">
      {/* --- Sidebar --- */}
      <Sidebar
        title="SMMU"
        userType="State Mission Management Unit"
        navItems={navItems}
        onLogout={handleLogout} />

      {/* --- Main Dashboard content --- */}
      <main className="flex-1 ml-64 overflow-y-auto p-6">
        <Dashboard
          title="SMMU Dashboard"
          welcomeContent={welcomeContent}
          items={dashboardItems}
          colors={themeColors} />
      </main>
    </div></>
  );
};
