import React from 'react';
import { Container } from 'react-bootstrap';
import '../css/Homepage.css'

export default function Homepage({ isSidebarOpen }) {
  return (
    <Container fluid className={`homepage-content ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
      <h1>Trang chủ</h1>
      <p>Đây là nội dung trang chủ của bạn.</p>
    </Container>
  );
}
