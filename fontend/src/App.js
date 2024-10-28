// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate  } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Homepage from './page/Homepage';
import Register from './page/Register';
import Login from './page/Login'; 
import Profile from './page/Profile';
import AdminDashboard from './page/AdminDashboard';
import ListOrder from './page/ListOrders';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function Bao() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate(); 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AuthProvider navigate={navigate}>
      
      
        <Routes>
          {/* Route cho trang đăng nhập */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} /> 
          <Route path="/register" element={<Register />} />
          {/* Bọc tất cả các route còn lại trong Layout */}
          <Route element={<Layout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}>
            <Route path="/" element={<Homepage isSidebarOpen={isSidebarOpen} />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/list-order/:userId" element={<ListOrder />} />
            <Route path="/manager-dashboard" element={<AdminDashboard />} />
            {/* Các route khác */}
          </Route>
        </Routes>
       
      
      </AuthProvider>
    
  );
}

function App() {
  return (
    <Router>
      <Bao />
    </Router>
  );
}

export default App;
