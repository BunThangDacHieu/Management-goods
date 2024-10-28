import React, {useState} from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FaEnvelope } from 'react-icons/fa';
import { AiFillLeftSquare } from "react-icons/ai";
import {forgotPassword} from '../api/auth'

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('')
        try {
            const response = await forgotPassword(email);
            setMessage(response.data.message)
        } catch (error) {
             setError(error.response ? error.response.data.message : 'Có lỗi xảy ra. Vui lòng thử lại.');
        } finally{
            setLoading(false);
        }
    }
    
  return (
    <Container className="min-vh-100 d-flex flex-row align-items-center">
    <Row >
        <Col md={8} className="h-100 d-flex justify-content-center">
        
            <Card className="p-4 shadow w-75">
            <a href='/login' className=''style={{ width: '2rem', height: '2rem'}}>
                <AiFillLeftSquare style={{ fontSize: '2rem' }} />
            </a>
                <h2 className="text-center mb-4">Quên Mật Khẩu</h2>
                {message && <p className="text-success text-center">{message}</p>}
                {error && <p className="text-danger text-center">{error}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label><FaEnvelope /> Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mt-3"
                        disabled={loading}
                    >
                        {loading ? 'Đang gửi...' : 'Gửi Yêu Cầu Đặt Lại Mật Khẩu'}
                    </Button>
                </Form>
            </Card>
        </Col>
        <Col md={4}>
                <img
                      src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg"
                      className="img-fluid"
                      alt="Sample"
                  />
        </Col>
    </Row>
    </Container>
  )
}
