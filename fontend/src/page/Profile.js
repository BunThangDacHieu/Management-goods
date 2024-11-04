import React, { useContext, useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { getUserById, getUserActivities, updateUser  } from '../api/auth';
import { useParams } from 'react-router-dom';

export default function Profile() {
    const { id } = useParams(); // Lấy ID từ URL
    const {token } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [activities, setActivities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchUserProfile = async () => {
            console.log('Fetching user with ID:', id);
            try {
                const response = await getUserById(id, token);
                setUser(response.data);
            } catch (err) {
                setError('Không thể lấy thông tin hồ sơ.');
            } finally {
                setLoading(false);
            }
        };
        const fetchUserActivities = async () => {
            try {
                const response = await getUserActivities(token);
                setActivities(response.data);
            } catch (err) {
                setError('Không thể tải lịch sử hoạt động.');
            }
        };

        if (id && token) {
            fetchUserProfile();
            fetchUserActivities();
        } // Chỉ gọi khi `id` và `token` có giá trị
    }, [id, token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await updateUser(id, formData, token);
            setUser(response.data); // Update user data with the new info
            setShowModal(false); // Close modal
        } catch (err) {
            setError('Cập nhật thông tin thất bại.');
        }
    };

    if (loading) return <div>Đang tải...</div>; 
    if (error) return <div className="text-danger">{error}</div>;
    console.log(id);
    
    return (
        <Container className="mt-4">
        <Row className="justify-content-center">
            <Col md={4}>
                <Card className="shadow-sm text-center">
                    <Card.Img variant="top" src={user?.profileImage || '/default-avatar.png'} className="rounded-circle mt-4" style={{ width: '150px', height: '150px' }} />
                    <Card.Body>
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                        <div className="mb-3">
                            <strong>Vai trò:</strong> {user.role}
                        </div>
                        <div className="mb-3">
                            <strong>Nhà cung cấp:</strong> {user.supplier || 'Chưa có nhà cung cấp'}
                        </div>
                        <Button variant="primary" onClick={() => setShowModal(true)}>Chỉnh sửa</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={8}>
                <Card className="shadow-sm">
                    <Card.Body>
                        <h2 className="text-center mb-4">Lịch Sử Hoạt Động</h2>
                        {activities.length > 0 ? (
                            <ul className="list-group">
                                {activities.map((activity, index) => (
                                    <li key={index} className="list-group-item">
                                        {activity.description} - {new Date(activity.date).toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center">Không có hoạt động nào.</div>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa hồ sơ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Tên</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mật khẩu (Để trống nếu không thay đổi)</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Nhập mật khẩu mới nếu cần"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
                    <Button variant="primary" onClick={handleUpdateProfile}>Lưu thay đổi</Button>
                </Modal.Footer>
            </Modal>
    </Container>
    );
}
