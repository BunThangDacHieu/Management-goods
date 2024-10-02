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
      .get(ProductController.getProductbyId);

/--Category----/
router.route('/category')
      .get(CategoryController.GetAllCategory)
      .post(CategoryController.CreateCategory);


/-User-/
router.route('/user')
      .get(UserController.GetAllUser);

/-warehouse-/
router.route('/warehouse')
      .get(WarehouseController.GetAllWareHouse)
      .post(WarehouseController.CreateWareHouse);


/-supplier-/

router.route('/supplier')
      .get(SupplierController.GetAllSupplier)
      .post(SupplierController.CreateSupplier);

/-Orders-/
router.route('/order')
      .get(OrderController.GetAllOrder);


module.exports = router