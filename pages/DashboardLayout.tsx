import React from 'react';
import { Sidebar } from '../components/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  welcomeContent: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title, welcomeContent, children }) => {
  return (
    <div className="flex h-screen bg-white text-gray-900">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto flex flex-col">
        <div className="flex-grow">
          <header className="pb-4 border-b mb-6">
            <h1 className="text-4xl font-bold">{title}</h1>
            <div className="mt-2">{welcomeContent}</div>
          </header>
          {children}
        </div>
        <footer className="pt-4 border-t text-center text-sm text-gray-500 mt-8">
          <p>&copy; {new Date().getFullYear()} Multi-Level Login System. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};
