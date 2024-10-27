const express = require('express');
const router = express.Router();
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../model/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail')
const generateToken = require('../utils/jwtToken');
const {ErrorHandler} = require('../middleware/error');
const Supplier = require('../model/supplier');
const crypto = require('crypto');


//-------------Hệ thống đăng nhập và đăng ký người dùng---------------/

// Đăng ký quản lý (Manager)
exports.RegisterManager = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    // Kiểm tra thông tin cơ bản
    if (!name || !email || !password || !confirmPassword) {
        return next(new ErrorHandler("Nhập thông tin đầy đủ", 400));
    }

    // Kiểm tra mật khẩu khớp
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Mật khẩu không khớp", 400));
    }

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("Email đã được sử dụng", 400));
    }

    // Tạo tài liệu User với vai trò Manager
    const user = await User.create({
        name,
        email,
        password,
        role: 'Manager' // Mặc định là Manager
    });

    // Gửi phản hồi với token
    return generateToken(user, "Đăng ký thành công", 201, res);
});

// Đăng nhập người quản lý (Manager)
exports.ManagerLogin = catchAsyncErrors(async (req, res, next) => {
    const { password, email } = req.body;

    // Xác nhận thông tin được nhập
    if (!password || !email) {
        return next(new ErrorHandler("Nhập thông tin đầy đủ", 400));
    }

    // Tìm người dùng theo email
    const user = await User.findOne({ email, role: 'Manager' }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Sai mật khẩu hoặc email", 400));
    }

    // Kiểm tra mật khẩu
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Sai Email hoặc Password!", 400));
    }

    // Gửi phản hồi với token
    return generateToken(user, "Đăng nhập thành công", 200, res);
});


//Đăng ký nhân viên(Employee)
exports.RegisterEmployee = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    // Kiểm tra thông tin cơ bản
    if (!name || !email || !password || !confirmPassword) {
        return next(new ErrorHandler("Nhập thông tin đầy đủ", 400));
    }

    // Kiểm tra mật khẩu khớp
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Mật khẩu không khớp", 400));
    }

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("Email đã được sử dụng", 400));
    }

    // Tạo tài liệu User với vai trò Employee
    const user = await User.create({
        name,
        email,
        password,
        role: 'Employee' // Mặc định là Employee
    });

    // Gửi phản hồi với token
    return generateToken(user, "Đăng ký thành công", 201, res);
});


//Đăng ký người cung hàng(Supplier)
exports.RegisterSupplier = catchAsyncErrors(async(req, res, next) =>{
        const { name, address, contactEmail, password, confirmPassword, contactPhone } = req.body;

    // Kiểm tra thông tin cơ bản
    if (!name || !contactEmail || !password || !confirmPassword) {
        return next(new ErrorHandler("Nhập thông tin đầy đủ", 400));
    }

    // Kiểm tra mật khẩu khớp
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Mật khẩu không khớp", 400));
    }

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email: contactEmail });
    if (existingUser) {
        return next(new ErrorHandler("Email đã được sử dụng", 400));
    }

    // Kiểm tra xem email nhà cung cấp đã tồn tại chưa
    const existingSupplier = await Supplier.findOne({ contactEmail });
    if (existingSupplier) {
        return next(new ErrorHandler("Email nhà cung cấp đã tồn tại", 400));
    }

    // Tạo tài liệu Supplier
    const supplier = await Supplier.create({
        name,
        address,
        password,
        contactEmail,
        contactPhone,
    });

    // Tạo tài liệu User với vai trò Supplier và liên kết với Supplier
    const user = await User.create({
        name,
        email: contactEmail,
        password,
        role: 'Supplier',
        supplier: supplier._id
    });

    // Gửi phản hồi với token
    return generateToken(user, "Đăng ký nhà cung cấp thành công", 201, res);
})

// Đăng nhập người dùng
exports.Login = catchAsyncErrors(async (req, res, next) => {
    try {
        const { password, email } = req.body;

        if (!password || !email ) {
            return next(new ErrorHandler("Nhập thông tin đầy đủ", 400));
        }

        const user = await User.findOne({
            $or: [
                { email },
                { supplier: { $exists: true }, contactEmail: email }
            ]
        }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Sai mật khẩu hoặc email", 400));
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new ErrorHandler("Sai Email hoặc Password!", 400));
        }

        // Tạo và gửi token
        return generateToken(user, "Đăng nhập thành công", 200, res);
    } catch (error) {
        console.error("Login error:", error); // Ghi log lỗi cho dễ theo dõi
        return res.status(500).json({ success: false, message: "Đã có lỗi xảy ra trên server." });
    }
});



//------Các method chuyền đến server đối với User/ Hệ thống quản lý người dùng-------//
exports.ForgotPassword = catchAsyncErrors(async(req, res, next) => {
    const {email} = req.body;

    const user = await User.findOne({email});

    if(!user) {
        return next(new ErrorHandler('Không tìm thấy người dùng', 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Create reset URL - consider making this an environment variable
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

    const message = `Vui lòng nhấn vào liên kết để khôi phục mật khẩu của bạn: \n\n ${resetUrl} \n\n Nếu bạn không yêu cầu khôi phục mật khẩu, hãy bỏ qua email này.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Khôi phục mật khẩu',
            message
        });

        res.status(200).json({
            success: true,
            message: `Reset token đã được gửi tới email: ${email}`,
        });
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler('Có lỗi xảy ra khi gửi email, vui lòng thử lại sau.', 500));
    }
});
// Hàm khôi phục mật khẩu
exports.ResetPassword = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.params;
    const { password } = req.body;

    // Hash token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler('Token không hợp lệ hoặc đã hết hạn', 400));
    }

    // Update password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Mật khẩu đã được khôi phục thành công'
    });
});


exports.GetAllUser = catchAsyncErrors(async (req, res, next) => {
    console.log('Request received for GetAllUser');
    const users = await User.find(); 
    console.log('Users found:', users);
    
    if (!users.length) {
        return next(new ErrorHandler('Không tìm thấy người dùng!', 404)); // Chỉ gửi một lần
    }

    res.status(200).json({
        success: true,
        users
    });
});
//Tạo người dùng mới trong cơ sở dữ liệu
// exports.CreateNewUser = catchAsyncErrors(async (req, res) => {
//     try {
//         // Kiểm tra xem tài khoản đã tồn tại trong cơ sở dữ liệu hay chưa
//         const existingUser = await User.findOne({ mail: req.body.email });
//         if (existingUser) {
//             return res.status(409).send({ message: 'This Account is Already Exists' });
//         }

//         // Tạo mới người dùng
//         const newUser = new User({
//             email: req.body.email,
//             // UserName: req.body.UserName,
//             password: req.body.password,
//             name: req.body.name,
//             role: req.body.role || 'employee'
//         });

//         // Đặt mật khẩu cho người dùng
//         // await newUser.setPassword(req.body.password);

//         // Lưu người dùng mới vào cơ sở dữ liệu
//         const user = await newUser.save();

//         // Tạo JWT cho người dùng
//         // const token = newUser.generateJWT();

//         // Gửi phản hồi 201 với thông tin người dùng vừa được tạo mới và JWT
//         return res.status(201).send(user);
//     } catch (error) {
//         // Ghi log lỗi và gửi phản hồi 500 nếu có lỗi xảy ra
//         console.error(error.message);
//         res.status(500).send({ message: 'An error occurred during signup.' });
//     }
// });


exports.FindUserbyUserId = catchAsyncErrors(async (req, res) => {
    
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