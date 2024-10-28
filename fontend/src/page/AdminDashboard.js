import React, {useState, useEffect} from "react";
import {getAllProducts, getAllCategories, getAllSuppliers, getAllUsers, getAllWarehouses} from '../api/auth'
import { Container, Row, Col, Nav, Navbar, Card, Table } from "react-bootstrap";
import ProductsSection from '../components/ProductSection'
export default function AdminDashboard({token}) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [users, setUsers] = useState([]);

     // Lấy dữ liệu từ API khi component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await getAllProducts(token);
        const categoriesResponse = await getAllCategories();
        const usersResponse = await getAllUsers(token);
        const warehousesResponse = await getAllWarehouses(token);
        const suppliersResponse = await getAllSuppliers(token);

        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setUsers(usersResponse.data);
        setWarehouses(warehousesResponse.data);
        setSuppliers(suppliersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="admin-dashboard">
        <Navbar bg="light" expand="lg" style={{ margin: "12px" }}>
        <Container fluid>
          <Navbar.Brand style={{ fontSize: '20px', fontFamily: 'Oswald', fontStyle: 'Bold' }}>Hệ thống quản lý</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
        </Navbar>
        <Container>
                <Row className="mb-4">
                    {/* Suppliers Section */}
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Nhà cung cấp</Card.Title>
                                <Card.Text>{suppliers.length} Nhà cung cấp</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Warehouses Section */}
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Kho hàng</Card.Title>
                                <Card.Text>{warehouses.length} kho hàng</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Users Section */}
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Người dùng</Card.Title>
                                <Card.Text>{users.length} người dùng</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Products Section */}
                <Row className="mb-4">
                    <Col>
                    <Card className="mb-4" style={{ border: "1px solid #ddd", borderRadius: "8px" }}>
                <Card.Body>
                        <ProductsSection token={token} />  {/* Thêm ProductsSection tại đây */}
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
    </div>
  )
}
