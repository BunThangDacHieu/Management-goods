import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col,Modal, Navbar, Table, Button, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { getAllOrders } from '../api/auth'; // Cập nhật hàm gọi API
import { IoMdAddCircleOutline } from "react-icons/io";

export default function ListOrder() {
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState([]); // Sửa thành orders
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const [filteredOrders, setFilteredOrders] = useState([]); // Sửa thành filteredOrders
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [showModal, setShowModal] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders(token); // Cập nhật gọi API
        const ordersData = Array.isArray(response.data) ? response.data : [];
        console.log("Fetched orders:", ordersData);
        setOrders(ordersData); 
        setFilteredOrders(ordersData); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  const handleFilter = () => {
    const filtered = orders.filter(order => {
      const matchesSearch = 
        order.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.purchaseOrderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.user && order.user.name.toLowerCase().includes(searchTerm.toLowerCase()));
        
      const matchesStatus = statusFilter ? order.status === statusFilter : true; 
  
      return matchesSearch && matchesStatus; 
    });
  
    setFilteredOrders(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [searchTerm, statusFilter, orders]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  
  return (
    <>
      <Navbar bg="light" expand="lg" style={{ margin: "12px" }}>
        <Container fluid>
          <div className="ms-auto">
            <Button variant="success" onClick={handleShowModal}>
              <IoMdAddCircleOutline/>Tạo đơn hàng
            </Button>
          </div>
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
                placeholder="Tìm mã đơn hàng, đơn đặt hàng, tên người dùng" 
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              />
            </InputGroup>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            <Dropdown className="mx-1">
              <Dropdown.Toggle variant="light">Trạng thái</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setStatusFilter('Đang giao dịch')}>Đang giao dịch</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter('Hoàn thành')}>Hoàn thành</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter('')}>Tất cả</Dropdown.Item>
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
                  <th>Mã đơn hàng</th>
                  <th>Mã đơn đặt hàng</th>
                  <th>Ngày nhập</th>
                  <th>Tên người dùng</th>
                  <th>Tổng giá</th>
                  <th>Trạng thái</th>
                  <th>Trạng thái nhập</th>
                  <th>Kho hàng</th>
                  <th>Nhà cung cấp</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.orderCode}</td>
                      <td>{order.purchaseOrderCode}</td>
                      <td>{new Date(order.importDate).toLocaleDateString()}</td>
                      <td>{order.user ? order.user.name : 'N/A'}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.status}</td>
                      <td>{order.entryStatus}</td>
                      <td>{order.warehouse ? order.warehouse.name : 'N/A'}</td>
                      <td>{order.supplier ? order.supplier.name : 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">Không có đơn hàng nào</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      {/* Modal for creating order */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo Đơn Hàng Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Nội dung modal để tạo đơn hàng */}
          <Form>
            <Form.Group controlId="formOrderCode">
              <Form.Label>Mã đơn hàng</Form.Label>
              <Form.Control type="text" placeholder="Nhập mã đơn hàng" />
            </Form.Group>
            <Form.Group controlId="formPurchaseOrderCode">
              <Form.Label>Mã đơn đặt hàng</Form.Label>
              <Form.Control type="text" placeholder="Nhập mã đơn đặt hàng" />
            </Form.Group>
            {/* Thêm các trường cần thiết khác cho đơn hàng ở đây */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => {
            // Xử lý tạo đơn hàng ở đây
            handleCloseModal();
          }}>
            Tạo Đơn Hàng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
