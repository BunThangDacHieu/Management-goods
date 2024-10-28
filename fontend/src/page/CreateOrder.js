import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button, InputGroup, Form, Card } from 'react-bootstrap';
import { AiFillCaretLeft } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";

const CreateOrder = () => {
  const [supplierSearch, setSupplierSearch] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Sample supplier data
  const suppliers = [
    { id: 1, name: 'Thut' },
    { id: 2, name: 'Công Ty Sapo', phone: '08566435576' },
    { id: 3, name: 'Eazy Miller', phone: '1663726458' },
  ];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          !inputRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle input focus
  const handleInputFocus = () => {
    setIsDropdownVisible(true);
  };

  // Handle input change
  const handleSearchChange = (e) => {
    setSupplierSearch(e.target.value);
    setIsDropdownVisible(true);
  };

  // Handle supplier selection
  const handleSupplierSelect = (supplier) => {
    setSupplierSearch(supplier.name);
    setIsDropdownVisible(false);
  };

  // Handle add new supplier
  const handleAddSupplier = () => {
    console.log('Add new supplier');
    setIsDropdownVisible(false);
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Button variant="link" className="text-primary" onClick={() => navigate('/list-order/${userId}')}>
            <AiFillCaretLeft />
            Quay lại danh sách nhập hàng
          </Button>
          <div className="d-flex gap-2">
            <Button variant="outline-secondary">Thoát</Button>
            <Button variant="outline-secondary">Tạo & chưa nhập</Button>
            <Button variant="primary">Tạo & nhập hàng</Button>
          </div>
        </div>

        <div className="row g-4">
          {/* Supplier Information */}
          <Card className="col-md-6">
            <Card.Header>
              <Card.Title className="h5">Thông tin nhà cung cấp</Card.Title>
            </Card.Header>
            <Card.Body>
              <InputGroup className="mb-3">
              
                <Form.Control
                  ref={inputRef}
                  type="text"
                  placeholder="Tìm theo tên, SĐT, mã nhà cung cấp... (F4)"
                  value={supplierSearch}
                  onChange={handleSearchChange}
                  onFocus={handleInputFocus}
                />
              </InputGroup>
              {/* Supplier List */}
              {isDropdownVisible && (
                <div 
                  ref={dropdownRef} 
                  className="mt-2 border border-gray-200 rounded bg-white shadow-lg"
                >
                  <Button variant="link" className="text-primary" onClick={handleAddSupplier}>
                <IoIosAdd className="h-4 w-4" /> Thêm mới nhà cung cấp
              </Button>
                  <div className="max-h-60 overflow-y-auto">
                    {suppliers
                      .filter(supplier => supplier.name.toLowerCase().includes(supplierSearch.toLowerCase()))
                      .map(supplier => (
                      <div
                        key={supplier.id}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleSupplierSelect(supplier)}
                      >
                        <div className="font-medium">{supplier.name}</div>
                        {supplier.phone && (
                          <div className="text-sm text-gray-500">{supplier.phone}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Order Information */}
          <Card className="col-md-6">
            <Card.Header>
              <Card.Title className="h5">Thông tin đơn nhập hàng</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <Form.Label className="font-weight-bold">Nhà Kho</Form.Label>
                <Form.Select>
                  <option>Nhà kho mặc định</option>
                  {/* Add other branches as needed */}
                </Form.Select>
              </div>
              <div className="mb-3">
                <Form.Label className="font-weight-bold">Nhân viên</Form.Label>
                <Form.Select>
                  <option>Pham Lan</option>
                  {/* Add other employees as needed */}
                </Form.Select>
              </div>
              <div className="mb-3">
                <Form.Label className="font-weight-bold">Tham chiếu</Form.Label>
                <Form.Control type="text" placeholder="Nhập tham chiếu" />
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Products Table */}
        <div className="mt-4">
          <Card>
            <Card.Body>
              <InputGroup className="mb-4">
                <Form.Control 
                  type="text" 
                  placeholder="Tìm theo tên, mã SKU, hoặc quét mã Barcode... (F3)" 
                />
              </InputGroup>
              <table className="table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Mã Barcode</th>
                    <th>Đơn vị</th>
                    <th>SL nhập</th>
                    <th>Đơn giá</th>
                    <th>Chiết khấu</th>
                    <th>Thuế</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Product rows will go here */}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
