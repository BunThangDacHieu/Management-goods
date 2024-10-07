const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController');
const CategoryController = require('../controller/CategoryController');
const UserController = require('../controller/UserController');
const WarehouseController = require('../controller/WareHouse');
const SupplierController = require('../controller/SupplierController');
const OrderController = require('../controller/OrderController');


/-Products-/
router.route('/products') 
      .get(ProductController.GetAllProducts)
      .post(ProductController.CreateProduct);

router.route('/product/:id')
      .get(ProductController.getProductbyId)
      .put(ProductController.UpdateProduct)
      .delete(ProductController.DeleteProduct);

/--Category----/
router.route('/category')
      .get(CategoryController.GetAllCategory)
      .post(CategoryController.CreateCategory);

router.route('/category/:id')
      .get(CategoryController.getCategorybyId)
      .put(CategoryController.UpdateCategory)
      .delete(CategoryController.DeleteCategory);


/-User-/
router.route('/user')
      .get(UserController.GetAllUser)
      .post(UserController.CreateNewUser);

router.route('/user/:id')
      .get(UserController.FindUserbyUserId)
      .put(UserController.UpdateUserInfomation)
      .delete(UserController.DeleteUserById);

/-warehouse-/
router.route('/warehouse')
      .get(WarehouseController.GetAllWareHouse)
      .post(WarehouseController.CreateWareHouse);

router.route('/warehouse/:id')
      .get(WarehouseController.getWareHousebyId)
      .put(WarehouseController.UpdateWareHouse)
      .delete(WarehouseController.DeleteWareHouse);


/-supplier-/

router.route('/supplier')
      .get(SupplierController.GetAllSupplier)
      .post(SupplierController.CreateSupplier);

router.route('/supplier/:id')
      .get(SupplierController.getSupplierbyId)
      .put(SupplierController.UpdateSupplierInformation)
      .delete(SupplierController.DeleteSupplierbyId);

/-Orders-/
router.route('/order')
      .get(OrderController.GetAllOrder)
      .post(OrderController.CreateOrder);

router.route('/order/:id')
      .get(OrderController.GetOrderById)
      .put(OrderController.UpdateOrder)
      .delete(OrderController.DeleteOrder);

module.exports = router