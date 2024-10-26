// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
<<<<<<< HEAD
import { Container, Row, Col } from 'react-bootstrap'; // Import từ Bootstrap
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Homepage from './page/Homepage';
import ListProduct from './page/ListProduct';

=======
=======
>>>>>>> 2596c5d98409f39113ca879c7765d199e421f9d4
import Header from './components/Header';
import Home from './page/Home';
import Login from './page/Login';
import UserManagement from './page/UserManagement'; // Import UserManagement
import ProductManagement from './page/ProductManagemet';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
>>>>>>> 2596c5d98409f39113ca879c7765d199e421f9d4
=======
>>>>>>> 2596c5d98409f39113ca879c7765d199e421f9d4

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Router>
<<<<<<< HEAD
<<<<<<< HEAD
      <Container fluid>
        <Row>
          {/* Sidebar ở phía bên trái */}
          <Col xs={2} className="p-0">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          </Col>

          {/* Phần Header phía trên Home */}
          <Col xs={isSidebarOpen ? 10 : 12}  className="p-0 d-flex flex-column">
            <Header isOpen={isSidebarOpen} />
            <div className="main-content p-4" style={{ overflowY: 'auto', height: 'calc(100vh - 60px)' }}>
              <Routes>
                <Route path="/" element={<Homepage  isSidebarOpen={isSidebarOpen}  />} />
                <Route path="/product-list" element={<ListProduct />} />
                {/* <Route path="/user-settings" element={<UserSettings />} />
                <Route path="/permissions" element={<Permissions />} /> */}
              </Routes>
            </div>
          </Col>
        </Row>
      </Container>
=======
=======
>>>>>>> 2596c5d98409f39113ca879c7765d199e421f9d4
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/products" element={<ProductManagement />} /> {/* Add this line */}
      </Routes>
<<<<<<< HEAD
>>>>>>> 2596c5d98409f39113ca879c7765d199e421f9d4
=======
>>>>>>> 2596c5d98409f39113ca879c7765d199e421f9d4
    </Router>
  );
}

export default App;