import React from 'react';
import { Container, Row, Col, Nav, Navbar, Table } from 'react-bootstrap';

export default function ListProduct() {
  return (
    <>
      <Navbar bg="light" expand="lg" style={{margin: "12px"}}>
        <Container fluid>
          <Navbar.Brand>Danh sách sản phẩm</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>Vay vốn kinh doanh</Nav.Link>
              <Nav.Link>Trợ giúp</Nav.Link>
              <Nav.Link>Góp ý</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col>
            <h1>Danh sách sản phẩm</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Mã đơn nhập</th>
                  <th>Mã đơn đặt</th>
                  <th>Ngày nhập</th>
                  <th>Trạng thái</th>
                  <th>Trạng thái nhập</th>
                  <th>Chi nhánh nhập</th>
                  <th>Nhà cung cấp</th>
                  <th>Nhân viên tạo</th>
                  <th>Giá trị đơn</th>
                </tr>
              </thead>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
