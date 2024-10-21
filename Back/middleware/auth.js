const User = require('../model/user.js');
const catchAsyncErrors = require('./catchAsyncErrors.js');
const ErrorHandler = require('./error.js');
const jwt = require('jsonwebtoken');

// Hỗ trợ lấy thông tin người dùng từ token
const getUserFromToken = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return await User.findById(decoded.id);
};

// Middleware bảo vệ các routes - xác thực token cho tất cả người dùng
exports.protect = catchAsyncErrors(async (req, res, next) => {
    let token = req.cookies.userToken || (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null);

    if (!token) {
        return next(new ErrorHandler('Bạn chưa đăng nhập!', 401));
    }

    try {
        req.user = await getUserFromToken(token);
        if (!req.user) {
            return next(new ErrorHandler('Không tìm thấy người dùng với token này!', 404));
        }
        next();
    } catch (error) {
        return next(new ErrorHandler('Token không hợp lệ hoặc đã hết hạn!', 401));
    }
});

// Middleware phân quyền người dùng Manager, Employee
exports.isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    let token = req.cookies.adminToken || (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null);

    if (!token) {
        return next(new ErrorHandler("Người dùng không có quyền!", 401));
    }

    try {
        req.user = await getUserFromToken(token);
        if (!['Manager', 'Employee'].includes(req.user.role)) {
            return next(new ErrorHandler(`Người dùng với vai trò ${req.user.role} không có quyền truy cập!`, 403));
        }
        next();
    } catch (error) {
        return next(new ErrorHandler("Token không hợp lệ hoặc đã hết hạn!", 401));
    }
});

// Middleware phân quyền cho Supplier 
exports.isSupplierAuthenticated = catchAsyncErrors(async (req, res, next) => {
    let token = req.cookies.supplierToken || (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null);

    if (!token) {
        return next(new ErrorHandler("Supplier không chính xác hoặc có lỗi về token!", 401));
    }

    try {
        req.user = await getUserFromToken(token);
        if (req.user.role !== 'Supplier') {
            return next(new ErrorHandler(`Người dùng với vai trò ${req.user.role} không có quyền truy cập!`, 403));
        }
        next();
    } catch (error) {
        return next(new ErrorHandler("Token không hợp lệ hoặc đã hết hạn!", 401));
    }
});

// Middleware vai trò được xác nhận từ hệ thống Manager, Employee, Supplier
exports.isAuthorized = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`${req.user.role} không có quyền truy cập vào hệ thống này!`, 403));
        }
        next();
    };
};
