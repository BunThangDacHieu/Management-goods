const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const Category = require('../model/category');
const User = require('../model/user');
const Warehouse = require('../model/warehouse');
const Supplier = require('../model/supplier');
const Order = require('../model/order');
const catchAsyncErrors = require('../middleware/ErrorAsync'); ;

/-------------<Các method chuyền đến server đối với Products>---------------/
//Hiển thị toàn bộ cơ sở dữ liệu trong hệ thống
exports.GetAllProducts = catchAsyncErrors(async (req, res) => {
    try {
        //Khai báo một hàm products rỗng rồi sử dụng lệnh find() trong 
        //express để get cơ sở dữ liệu từ Model Product từ Mongo
        const products = await Product.find();
        //Trả lại giá trị cơ sở dữ liệu và trả lại với status 200 xác nhận 
        //rằng lệnh đã thực thi chính xác
        res.status(200).json(products);
    } catch (error) {
        //Trả lại tin nhắn lỗi khi có vấn đề, đồng thời hiện vấn đề lỗi
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})
//Nhận thông tin dữ liệu từ một Product cụ thể
exports.getProductbyId = async (req, res) => {
    
}


/-------------<Các method chuyền đến server đối với Category>---------------/
exports.GetAllCategory = async (req, res) => {
    try {
        const categorys = await Category.find();
        res.status(200).json(categorys);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}


/-------------<Các method chuyền đến server đối với User>---------------/
exports.GetAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

/-------------<Các method chuyền đến server đối với WareHouse>---------------/
exports.GetAllWareHouse = async (req, res) => {
    try {
        const warehouse = await Warehouse.find();
        res.status(200).json(warehouse);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}
/-------------<Các method chuyền đến server đối với Supplier>---------------/
exports.GetAllSupplier= async (req, res) => {
    try {
        const supplier = await Supplier.find();
        res.status(200).json(supplier);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}
/-------------<Các method chuyền đến server đối với Order>---------------/
exports.GetAllOrder= async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}