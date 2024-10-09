import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/ResponsiveSidebar';
import Homepage from './page/Homepage';
import Login from './page/Login';
import Error from './page/Error';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Container fluid className="p-0">
        <Row className="g-0">
          <Col xs="auto">
            <Sidebar />
          </Col>
          <Col className="p-3 flex-grow-1" style={{backgroundColor: 'green'}}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Error />} />
              {/* Thêm các routes khác tại đây */}
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;