import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Card, Navbar } from 'react-bootstrap';
import { commonLogin } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle, FaLinkedin } from 'react-icons/fa';
import '../css/Login.css';

const Login = () => {
  const { setToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Đặt loading là true khi bắt đầu
    try {
      const response = await commonLogin(formData); // Sử dụng formData cho email và password
      const token = response.data.token;

      localStorage.setItem('token', token);
      setToken(token);

      const role = JSON.parse(atob(token.split('.')[1])).role; // Giả sử token là JWT và chứa thông tin role
      console.log('User role:', role);

      // Điều hướng đến trang khác dựa trên vai trò
      navigate(role === 'Manager' ? '/manager-dashboard' : '/product-list');
    } catch (err) {
      setError('Đăng nhập không thành công. Vui lòng thử lại.');
      console.error('Login error:', err);
    } finally {
      setLoading(false); // Đặt loading lại thành false khi hoàn tất
    }
  };

  return (
    <Container fluid className="p-0 min-vh-100 d-flex flex-column">
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">LogisTech</Navbar.Brand>
        </Container>
      </Navbar>

      <Row className="flex-fill d-flex align-items-center justify-content-center">
        <Col md={6}>
          <img
            src="https://www.dropoff.com/wp-content/webp-express/webp-images/uploads/2022/05/What-Is-Manufacturing-Logistics-and-What-Does-It-Involve-01-1536x900.jpg.webp"
            className="img-fluid"
            alt="Sample"
          />
        </Col>
        <Col md={6}>
          <Card className="p-4 shadow">
            <h2 className="text-center">Đăng Nhập</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formEmail">
                <Form.Label><FaUser /> Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Nhập email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label><FaLock /> Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-between mb-4">
                <Form.Check type="checkbox" label="Nhớ mật khẩu" />
                <a href="#!">Quên mật khẩu?</a>
              </div>
              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 mt-3"
                disabled={loading}
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
              </Button>
              <p className="small fw-bold mt-2 pt-1 mb-2 text-center">
                Chưa có tài khoản? <a href="/register" className="link-danger">Đăng ký</a>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>

      <footer className="bg-primary text-white py-3">
        <Container fluid>
          <div className="d-flex justify-content-between">
            <div>LogisTech © 2024. Tất cả quyền được bảo lưu.</div>
            <div>
              <a href="#!" className="text-white mx-3"><FaFacebookF /></a>
              <a href="#!" className="text-white mx-3"><FaTwitter /></a>
              <a href="#!" className="text-white mx-3"><FaGoogle /></a>
              <a href="#!" className="text-white mx-3"><FaLinkedin /></a>
            </div>
          </div>
        </Container>
      </footer>
    </Container>
  );
};

export default Login;
