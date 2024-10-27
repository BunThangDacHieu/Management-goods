const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController');
const CategoryController = require('../controller/CategoryController');
const UserController = require('../controller/UserController');
const WarehouseController = require('../controller/WareHouse');
const SupplierController = require('../controller/SupplierController');
const OrderController = require('../controller/OrderController');
const {protect ,isAdminAuthenticated, isSupplierAuthenticated, isAuthorized} = require('../middleware/auth');

// Route đăng ký cho quản lý
router.post('/register/manager', UserController.RegisterManager);

// Route đăng nhập chung
router.route('/login').post(UserController.Login);

// Route đăng ký cho nhân viên
router.route('/register/employee').post(UserController.RegisterEmployee);

// Route đăng ký cho nhà cung cấp
router.route('/register/supplier').post(UserController.RegisterSupplier);

//Quên mật khẩu người dùng
router.route('/forgot-password').post(UserController.ForgotPassword);
router.route('/reset-password/:token').patch(UserController.ResetPassword);

/-Products--/
// Chỉ Employee hoặc Manager có thể quản lý sản phẩm
router.route('/products') 
      .get(protect, ProductController.GetAllProducts)
      .post(protect,isAdminAuthenticated, isAuthorized('Employee', 'Manager'), ProductController.CreateProduct);

router.route('/product/:id')
      .get(ProductController.getProductbyId)
      .put(protect, isAdminAuthenticated,isSupplierAuthenticated, isAuthorized('Manager', 'Employee') ,ProductController.UpdateProduct)
      .delete(protect, isAdminAuthenticated,isAuthorized('Manager', 'Employee'), ProductController.DeleteProduct);

// Chỉ Manager có quyền quản lý danh mục
/--Category----/
router.route('/category')
      .get(CategoryController.GetAllCategory)
      .post(protect, isAdminAuthenticated, isAuthorized('Manager'), CategoryController.CreateCategory);

router.route('/category/:id')
      .get(CategoryController.getCategorybyId)
      .put(protect, isAdminAuthenticated, isAuthorized('Manager') ,CategoryController.UpdateCategory)
      .delete(protect, isAdminAuthenticated, isAuthorized('Manager'), CategoryController.DeleteCategory);

// Chỉ Manager có quyền quản lý người dùng
/-User-/
router.route('/user')
//protect, isAdminAuthenticated, isAuthorized('Manager'),
      .get( UserController.GetAllUser);
      // .post(protect, isAdminAuthenticated, isAuthorized('Manager') ,UserController.CreateNewUser);

router.route('/user/:id')
      .get(UserController.FindUserbyUserId)
      .put(protect, isAdminAuthenticated, isAuthorized('Manager'),UserController.UpdateUserInfomation)
      .delete(protect, isAdminAuthenticated, isAuthorized('Manager'),UserController.DeleteUserById);

// Employee và Manager có quyền quản lý kho
/-warehouse-/
router.route('/warehouse')
      .get(protect, isAdminAuthenticated,isAuthorized('Manager', 'Employee'),WarehouseController.GetAllWareHouse)
      .post(protect, isAdminAuthenticated,isAuthorized('Manager', 'Employee'),WarehouseController.CreateWareHouse);

router.route('/warehouse/:id')
      .get(protect, isAdminAuthenticated,isAuthorized('Manager', 'Employee'),WarehouseController.getWareHousebyId)
      .put(protect, isAdminAuthenticated,isAuthorized('Manager', 'Employee'),WarehouseController.UpdateWareHouse)
      .delete(protect, isAdminAuthenticated,isAuthorized('Manager', 'Employee'),WarehouseController.DeleteWareHouse);

/-supplier-/
// Supplier quản lý tài khoản và theo dõi đơn hàng của họ
router.route('/supplier')
      .get(protect, isSupplierAuthenticated, SupplierController.GetAllSupplier)
      .post(SupplierController.CreateSupplier); //// Đăng ký không cần authentication

router.route('/supplier/:id')
      .get(protect, isSupplierAuthenticated,SupplierController.getSupplierbyId)
      .put(protect, isSupplierAuthenticated,SupplierController.UpdateSupplierInformation)
      .delete(protect, isSupplierAuthenticated,SupplierController.DeleteSupplierbyId);

/-Orders-/
// Supplier tạo đơn hàng cung cấp, Employee xử lý đơn hàng
router.route('/order')
      .get(protect, OrderController.GetAllOrder)
      .post(protect, isSupplierAuthenticated, OrderController.CreateOrder); // Supplier tạo đơn hàng

router.route('/order/:id')
      .get(protect, isAdminAuthenticated, isAuthorized('Manager', 'Employee'),OrderController.GetOrderById)
      .put(protect, isAdminAuthenticated, isAuthorized('Manager', 'Employee'),OrderController.UpdateOrder)
      .delete(protect, isAdminAuthenticated, isAuthorized('Manager', 'Employee'),OrderController.DeleteOrder);

module.exports = router