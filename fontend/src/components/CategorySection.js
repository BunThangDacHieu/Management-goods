import React, { useState, useEffect, useContext } from "react";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../api/auth";
import { Container, Row, Col, Button, Modal, Form, Table } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export default function CategorySection({ token }) {  // Nhận token từ props
    const { userRole } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    // Lấy danh sách tất cả danh mục khi component mount hoặc khi token thay đổi
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories(token); // Gọi API với token
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, [token]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreateCategory = async () => {
        try {
            const response = await createCategory(formData, token);
            setCategories([...categories, response.data]);
            setShowModal(false);
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            description: category.description
        });
        setShowModal(true);
    };

    const handleUpdateCategory = async () => {
        try {
            const response = await updateCategory(editingCategory._id, formData, token);
            setCategories(categories.map((cat) => (cat._id === response.data._id ? response.data : cat)));
            setShowModal(false);
            setEditingCategory(null);
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategory(id, token);
            setCategories(categories.filter((category) => category._id !== id));
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <h4>Danh mục</h4>
                </Col>
                <Col className="text-end">
                    <Button onClick={() => setShowModal(true)}>Thêm danh mục</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover className="table-bordered-custom">
                        <thead>
                            <tr>
                                <th>Tên danh mục</th>
                                <th>Mô tả</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category._id}>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleEditCategory(category)} size="sm">
                                            Chỉnh sửa
                                        </Button>{' '}
                                        <Button variant="danger" onClick={() => handleDeleteCategory(category._id)} size="sm">
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
                    <Modal.Title>{editingCategory ? "Cập nhật danh mục" : "Thêm danh mục"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Tên danh mục</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Hủy
                    </Button>
                    <Button
                        variant="primary"
                        onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}
                    >
                        {editingCategory ? "Cập nhật" : "Thêm mới"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
