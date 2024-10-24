// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/ResponsiveSidebar';
import Homepage from './page/Homepage';
import Login from './page/Login';
import Error from './page/Error';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListProduct from './page/ListProduct';
// Import other necessary pages

function App() {
  return (
    <Router>
      <Container fluid>
        <Row className="g-0">
          <Col xs="auto">
            <Sidebar />
          </Col>
          <Col className="p-3" style={{ backgroundColor: 'green' }}>
            <Routes>
              <Route path="/" element={<ListProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user-list" />
              <Route path="/user-settings" />
              {/* Add other routes corresponding to sub-items */}
              <Route path="*" element={<Error />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
