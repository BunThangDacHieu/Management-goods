import React, { useState, useEffect, useContext } from "react";
import { getAllProducts, getAllCategories, getAllSuppliers, getAllUsers, getAllWarehouses } from '../api/auth';
import { Container, Row, Col, Navbar, Card } from "react-bootstrap";
import ProductsSection from '../components/ProductSection';
import CategorySection from "../components/CategorySection";
import { AuthContext } from "../context/AuthContext";
export default function AdminDashboard() {
    const { token, userRole } = useContext(AuthContext); // Lấy token và userRole từ context
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [users, setUsers] = useState([]);

    // Lấy dữ liệu từ API khi component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userRole === 'Manager') { // Kiểm tra vai trò
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
                } else {
                    console.error('Chỉ có người dùng có vai trò Manager mới có thể truy cập thông tin này.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [token, userRole]);

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
                    <Col md={8}>
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
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <CategorySection token={token}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* Products Section */}
                <Row className="mb-4">
                    <Col>
                        <Card className="mb-4" style={{ border: "1px solid #ddd", borderRadius: "8px" }}>
                            <Card.Body>
                                <ProductsSection token={token} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
