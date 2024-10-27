// page/Register.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Navbar } from 'react-bootstrap';
import { registerEmployee, registerSupplier } from '../api/auth';
import { FaUser, FaLock, FaFacebookF, FaTwitter,FaPhoneAlt, FaGoogle,FaAddressBook , FaLinkedin  } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { AiFillRightCircle } from "react-icons/ai";
import {useNavigate} from 'react-router-dom'
import '../css/Login.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (role === 'employee') {
        response = await registerEmployee({ name, email, password, confirmPassword });
      } else if (role === 'supplier') {
        response = await registerSupplier({ name, address, contactEmail: email, password, confirmPassword, contactPhone });
      }

      if (response && response.status === 200) {
        setSuccess('Đăng ký thành công! Bạn có thể đăng nhập.');
        setError('');
      }
      setTimeout(() => {
        navigate('/login'); // Điều hướng đến trang đăng nhập
      }, 2000);
    } catch (err) {
      setError('Đăng ký không thành công. Vui lòng thử lại.');
      console.error('Register error:', err);
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
              <Form.Group controlId="formName">
                <Form.Label><FaUser /> Tên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              
              <Form.Group controlId="formEmail">
                <Form.Label><MdOutlineAlternateEmail /> Email</Form.Label>
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

              <Form.Group controlId="formConfirmPassword">
                <Form.Label><FaLock /> Xác nhận mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              

              {/* Conditional fields for 'supplier' role */}
              {role === 'supplier' && (
                <>
                  <Form.Group controlId="formAddress">
                    <Form.Label><FaAddressBook /> Địa chỉ</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập địa chỉ"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formContactPhone">
                    <Form.Label><FaPhoneAlt /> Số điện thoại liên hệ</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập số điện thoại"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      required
                    />
                  </Form.Group>
                </>
              )}
              <Form.Group controlId="formRole">
                <Form.Label><AiFillRightCircle />
                Vai trò</Form.Label>
                <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="employee">Nhân viên</option>
                  <option value="supplier">Nhà cung cấp</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Đăng Ký
              </Button>
              <p className="small fw-bold mt-2 pt-1 mb-2 text-center">
                Đã có tài khoản? <a href="/login" className="link-danger">Đăng nhập</a>
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

export default Register;
