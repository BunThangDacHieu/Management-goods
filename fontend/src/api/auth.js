import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:9999'; // URL của Backend

const authHeader = (token) => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// ===== User Authentication =====

// Đăng ký tài khoản
export const registerManager = (data) => axios.post(`${API_URL}/register/manager`, data);
export const registerEmployee = (data) => {
  return axios.post(`${API_URL}/register/employee`, data);
}
export const registerSupplier = (data) => axios.post(`${API_URL}/register/supplier`, data);

// Đăng nhập tài khoản
export const SystemLogin = async (data) => {
  const { email, password } = data;
  return await axios.post(`${API_URL}/login`, { email, password });
};

export const logout = () => localStorage.removeItem('token');

// Quên mật khẩu
export const forgotPassword = (email) => 
  axios.post(`${API_URL}/forgot-password`, { email });

// Đặt lại mật khẩu
export const resetPassword = (token, newPassword) => 
  axios.patch(`${API_URL}/reset-password/${token}`, { password: newPassword });

// ===== Products =====

// Lấy tất cả sản phẩm
export const getAllProducts = (token) =>
  axios.get(`${API_URL}/products`, authHeader(token));

// Tạo mới sản phẩm
export const createProduct = (data, token) =>
  axios.post(`${API_URL}/products`, data, authHeader(token));

// Lấy, cập nhật và xóa sản phẩm theo ID
export const getProductById = (id) => axios.get(`${API_URL}/product/${id}`);
export const updateProduct = (id, data, token) =>
  axios.put(`${API_URL}/product/${id}`, data, authHeader(token));
export const deleteProduct = (id, token) =>
  axios.delete(`${API_URL}/product/${id}`, authHeader(token));

// ===== Categories =====

// Lấy tất cả danh mục
export const getAllCategories = () => axios.get(`${API_URL}/category`);

// Tạo mới danh mục
export const createCategory = (data, token) =>
  axios.post(`${API_URL}/category`, data, authHeader(token));

// Lấy, cập nhật và xóa danh mục theo ID
export const getCategoryById = (id) => axios.get(`${API_URL}/category/${id}`);
export const updateCategory = (id, data, token) =>
  axios.put(`${API_URL}/category/${id}`, data, authHeader(token));
export const deleteCategory = (id, token) =>
  axios.delete(`${API_URL}/category/${id}`, authHeader(token));

// ===== Users =====

// Lấy tất cả người dùng
export const getAllUsers = (token) =>
  axios.get(`${API_URL}/user`, authHeader(token));

// Lấy, cập nhật và xóa người dùng theo ID
export const getUserById = (id, token) =>
  axios.get(`${API_URL}/user/${id}`, authHeader(token));
export const updateUser = (id, data, token) =>
  axios.put(`${API_URL}/user/${id}`, data, authHeader(token));
export const deleteUserById = (id, token) =>
  axios.delete(`${API_URL}/user/${id}`, authHeader(token));
  
// ===== Warehouse =====

// Lấy tất cả kho
export const getAllWarehouses = (token) =>
  axios.get(`${API_URL}/warehouse`, authHeader(token));

// Tạo mới kho
export const createWarehouse = (data, token) =>
  axios.post(`${API_URL}/warehouse`, data, authHeader(token));

// Lấy, cập nhật và xóa kho theo ID
export const getWarehouseById = (id, token) =>
  axios.get(`${API_URL}/warehouse/${id}`, authHeader(token));
export const updateWarehouse = (id, data, token) =>
  axios.put(`${API_URL}/warehouse/${id}`, data, authHeader(token));
export const deleteWarehouse = (id, token) =>
  axios.delete(`${API_URL}/warehouse/${id}`, authHeader(token));

// ===== Supplier =====

// Lấy tất cả supplier
export const getAllSuppliers = (token) =>
  axios.get(`${API_URL}/supplier`, authHeader(token));

// Tạo mới supplier
export const createSupplier = (data) => axios.post(`${API_URL}/supplier`, data);

// Lấy, cập nhật và xóa supplier theo ID
export const getSupplierById = (id, token) =>
  axios.get(`${API_URL}/supplier/${id}`, authHeader(token));
export const updateSupplier = (id, data, token) =>
  axios.put(`${API_URL}/supplier/${id}`, data, authHeader(token));
export const deleteSupplierById = (id, token) =>
  axios.delete(`${API_URL}/supplier/${id}`, authHeader(token));

// ===== Orders =====

// Lấy tất cả đơn hàng
export const getAllOrders = (token) => 
  axios.get(`${API_URL}/order`, authHeader(token));

// Tạo mới đơn hàng (Supplier)
export const createOrder = (data, token) =>
  axios.post(`${API_URL}/order`, data, authHeader(token));

// Lấy, cập nhật và xóa đơn hàng theo ID
export const getOrderById = (id, token) =>
  axios.get(`${API_URL}/order/${id}`, authHeader(token));
export const updateOrder = (id, data, token) =>
  axios.put(`${API_URL}/order/${id}`, data, authHeader(token));
export const deleteOrder = (id, token) =>
  axios.delete(`${API_URL}/order/${id}`, authHeader(token));