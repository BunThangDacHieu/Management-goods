import React, { useState, useEffect } from "react";
import { getAllProducts, createProduct, updateProduct, deleteProduct, getAllCategories, getAllSuppliers, getAllWarehouses } from "../api/auth";
import { Container, Row, Col, Button, Modal, Form, Table } from "react-bootstrap";

export default function ProductsSection({ token }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
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
        sku: '',
        barcode: '' // Add barcode to form data
    });

    // Fetch data on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts(token);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories(token);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        const fetchSuppliers = async () => {
            try {
                const response = await getAllSuppliers(token);
                setSuppliers(response.data);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
        };
        const fetchWarehouses = async () => {
            try {
                const response = await getAllWarehouses(token);
                setWarehouses(response.data);
            } catch (error) {
                console.error("Error fetching warehouses:", error);
            }
        };
        
        fetchCategories();
        fetchSuppliers();
        fetchWarehouses();
        fetchProducts();
    }, [token]);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Create a new product
    const handleCreateProduct = async () => {
        const cleanFormData = {
            ...formData,
            category: formData.category || undefined,
            supplier: formData.supplier || undefined,
            warehouse: formData.warehouse || undefined,
        };
    
        try {
            const response = await createProduct(cleanFormData, token);
            setProducts([...products, response.data]);
            setShowModal(false);
            resetForm(); // Reset form after creating a product
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    // Edit an existing product
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
            sku: product.sku,
            barcode: product.barcode // Set barcode in the form
        });
        setShowModal(true);
    };

    // Update an existing product
    const handleUpdateProduct = async () => {
        const cleanFormData = {
            ...formData,
            category: formData.category || undefined,
            supplier: formData.supplier || undefined,
            warehouse: formData.warehouse || undefined,
        };
    
        try {
            const response = await updateProduct(editingProduct._id, cleanFormData, token);
            setProducts(products.map((prod) => (prod._id === response.data._id ? response.data : prod)));
            setShowModal(false);
            setEditingProduct(null);
            resetForm(); // Reset form after updating
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    // Delete a product
    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id, token);
            setProducts(products.filter((product) => product._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Reset form data
    const resetForm = () => {
        setFormData({
            name: '',
            price: '',
            category: '',
            quantity: '',
            supplier: '',
            warehouse: '',
            description: '',
            sku: '',
            barcode: '' // Reset barcode
        });
    };
    console.log("Products" + products)
    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <h4>Sản phẩm</h4>
                </Col>
                <Col className="text-end">
                    <Button onClick={() => { resetForm(); setShowModal(true); }}>Thêm sản phẩm</Button>
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
                                <th>SKU</th>
                                <th>Barcode</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category ? product.category.name : 'Chưa có'}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.supplier ? product.supplier.name : 'Chưa có'}</td>
                                    <td>{product.warehouse ? product.warehouse.name : 'Chưa có'}</td>
                                    <td>{product.sku}</td>
                                    <td>{product.barcode}</td>
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

            <Modal show={showModal} onHide={() => { setShowModal(false); resetForm(); }}>
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
                                as="select"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Chọn danh mục</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Control>
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
                                as="select"
                                name="supplier"
                                value={formData.supplier}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Chọn nhà cung cấp</option>
                                {suppliers.map((supplier) => (
                                    <option key={supplier._id} value={supplier._id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label>Kho</Form.Label>
                            <Form.Control
                                as="select"
                                name="warehouse"
                                value={formData.warehouse}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Chọn kho</option>
                                {warehouses.map((warehouse) => (
                                    <option key={warehouse._id} value={warehouse._id}>
                                        {warehouse.name}
                                    </option>
                                ))}
                            </Form.Control>
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

                        <Form.Group>
                            <Form.Label>Barcode</Form.Label>
                            <Form.Control
                                type="text"
                                name="barcode"
                                value={formData.barcode}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={editingProduct ? handleUpdateProduct : handleCreateProduct}>
                            {editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
