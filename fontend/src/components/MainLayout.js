// MainLayout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div>
        <Header isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
