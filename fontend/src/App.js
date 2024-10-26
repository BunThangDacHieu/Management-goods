// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Homepage from './page/Homepage';
import ListProduct from './page/ListProduct';
import Login from './page/Login'; // 
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRouter'; 

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AuthProvider>
      <Router>
        <Container fluid>
          <Row>
            <Col xs={2} className="p-0">
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </Col>

            <Col xs={isSidebarOpen ? 10 : 12} className="p-0 d-flex flex-column">
              <Header isOpen={isSidebarOpen} />
              <div className="main-content p-4" style={{ overflowY: 'auto', height: 'calc(100vh - 60px)' }}>
                <Routes>
                  <Route path="/" element={<Homepage isSidebarOpen={isSidebarOpen} />} />
                  <Route path="/login" element={<Login />} />
                  <Route exact path="/product-list" element={
                    <PrivateRoute>
                      <ListProduct />
                    </PrivateRoute>} />
                    
                   {/* Bảo vệ route này */}
                  {/* Các route khác */}
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
