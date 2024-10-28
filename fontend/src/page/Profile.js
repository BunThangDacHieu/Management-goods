import React, { useContext, useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { getUserById } from '../api/auth';
import { useParams } from 'react-router-dom';

export default function Profile() {
    const { id } = useParams(); // Lấy ID từ URL
    const {token } = useContext(AuthContext);
    const [user, setUser] = useState(null);
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

        if (id && token) fetchUserProfile(); // Chỉ gọi khi `id` và `token` có giá trị
    }, [id, token]);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div className="text-danger">{error}</div>;

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h2 className="text-center mb-4">Hồ Sơ Tài Khoản</h2>
                            <div className="mb-3">
                                <strong>Tên:</strong> {user.name}
                            </div>
                            <div className="mb-3">
                                <strong>Email:</strong> {user.email}
                            </div>
                            <div className="mb-3">
                                <strong>Vai trò:</strong> {user.role}
                            </div>
                            <div className="mb-3">
                                <strong>Nhà cung cấp:</strong> {user.supplier || 'Chưa có nhà cung cấp'}
                            </div>
                            <div className="text-center">
                                <Button variant="primary" onClick={() => alert('Chỉnh sửa hồ sơ')}>Chỉnh sửa</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
