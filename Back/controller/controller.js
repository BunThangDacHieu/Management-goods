const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const Category = require('../model/category');
const User = require('../model/user');
const Warehouse = require('../model/warehouse');
const Supplier = require('../model/supplier');
const Order = require('../model/order');



module.exports = router