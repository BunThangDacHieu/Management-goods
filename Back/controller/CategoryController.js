const express = require('express');
const router = express.Router();
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Category = require('../model/category');


//-------------<Các method chuyền đến server đối với Category>---------------/
exports.GetAllCategory = catchAsyncErrors(async (req, res) => {
    try {
        const categorys = await Category.find();
        res.status(200).json(categorys);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}
)