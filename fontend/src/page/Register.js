// page/Register.js
import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Card, Navbar } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { registerEmployee, registerSupplier } from '../api/auth';
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle, FaLinkedin } from 'react-icons/fa';
import '../css/Login.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee'); // Default role là 'employee'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Trạng thái xử lý đăng ký

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu xử lý
    setError(''); // Đặt lại lỗi trước đó
    setSuccess(''); // Đặt lại thông báo thành công trước đó

    try {
      const trimmedEmail = email.trim(); // Xóa khoảng trắng
      const trimmedPassword = password.trim(); // Xóa khoảng trắng
      let response;

      if (role === 'employee') {
        response = await registerEmployee({ email: trimmedEmail, password: trimmedPassword });
      } else if (role === 'supplier') {
        response = await registerSupplier({ email: trimmedEmail, password: trimmedPassword });
      }

      if (response && response.status === 200) {
        setSuccess('Đăng ký thành công! Bạn có thể đăng nhập.');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Đăng ký không thành công. Vui lòng thử lại.';
      setError(message); // Hiển thị thông báo lỗi cụ thể từ API
      console.error('Register error:', err);
    } finally {
      setLoading(false); // Kết thúc xử lý
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
            <h2 className="text-center">Đăng Ký</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            {success && <p className="text-success text-center">{success}</p>}
            <Form onSubmit={handleRegister}>
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
              <Form.Group controlId="formRole">
                <Form.Label>Vai trò</Form.Label>
                <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="employee">Nhân viên</option>
                  <option value="supplier">Nhà cung cấp</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
                {loading ? 'Đang Đăng Ký...' : 'Đăng Ký'}
              </Button>
              <p className="small fw-bold mt-2 pt-1 mb-2 text-center">
                Đã có tài khoản? <a href="/login" className="link-danger">Đăng nhập</a>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* Footer */}
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

export default Register;
