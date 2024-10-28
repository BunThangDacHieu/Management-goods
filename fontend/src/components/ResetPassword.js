import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios'; // Import axios
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        console.log('ResetPassword component mounted');
        console.log('Token from URL:', token);
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        if (newPassword !== confirmPassword) {
            setError('Mật khẩu không khớp!');
            setLoading(false);
            return;
        }

        try {
            console.log('Đang gửi yêu cầu reset password...');
            const response = await axios.patch(`/api/reset-password/${token}`, {
                password: newPassword,
            });
            setMessage(response.data.message);
            // Chuyển hướng về trang đăng nhập sau khi thành công
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.error('Reset password error:', error);
            setError(
                error.response?.data?.message || 
                'Có lỗi xảy ra. Vui lòng thử lại.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card className="p-4 shadow" style={{ width: '400px' }}>
                <h2 className="text-center">Đặt lại mật khẩu</h2>
                {error && <p className="text-danger text-center">{error}</p>}
                {message && <p className="text-success text-center">{message}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formNewPassword">
                        <Form.Label>Mật khẩu mới</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Label>Xác nhận mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </Form.Group>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        className="w-100 mt-3" 
                        disabled={loading}
                    >
                        {loading ? 'Đang đặt lại...' : 'Đặt lại mật khẩu'}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}
