// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './page/Home';
import Login from './page/Login';
import UserManagement from './page/UserManagement'; // Import UserManagement
import ProductManagement from './page/ProductManagemet';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/products" element={<ProductManagement />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;