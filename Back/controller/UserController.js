const express = require('express');
const router = express.Router();
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../model/user');


//-------------Các method chuyền đến server đối với User---------------/
exports.GetAllUser = catchAsyncErrors(async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})