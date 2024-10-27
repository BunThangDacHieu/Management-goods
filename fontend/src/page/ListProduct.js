import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Nav, Navbar, Table, Button, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { getAllProducts } from '../api/auth';

export default function ListProduct() {
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State để lưu từ khóa tìm kiếm
  const [statusFilter, setStatusFilter] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts(token);
        setProducts(response.data); 
        setFilteredProducts(response.data); // Cập nhật danh sách sản phẩm đã lọc
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [token]);

  const handleFilter = () => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter ? product.status === statusFilter : true; // Lọc theo trạng thái nếu có

      return matchesSearch && matchesStatus; // Trả về sản phẩm phù hợp với điều kiện tìm kiếm và trạng thái
    });
    setFilteredProducts(filtered);
  };

   // Gọi hàm lọc mỗi khi searchTerm hoặc statusFilter thay đổi
   useEffect(() => {
    handleFilter();
  }, [searchTerm, statusFilter, products]);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(products);
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
        <Row className="mb-3">
          <Col className="d-flex justify-content-start">
            <Button 
              variant="light" 
              onClick={() => setActiveTab('all')} 
              className={`mx-1 ${activeTab === 'all' ? 'border-bottom border-primary' : ''}`}
            >
              Tất cả đơn hàng
            </Button>
            <Button 
              variant="light" 
              onClick={() => setActiveTab('in-progress')} 
              className={`mx-1 ${activeTab === 'in-progress' ? 'border-bottom border-primary' : ''}`}
            >
              Đang giao dịch
            </Button>
            <Button 
              variant="light" 
              onClick={() => setActiveTab('completed')} 
              className={`mx-1 ${activeTab === 'completed' ? 'border-bottom border-primary' : ''}`}
            >
              Hoàn Thành
            </Button>
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Col md={6}>
            <InputGroup>
              <Form.Control 
                placeholder="Tìm mã đơn hàng, đơn đặt hàng, tên, SĐT" 
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              />
            </InputGroup>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            {/* Trạng thái, Ngày tạo, Sản phẩm Dropdowns */}
            <Dropdown className="mx-1">
              <Dropdown.Toggle variant="light">Trạng thái</Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item onClick={() => setStatusFilter('in-progress')}>Đang giao dịch</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter('completed')}>Hoàn thành</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter('')}>Tất cả</Dropdown.Item>
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
            <Button variant="primary" className="mx-1" onClick={handleFilter}>Lọc</Button>
          </Col>
        </Row>

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
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
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
