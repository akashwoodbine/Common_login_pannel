// import React from 'react';
// import { TmsIcon, EnterpriseSakhiIcon, LakhpatiSakhiIcon, LogoutIcon } from './Icons';

// type NavItem = {
//   icon: React.ReactNode;
//   label: string;
//   href?: string;
// };

// type SidebarProps = {
//   title?: string;
//   userType?: string;
//   navItems: NavItem[];
//   onLogout: () => void;
// };

// export const Sidebar: React.FC<SidebarProps> = ({
//   title = 'Dashboard',
//   userType,
//   navItems,
//   onLogout,
// }) => {
//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to log out?')) {
//       onLogout();
//     }
//   };

//   return (
//     <div
//       className="w-64 bg-white flex flex-col h-screen fixed"
//       style={{
//         borderRight: '0px solid #6770d2',
//         boxShadow: '2px 0 1px rgba(103, 112, 210, 0.4)', // subtle right shadow with color #6770d2
//       }}
//     >
//       <div className="p-4 border-b" style={{ borderColor: '#6770d2' }}>
//         <h1
//           className="text-2xl font-bold"
//           style={{
//             color: '#6770d2',
//             textShadow: '1px 1px 2px rgba(103, 112, 210, 0.4)', // subtle shadow for lifted look
//           }}
//         >
//           {title}
//         </h1>
//         {userType && (
//           <p className="text-sm mt-1" style={{ color: '#6770d2' }}>
//             {userType}
//           </p>
//         )}
//       </div>
//       <nav className="flex-grow p-4">
//         <ul>
//           {navItems.map((item, index) => (
//             <li key={index} className="mb-2">
//               <a
//                 href={item.href || '#'}
//                 className="flex items-center p-3 rounded-lg transition-colors duration-300 ease-in-out"
//                 style={{ color: '#6770d2' }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = '#6770d2';
//                   e.currentTarget.style.color = '#ffffff'; // text white on hover
//                   e.currentTarget.style.transform = 'scale(1.05)'; // slight scale up
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = 'transparent';
//                   e.currentTarget.style.color = '#6770d2';
//                   e.currentTarget.style.transform = 'scale(1)';
//                 }}
//               >
//                 {item.icon}
//                 <span className="ml-4 font-medium">{item.label}</span>
//               </a>
//             </li>
//           ))}
//         </ul>
//       </nav>
//       <div className="p-4 border-t" style={{ borderColor: '#6770d2' }}>
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center p-3 rounded-lg transition-colors duration-300 ease-in-out"
//           style={{ color: '#d55353' }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.backgroundColor = '#d55353';
//             e.currentTarget.style.color = '#ffffff'; // text white on hover
//             e.currentTarget.style.transform = 'scale(1.05)'; // slight scale up
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.backgroundColor = 'transparent';
//             e.currentTarget.style.color = '#d55353';
//             e.currentTarget.style.transform = 'scale(1)';
//           }}
//         >
//           <LogoutIcon />
//           <span className="ml-4 font-medium">Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };


import React from 'react';
import { LogoutIcon } from './Icons'; // adjust your icons imports
// import other icons as needed

type NavItem = {
  icon: React.ReactNode;
  label: string;
  href?: string;
};

type SidebarProps = {
  title?: string;
  userType?: string;
  navItems?: NavItem[]; // make it optional to prevent map error
  onLogout: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
  title = 'Dashboard',
  userType,
  navItems = [], // default empty array
  onLogout,
}) => {
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      onLogout();
    }
  };

  return (
    <div
      className="w-64 bg-white flex flex-col h-screen fixed"
      style={{
        borderRight: '0px solid #6770d2',
        boxShadow: '2px 0 1px rgba(103, 112, 210, 0.4)',
      }}
    >
      <div className="p-4 border-b" style={{ borderColor: '#6770d2' }}>
        <h1
          className="text-2xl font-bold"
          style={{
            color: '#6770d2',
            textShadow: '1px 1px 2px rgba(103, 112, 210, 0.4)',
          }}
        >
          {title}
        </h1>
        {userType && (
          <p className="text-sm mt-1" style={{ color: '#6770d2' }}>
            {userType}
          </p>
        )}
      </div>

      <nav className="flex-grow p-4">
        <ul>
          {navItems.map((item, index) => (
            <li key={index} className="mb-2">
              <a
                href={item.href || '#'}
                className="flex items-center p-3 rounded-lg transition-colors duration-300 ease-in-out"
                style={{ color: '#6770d2' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6770d2';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#6770d2';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {item.icon}
                <span className="ml-4 font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t" style={{ borderColor: '#6770d2' }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-3 rounded-lg transition-colors duration-300 ease-in-out"
          style={{ color: '#d55353' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#d55353';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#d55353';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <LogoutIcon />
          <span className="ml-4 font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
