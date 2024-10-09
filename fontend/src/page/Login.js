import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/Login.css'

export default function Login() {
  return (
    <div>
    
    <div className="login-container">
      
      <Form className="login-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Usename</Form.Label>
          <Form.Control type="Usename" placeholder="Enter Usename" />
        
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remeber" />
        </Form.Group>
        <Button variant="primary" type="Login">
          Login
        </Button>
      </Form>
    </div>
    </div>
  );
  
}
  