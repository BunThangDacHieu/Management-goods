const express = require('express');
const router = express.Router();
const Supplier = require('../model/supplier');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');


//-------------<Các method chuyền đến server đối với Supplier>---------------/
exports.GetAllSupplier= catchAsyncErrors((req, res, next) =>{
    try {
        const suppliers = Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})