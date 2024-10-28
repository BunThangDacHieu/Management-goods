import React, {useState, useEffect} from "react";
import {getAllProducts, getAllCategories, getAllSuppliers, getAllUsers, getAllWarehouses} from '../api/auth'
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";

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
            <Row className="">
                
            </Row>
        </Container>
    </div>
  )
}
