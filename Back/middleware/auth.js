const User = require('../model/user.js')
const catchAsyncErrors = require('./catchAsyncErrors.js')
const ErrorHandler = require('./error.js')
const jwt = require('jsonwebtoken')


//protect routes - authenticate token for all users
exports.protect = catchAsyncErrors(async (req, res, next) => {
    let token;

    // Lấy token từ cookie hoặc header Authorization
    if (req.cookies.userToken) {
        token = req.cookies.userToken;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Nếu không có token, báo lỗi không xác thực
    if (!token) {
        return next(new ErrorHandler('Bạn chưa đăng nhập!', 401));
    }

    try {
        // Giải mã token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // Tìm người dùng theo id trong token
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return next(new ErrorHandler('Không tìm thấy người dùng với token này!', 404));
        }

        next();
    } catch (error) {
        return next(new ErrorHandler('Token không hợp lệ hoặc đã hết hạn!', 401));
    }
});


// Middleware phân quyền người dùng Manager, Employee
exports.isAdminAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    let token = req.cookies.adminToken;

    // Check Authorization header if cookie is not present
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ErrorHandler("Người dùng không có quyền!", 401));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id);

      // Kiểm tra xem người đăng nhập có phải Manager hoặc Employee
      if (!['Manager', 'Employee'].includes(req.user.role)) {
        return next(new ErrorHandler(`${req.user.role} Không có quyền xác nhận tài nguyên!`, 403));
      }

      next();
    } catch (error) {
      return next(new ErrorHandler("Invalid or expired token", 401));
    }
  }
);

// Middleware phân quyền cho Supplier 
exports.isSupplierAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    let token = req.cookies.supplierToken;

    // Check Authorization header if cookie is not present
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ErrorHandler("Supplier không chính xác hoặc có lỗi về token!", 401));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id);

      // Xác nhận vai trò của người cung hàng
      if (req.user.role !== 'Supplier') {
        return next(new ErrorHandler(`${req.user.role} Không có quyền vào trong hệ thống này`, 403));
      }

      next();
    } catch (error) {
      return next(new ErrorHandler("Invalid or expired token", 401));
    }
  }
);

// Middleware vai trò được xác nhận từ hệ thoogns Manager, Employee, Supplier
exports.isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`${req.user.role} Không có quyền đăng nhập vào hệ thống này`, 403));
    }
    next();
  };
};
