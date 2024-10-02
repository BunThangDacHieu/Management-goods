const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController');
const CategoryController = require('../controller/CategoryController');
const UserController = require('../controller/UserController');
const WarehouseController = require('../controller/WareHouse');
const SupplierController = require('../controller/SupplierController');
const OrderController = require('../controller/OrderController');


/-Products-/
router.get('/products', ProductController.GetAllProducts)
      .get('/products/:id', ProductController.getProductbyId);  
/--Category----/
router.get('/category', CategoryController.GetAllCategory);

/-User-/
router.get('/user', UserController.GetAllUser);

/-warehouse-/
router.get('/warehouse', WarehouseController.GetAllWareHouse);

/-supplier-/

router.get('/supplier', SupplierController.GetAllSupplier);

/-Orders-/
router.get('/order', OrderController.GetAllOrder);



module.exports = router