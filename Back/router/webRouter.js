const express = require('express');
const router = express.Router();
const controller = require('../controller/WebController');

/-Products-/
router.get('/products', controller.GetAllProducts);

/--Category----/
router.get('/category', controller.GetAllCategory);

/-User-/
router.get('/user', controller.GetAllUser);

/-warehouse-/
router.get('/warehouse', controller.GetAllWareHouse);

/-supplier-/

router.get('/supplier', controller.GetAllSupplier);

/-Orders-/
router.get('/order', controller.GetAllOrder);



module.exports = router