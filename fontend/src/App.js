// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate  } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Homepage from './page/Homepage';
import ListProduct from './page/ListProduct';
import Register from './page/Register';
import Login from './page/Login'; 

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
          <Route path="/register" element={<Register />} />
          {/* Bọc tất cả các route còn lại trong Layout */}
          <Route element={<Layout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}>
            <Route path="/" element={<Homepage isSidebarOpen={isSidebarOpen} />} />
            <Route path="/product-list" element={<ListProduct />} />
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
