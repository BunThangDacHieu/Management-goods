import React, { useState, useRef, useEffect, useContext } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button, InputGroup, Form, Card } from 'react-bootstrap';
import { AiFillCaretLeft } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import { createOrder, getAllSuppliers, getAllWarehouses, getAllUsers } from '../api/auth'; // Import các hàm API của bạn
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const CreateOrder = () => {
  const { token } = useContext(AuthContext);
  const [supplierSearch, setSupplierSearch] = useState('');
  const [selectedSuppliers, setSelectedSuppliers] = useState([]); // Sử dụng mảng để lưu nhiều nhà cung cấp
  const [warehouses, setWarehouses] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [entryStatus, setEntryStatus] = useState('Chưa nhập');
  const [products, setProducts] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWarehouses = async () => {
      const response = await getAllWarehouses(token);
      setWarehouses(response.data);
    };

    const fetchEmployees = async () => {
      const response = await getAllUsers(token);
      setEmployees(response.data.filter(user => user.role === 'Employee'));
    };

    const fetchSuppliers = async () => {
      const response = await getAllSuppliers(token);
      setSuppliers(response.data);
    };

    fetchWarehouses();
    fetchEmployees();
    fetchSuppliers();
  }, [token]);

  const handleCreateOrder = async () => {
    const orderData = {
      user: 'user_id',
      products,
      shippingAddress: 'Địa chỉ giao hàng',
      warehouse: selectedWarehouse,
      suppliers: selectedSuppliers.map(supplier => supplier.id), // Cập nhật để lấy danh sách ID nhà cung cấp
      orderCode: 'Mã đơn hàng',
      purchaseOrderCode: 'Mã đơn nhập hàng',
    };

    try {
      await createOrder(orderData, token);
      navigate('/list-order');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleInputFocus = () => {
    setIsDropdownVisible(true);
  };

  const handleSearchChange = (e) => {
    setSupplierSearch(e.target.value);
    setIsDropdownVisible(true);
  };

  const handleSupplierSelect = (supplier) => {
    if (!selectedSuppliers.find(s => s.id === supplier.id)) { // Kiểm tra xem nhà cung cấp đã được chọn chưa
      setSelectedSuppliers([...selectedSuppliers, supplier]);
    }
    setSupplierSearch('');
    setIsDropdownVisible(false);
  };

  const handleRemoveSupplier = (supplierId) => {
    setSelectedSuppliers(selectedSuppliers.filter(supplier => supplier.id !== supplierId));
  };

  const handleAddSupplier = () => {
    console.log("Thêm nhà cung cấp mới");
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
            <Button variant="outline-secondary" onClick={() => navigate('//list-order/${userId}')}>Thoát</Button>
            <Button variant="outline-secondary" onClick={() => setEntryStatus('Chưa nhập')}>Tạo & chưa nhập</Button>
            <Button variant="primary" onClick={handleCreateOrder}>Tạo & nhập hàng</Button>
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
              {/* Selected Suppliers */}
              <div className="mt-3 d-flex flex-wrap gap-2">
                {selectedSuppliers.map(supplier => (
                  <div
                    key={supplier.id}
                    className="d-flex align-items-center bg-light border rounded-pill px-2 py-1"
                    style={{ 
                      width: 'auto', 
                      height: '30px', 
                      maxWidth: '100px', 
                      cursor: 'pointer', 
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      const tooltip = document.createElement('div');
                      tooltip.innerText = supplier.name;
                      tooltip.style.position = 'absolute';
                      tooltip.style.left = '100%';
                      tooltip.style.top = '50%';
                      tooltip.style.transform = 'translateY(-50%)';
                      tooltip.style.backgroundColor = 'white';
                      tooltip.style.border = '1px solid #ccc';
                      tooltip.style.borderRadius = '4px';
                      tooltip.style.padding = '5px';
                      tooltip.style.whiteSpace = 'nowrap';
                      e.currentTarget.appendChild(tooltip);
                      e.currentTarget.tooltip = tooltip; // Lưu tooltip để có thể xóa sau
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.removeChild(e.currentTarget.tooltip);
                    }}
                  >
                    <span>{supplier.name.length > 8 ? `${supplier.name.substring(0, 8)}...` : supplier.name}</span>
                    <Button variant="link" onClick={() => handleRemoveSupplier(supplier.id)} className="text-danger ms-1">
                      <span>X</span>
                    </Button>
                  </div>
                ))}
              </div>
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
                <Form.Select onChange={(e) => setSelectedWarehouse(e.target.value)}>
                  {warehouses.map(warehouse => (
                    <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                  ))}
                </Form.Select>
              </div>
              <div className="mb-3">
                <Form.Label className="font-weight-bold">Nhân viên</Form.Label>
                <Form.Select>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                  ))}
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
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td><img src={product.image} alt={product.name} style={{ width: '50px' }} /></td>
                      <td>{product.name}</td>
                      <td>{product.barcode}</td>
                      <td>{product.unit}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price}</td>
                      <td>{product.discount}</td>
                    </tr>
                  ))}
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
