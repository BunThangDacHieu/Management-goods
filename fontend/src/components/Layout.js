// components/Layout.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { Container, Row, Col } from 'react-bootstrap';

const Layout = ({ isSidebarOpen, toggleSidebar }) => {
  const { token } = useContext(AuthContext);

  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="p-0">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </Col>
        <Col xs={isSidebarOpen ? 10 : 12} className="p-0 d-flex flex-column">
          <Header isOpen={isSidebarOpen} />
          <div className="main-content p-4" style={{ overflowY: 'auto', height: 'calc(100vh - 60px)' }}>
            <Outlet /> {/* Nội dung sẽ được render ở đây */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
