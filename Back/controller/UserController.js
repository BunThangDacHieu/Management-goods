const express = require('express');
const router = express.Router();
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../model/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/jwtToken')


//-------------Hệ thống đăng nhập và đăng ký người dùng---------------/




//Đăng nhập người dùng
exports.Login = catchAsyncErrors(async (req, res, next) => {
    try {
        //Nhập thông tin dữ liệu
        const {password, email, role} = req.body;
        //Xác nhận thông tin được nhập
        if(!name || !password || !email) {
            res.status(500).json({message: 'Vui long nhap day du thong tin'})
        }
        //Kiểm tra xem người dùng đã tồn tại trong hệ thống hay chưa
        const existUser = await User.findOne({ email: req.body.email });
        if(!existUser) {
            res.status(500).json({message: 'Account already Exits'})
        }

        const user = await User.create({
            name,
            password,
            email,
            role: 'employee'
        })
        generateToken(user, "User Registered!", 200, res);
    } catch (error) {
        console.log("Hệ thống có vấn đề, đấiđáiai");
        res.status(500).json({message: error.message})
    }
})


//------Các method chuyền đến server đối với User/ Hệ thống quản lý người dùng-------//
exports.GetAllUser = catchAsyncErrors(async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})
//Tạo người dùng mới trong cơ sở dữ liệu
exports.CreateNewUser = catchAsyncErrors(async (req, res) => {
    try {
        // Kiểm tra xem tài khoản đã tồn tại trong cơ sở dữ liệu hay chưa
        const existingUser = await User.findOne({ mail: req.body.email });
        if (existingUser) {
            return res.status(409).send({ message: 'This Account is Already Exists' });
        }

        // Tạo mới người dùng
        const newUser = new User({
            email: req.body.email,
            // UserName: req.body.UserName,
            password: req.body.password,
            name: req.body.name,
            role: req.body.role || 'employee'
        });

        // Đặt mật khẩu cho người dùng
        // await newUser.setPassword(req.body.password);

        // Lưu người dùng mới vào cơ sở dữ liệu
        const user = await newUser.save();

        // Tạo JWT cho người dùng
        // const token = newUser.generateJWT();

        // Gửi phản hồi 201 với thông tin người dùng vừa được tạo mới và JWT
        return res.status(201).send(user);
    } catch (error) {
        // Ghi log lỗi và gửi phản hồi 500 nếu có lỗi xảy ra
        console.error(error.message);
        res.status(500).send({ message: 'An error occurred during signup.' });
    }
});


exports.FindUserbyUserId = catchAsyncErrors(async (req, res) => {
    try {
        //Check mail từ người dùng nhập
        const { id } = req.params;

        // Validate the format of the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID format.' });
        }
        // Check phân quyền
        if (req.user.role !== 'admin' && req.user.id !== id && req.user.role !=='manager') {
            return res.status(403).json({ success: false, message: 'Access denied.' });
        }
        // Tìm người dùng qua ID
        const users = await User.findById(id).select('-password'); // Exclude the password field
        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//Cập nhật Người 
exports.UpdateUserInfomation = catchAsyncErrors(async (req, res) =>{
    try {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Email yêu cầu bắt buộc." });
        }
        if (
            !req.body.mail ||!req.body.password) {
                return res.status(400).send({
                    message: "Nhập đầy đủ thông tin",
                });
            }
        const UpdateData = {
            name: req.body.name,
            email: req.body.mail,
            password: req.body.password
        }

        const updatedUser = await User.findOneAndUpdate(
            id,
            UpdateData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Người dung không thấy' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });   
    }
})
//Xóa người dùng bằng Id
exports.DeleteUserById = catchAsyncErrors(async(req, res)=>{
    try {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User không thấy' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});        
    }
})