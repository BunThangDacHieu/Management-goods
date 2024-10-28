import React, { useState, useEffect } from "react";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../api/auth";
import { Container, Row, Col, Button, Modal, Form, Table } from "react-bootstrap";

export default function ProductsSection({ token }) {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        quantity: '',
        supplier: '',
        warehouse: '',
        description: '',
        sku: ''
    });

    // Lấy danh sách tất cả sản phẩm khi component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts(token);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [token]);

    // Xử lý thay đổi trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Thêm sản phẩm mới
    const handleCreateProduct = async () => {
        try {
            const response = await createProduct(formData, token);
            setProducts([...products, response.data]);
            setShowModal(false);
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    // Mở form cập nhật sản phẩm
    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            category: product.category._id,
            quantity: product.quantity,
            supplier: product.supplier._id,
            warehouse: product.warehouse._id,
            description: product.description,
            sku: product.sku
        });
        setShowModal(true);
    };

    // Cập nhật sản phẩm hiện có
    const handleUpdateProduct = async () => {
        try {
            const response = await updateProduct(editingProduct._id, formData, token);
            setProducts(products.map((prod) => (prod._id === response.data._id ? response.data : prod)));
            setShowModal(false);
            setEditingProduct(null);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    // Xóa sản phẩm
    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id, token);
            setProducts(products.filter((product) => product._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <h4>Sản phẩm</h4>
                    <Button onClick={() => setShowModal(true)}>Thêm sản phẩm</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                <Table striped bordered hover className="table-bordered-custom">
                        <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Danh mục</th>
                                <th>Số lượng</th>
                                <th>Nhà cung cấp</th>
                                <th>Kho</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.supplier.name}</td>
                                    <td>{product.warehouse.name}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleEditProduct(product)} size="sm">
                                            Chỉnh sửa
                                        </Button>{' '}
                                        <Button variant="danger" onClick={() => handleDeleteProduct(product._id)} size="sm">
                                            Xóa
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Giá</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Danh mục</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Số lượng</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nhà cung cấp</Form.Label>
                            <Form.Control
                                type="text"
                                name="supplier"
                                value={formData.supplier}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Kho</Form.Label>
                            <Form.Control
                                type="text"
                                name="warehouse"
                                value={formData.warehouse}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>SKU</Form.Label>
                            <Form.Control
                                type="text"
                                name="sku"
                                value={formData.sku}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Hủy
                    </Button>
                    <Button
                        variant="primary"
                        onClick={editingProduct ? handleUpdateProduct : handleCreateProduct}
                    >
                        {editingProduct ? "Cập nhật" : "Thêm mới"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
