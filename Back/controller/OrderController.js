const express = require('express');
const router = express.Router();
const Order = require('../model/order');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');



//-------------<Các method chuyền đến server đối với Order>---------------/
exports.GetAllOrder= catchAsyncErrors((req, res, next) =>{
    try {
        const orders = Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})