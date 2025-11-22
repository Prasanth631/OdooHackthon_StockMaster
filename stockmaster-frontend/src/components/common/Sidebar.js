import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  LayoutDashboard, Package, ClipboardList, Truck, ArrowRightLeft,
  ClipboardCheck, History, Settings, User, LogOut, X
} from 'lucide-react';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/products', icon: Package, label: 'Products' },
  { path: '/receipts', icon: ClipboardList, label: 'Receipts' },
  { path: '/deliveries', icon: Truck, label: 'Deliveries' },
  { path: '/transfers', icon: ArrowRightLeft, label: 'Transfers' },
  { path: '/adjustments', icon: ClipboardCheck, label: 'Adjustments' },
  { path: '/history', icon: History, label: 'Move History' },
  { path: '/settings', icon: Settings, label: 'Settings' }
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-30 h-full w-64 bg-gray-900 text-white
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-0
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-blue-400">StockMaster</h1>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center px-4 py-3 rounded-lg transition-colors
                ${isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
              `}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User section */}
        <div className="border-t border-gray-800 p-4">
          <NavLink
            to="/profile"
            onClick={onClose}
            className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <User size={20} className="mr-3" />
            {user?.name || 'Profile'}
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;