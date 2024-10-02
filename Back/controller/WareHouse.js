const express = require('express');
const router = express.Router();
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const WareHouse = require('../model/warehouse');


//-------------<Các method chuyền đến server đối với WareHouse>---------------/
exports.GetAllWareHouse = catchAsyncErrors(async(req, res)=>{
    try {
        const warehouses = await WareHouse.find();
        res.status(200).json(warehouses);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})