// src/page/UserManagement.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: '', username: '', email: '', password: '' });

  useEffect(() => {
    // Giả lập việc lấy dữ liệu từ API
    setUsers([
      { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1' },
      { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2' },
    ]);
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddUser = () => {
    setCurrentUser({ id: '', username: '', email: '', password: '' });
    handleShow();
  };

  const handleEditUser = (user) => {
    setCurrentUser({...user, password: ''});  // Không hiển thị mật khẩu cũ
    handleShow();
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleSaveUser = () => {
    if (currentUser.id) {
      setUsers(users.map(user => {
        if (user.id === currentUser.id) {
          return {...currentUser, password: currentUser.password || user.password};
        }
        return user;
      }));
    } else {
      setUsers([...users, { ...currentUser, id: Date.now() }]);
    }
    handleClose();
  };

  return (
    <div className="container mt-4">
      <h1>User Management</h1>
      <Button variant="primary" onClick={handleAddUser} className="mb-3">
        Add New User
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleEditUser(user)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentUser.id ? 'Edit User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                value={currentUser.username} 
                onChange={(e) => setCurrentUser({...currentUser, username: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value={currentUser.email} 
                onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{currentUser.id ? 'New Password (leave blank to keep current)' : 'Password'}</Form.Label>
              <Form.Control 
                type="password" 
                value={currentUser.password} 
                onChange={(e) => setCurrentUser({...currentUser, password: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserManagement;