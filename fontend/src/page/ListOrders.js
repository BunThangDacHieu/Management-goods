import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Row, Col,Modal, Navbar, Table, Button,Spinner, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { getAllOrders } from '../api/auth'; // Cập nhật hàm gọi API
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router';

export default function ListOrder() {
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState([]); // Sửa thành orders
  const [loading, setLoading] = useState(true);
  const { token, userId } = useContext(AuthContext);
  
  const [filteredOrders, setFilteredOrders] = useState([]); // Sửa thành filteredOrders
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [entryStatusFilter, setEntryStatusFilter] = useState('');
  const navigate = useNavigate();
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders(token); // Giả sử `getAllOrders` là API lấy tất cả các orders
        const ordersData = Array.isArray(response.data) ? response.data : [];
  
        const filteredOrders = ordersData.filter(
          order => order.createdBy === userId || order.user?._id === userId
        );
  
        setOrders(filteredOrders); // Cập nhật danh sách orders đã lọc
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
  
    if (userId) { // Chỉ gọi API khi userId đã có giá trị
      fetchOrders();
    }
  }, [token, userId]);
  
  
  
  const handleFilter = useCallback(() => {
    const filtered = orders.filter(order => {
      const matchesSearch = order.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.purchaseOrderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.user && order.user.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter ? order.status === statusFilter : true;
      const matchesEntryStatus = entryStatusFilter ? order.entryStatus === entryStatusFilter : true;
      return matchesSearch && matchesStatus && matchesEntryStatus;
    });
    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, entryStatusFilter, orders]);


  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    handleFilter();
  };

  const handleEntryStatusFilterChange = (entryStatus) => {
    setEntryStatusFilter(entryStatus);
    handleFilter();
  };
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  
  return (
    <>
      <Navbar bg="light" expand="lg" style={{ margin: "12px" }}>
        <Container fluid>
          <div className="ms-auto">
            <Button variant="success"
            onClick={() => navigate('/create-order')}>
              <IoMdAddCircleOutline/>Tạo đơn nhập hàng
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
              onClick={() => setActiveTab('Đang giao dịch')} 
              className={`mx-1 ${activeTab === 'Đang giao dịch' ? 'border-bottom border-primary' : ''}`}
            >
              Đang giao dịch
            </Button>
            <Button 
              variant="light" 
              onClick={() => setActiveTab('Hoàn thành')} 
              className={`mx-1 ${activeTab === 'Hoàn thành' ? 'border-bottom border-primary' : ''}`}
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
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </InputGroup>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            <Dropdown className="mx-1">
              <Dropdown.Toggle variant="light">Trạng thái</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleStatusFilterChange('Đang giao dịch')}>Đang giao dịch</Dropdown.Item>
                <Dropdown.Item onClick={() => handleStatusFilterChange('Hoàn thành')}>Hoàn thành</Dropdown.Item>
                <Dropdown.Item onClick={() => handleStatusFilterChange('')}>Tất cả</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="light">Trạng thái nhập</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleEntryStatusFilterChange('Chưa nhập')}>Chưa nhập</Dropdown.Item>
                <Dropdown.Item onClick={() => handleEntryStatusFilterChange('Đã nhập')}>Đã nhập</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary" onClick={handleFilter}>Lọc</Button>
          </Col>
        </Row>


        <Row className="mb-3">
          {/* Bảng và các nút lọc */}
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
                    <td colSpan="9" className="text-center">Không có đơn hàng nào</td>
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
