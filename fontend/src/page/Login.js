import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Card, Navbar } from 'react-bootstrap';
import { SystemLogin} from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle, FaLinkedin } from 'react-icons/fa';
import '../css/Login.css';

const Login = () => {
  const { setToken, setUserRole, userId, updateToken  } = useContext(AuthContext); // Lấy setUserRole từ context
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
    setLoading(true);
    try {
      const response = await SystemLogin(formData);
      const { token } = response.data;
      if (!token) throw new Error('No token received');
      
      localStorage.setItem('token', token);
      updateToken(token);
      
      const role = JSON.parse(atob(token.split('.')[1])).role;
      const userId = JSON.parse(atob(token.split('.')[1])).id;
  
      navigate(role === 'Manager' ? '/manager-dashboard' : `/list-order/${userId}`);
    } catch (err) {
      setError('Đăng nhập không thành công. Vui lòng thử lại.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
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
                              <a href="forgot-password">Quên mật khẩu?</a>
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
