// page/Login.js
import React, { useState, useContext } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { managerLogin } from '../api/auth';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { setToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await managerLogin({ email, password });
      const token = response.data.token;
      setToken(token);
      localStorage.setItem('token', token);
    } catch (err) {
      setError('Đăng nhập không thành công. Vui lòng thử lại.');
      console.error('Login error:', err);
    }
  };

  return (
    <>

      <Card className="p-4 shadow d-flex justify-content-center vh-align-items-center 100" style={{ width: '400px' }}>
        <h2 className="text-center">Đăng Nhập</h2>
        <Form onSubmit={handleLogin}>
          {error && <p className="text-danger text-center">{error}</p>}
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Đăng Nhập
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default Login;
