import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Settings, 
  ShoppingCart, 
  LogIn,
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const menuItems = [
    { 
      icon: Home, 
      text: 'Trang chủ', 
      path: '/',
    },
    { 
      icon: ShoppingCart, 
      text: 'Danh sách sản phẩm', 
      path: '/' 
    },
    { 
      icon: Users, 
      text: 'Danh sách người dùng', 
      path: '/user-list' 
    },
    { 
      icon: Settings, 
      text: 'Cài đặt', 
      path: '/user-settings' 
    },
    { 
      icon: LogIn, 
      text: 'Đăng nhập', 
      path: '/login' 
    }
  ];

  return (
    <div className={`
      h-screen
      bg-gray-900
      text-white
      ${isExpanded ? 'w-64' : 'w-20'}
      transition-all duration-300
      relative
    `}>
      {/* Header */}
      <div className={`
        flex items-center
        ${isExpanded ? 'justify-between' : 'justify-center'}
        p-4 h-16 border-b border-gray-800
      `}>
        {isExpanded && (
          <h2 className="text-xl font-bold text-white">Admin Panel</h2>
        )}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
        >
          {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>

      {/* Navigation */}
      <Nav className="flex-column mt-4">
        {menuItems.map((item, index) => (
          <Nav.Item key={index} className="w-full">
            <Link
              to={item.path}
              className={`
                flex items-center
                ${isExpanded ? 'px-4' : 'justify-center px-2'}
                py-3
                text-gray-300
                hover:bg-gray-800
                transition-colors
                group relative
                ${location.pathname === item.path ? 'bg-gray-800 text-white' : ''}
              `}
            >
              <item.icon size={20} />
              {isExpanded ? (
                <span className="ml-3">{item.text}</span>
              ) : (
                <div className="
                  absolute left-full rounded-md px-2 py-1 ml-6
                  bg-gray-900 text-sm
                  invisible opacity-20 -translate-x-3 transition-all
                  group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                  z-50
                ">
                  {item.text}
                </div>
              )}
            </Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed top-4 left-4
          p-2
          bg-gray-900 
          text-white 
          rounded-lg
          lg:hidden
          ${isOpen ? 'hidden' : 'block'}
        `}
      >
        <Menu size={24} />
      </button>
    </div>
  );
};

export default Sidebar;