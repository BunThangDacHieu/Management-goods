import React, { useState, useEffect, useContext  } from 'react';
import { Container, Row, Col, Nav, Navbar, Table, Button, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import {getAllProducts} from '../api/auth'

export default function ListProduct() {
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState([]); // State để lưu danh sách sản phẩm
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải
  const { token } = useContext(AuthContext);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts(token);
        setProducts(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }
  return (
    <>
      <Navbar bg="light" expand="lg" style={{ margin: "12px" }}>
        <Container fluid>
          <Navbar.Brand style={{ fontSize: '20px', fontFamily: 'Oswald', fontStyle: 'Bold' }}>Danh sách sản phẩm</Navbar.Brand>
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
        {/* Navigation Buttons */}
        <Row className="mb-3">
          <Col className="d-flex justify-content-start">
            <Button 
              variant="light" 
              onClick={() => handleTabChange('all')} 
              className={`mx-1 ${activeTab === 'all' ? 'border-bottom border-primary' : ''}`}
            >
              Tất cả đơn hàng
            </Button>
            <Button 
              variant="light" 
              onClick={() => handleTabChange('in-progress')} 
              className={`mx-1 ${activeTab === 'in-progress' ? 'border-bottom border-primary' : ''}`}
            >
              Đang giao dịch
            </Button>
            <Button 
              variant="light" 
              onClick={() => handleTabChange('completed')} 
              className={`mx-1 ${activeTab === 'completed' ? 'border-bottom border-primary' : ''}`}
            >
              Hoàn Thành
            </Button>
          </Col>
        </Row>

        {/* Search and Filter Row */}
        <Row className="mb-3 align-items-center">
          <Col md={6}>
            <InputGroup>
              <Form.Control 
                placeholder="Tìm mã đơn hàng, đơn đặt hàng, tên, SĐT" 
                aria-label="Search"
              />
            </InputGroup>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            <Dropdown className="mx-1">
              <Dropdown.Toggle variant="light">Trạng thái</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Đang giao dịch</Dropdown.Item>
                <Dropdown.Item href="#">Hoàn thành</Dropdown.Item>
                <Dropdown.Item href="#">Hủy</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mx-1">
              <Dropdown.Toggle variant="light">Ngày tạo</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Hôm nay</Dropdown.Item>
                <Dropdown.Item href="#">Tuần này</Dropdown.Item>
                <Dropdown.Item href="#">Tháng này</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mx-1">
              <Dropdown.Toggle variant="light">Sản phẩm</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Sản phẩm A</Dropdown.Item>
                <Dropdown.Item href="#">Sản phẩm B</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mx-1">
              <Dropdown.Toggle variant="light">Bộ lọc khác</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Lọc 1</Dropdown.Item>
                <Dropdown.Item href="#">Lọc 2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary" className="mx-1">Lưu bộ lọc</Button>
          </Col>
        </Row>

        {/* Product List Table */}
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Nhà cung cấp</th>
                  <th>Kho hàng</th>
                  <th>Mô tả</th>
                  <th>Mã SKU</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>{product.supplier ? product.supplier.name : 'N/A'}</td>
                      <td>{product.warehouse ? product.warehouse.name : 'N/A'}</td>
                      <td>{product.description}</td>
                      <td>{product.sku}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">Không có sản phẩm nào</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
