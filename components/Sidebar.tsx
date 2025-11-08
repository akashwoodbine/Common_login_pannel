import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TmsIcon, EnterpriseSakhiIcon, LakhpatiSakhiIcon, LogoutIcon } from './Icons';
import { ChangePasswordModal } from '@/components/ChangePasswordModal'; // ✅ import modal

export const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    { icon: <TmsIcon />, label: 'TMS' },
    { icon: <EnterpriseSakhiIcon />, label: 'Enterprise Sakhi' },
    { icon: <LakhpatiSakhiIcon />, label: 'Lakhpati Sakhi' },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  const handlePasswordChangeSuccess = () => {
    alert('✅ Password changed successfully!');
    setIsModalOpen(false);
  };

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col h-screen fixed border-r">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
        {user && <p className="text-sm text-gray-500 mt-1">{user.type}</p>}
      </div>

      <nav className="flex-grow p-4">
        <ul>
          {navItems.map((item, index) => (
            <li key={index} className="mb-2">
              <a
                href="#"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {item.icon}
                <span className="ml-4 font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t space-y-2">
        {/* ✅ Change Password Button added above Logout */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-center p-3 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors font-medium"
        >
          Change Password
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center p-3 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
        >
          <LogoutIcon />
          <span className="ml-4 font-medium">Logout</span>
        </button>
      </div>

      {/* ✅ Password Change Modal */}
      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handlePasswordChangeSuccess}
      />
    </div>
  );
};
