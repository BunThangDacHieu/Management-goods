// page/Login.js
import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Card, Navbar } from 'react-bootstrap';
import { managerLogin, commonLogin } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle, FaLinkedin } from 'react-icons/fa';
import '../css/Login.css'; // Tạo file CSS để định nghĩa các kiểu cần thiết

const Login = () => {
  const { setToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isManager, setIsManager] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await commonLogin({ email, password });
      const token = response.data.token;

      // Lưu token vào localStorage
      localStorage.setItem('token', token);
      setToken(token);

      // Xác định role người dùng từ token (giả sử token có chứa thông tin vai trò)
      const role = JSON.parse(atob(token.split('.')[1])).role; // Giả sử token là JWT và chứa thông tin role
      // Tiến hành điều hướng hoặc xử lý tiếp theo dựa trên role
      console.log('User role:', role);

      // Điều hướng đến trang khác dựa trên vai trò
      // if (role === 'manager') {
      //   // Điều hướng đến trang manager
      // } else {
      //   // Điều hướng đến trang người dùng
      // }
    } catch (err) {
      setError('Đăng nhập không thành công. Vui lòng thử lại.');
      console.error('Login error:', err);
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
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label><FaLock /> Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-between mb-4">
                <Form.Check type="checkbox" label="Nhớ mật khẩu" />
                <a href="#!">Quên mật khẩu?</a>
              </div>
              <Button variant="primary" type="submit" className="w-100 mt-3">
                Đăng Nhập
              </Button>
              <p className="small fw-bold mt-2 pt-1 mb-2 text-center">
                Chưa có tài khoản? <a href="/register" className="link-danger">Đăng ký</a>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* Footer */}
      <footer className="bg-primary text-white py-3">
        <Container fluid>
          <div className="d-flex justify-content-between">
            <div>Copyright © 2020. Tất cả quyền được bảo lưu.</div>
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
