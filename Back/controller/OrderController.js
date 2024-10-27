const mongoose = require('mongoose');
const Order = require('../model/order');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Lấy tất cả đơn hàng
exports.GetAllOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email') // Populating user for better response
            .populate('supplier', 'name') // Populating supplier for better response
            .populate('warehouse', 'name'); // Populating warehouse for better response

        res.status(200).json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Tạo đơn hàng mới
exports.CreateOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const { user, products, shippingAddress, warehouse, supplier, orderCode, purchaseOrderCode } = req.body;

        if (!user || !products || !shippingAddress || !warehouse || !supplier || !orderCode || !purchaseOrderCode) {
            return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin đơn hàng.' });
        }

        // Tính tổng giá trị
        const totalPrice = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

        const newOrder = await Order.create({
            user,
            products,
            totalPrice,
            shippingAddress, // Đảm bảo rằng shippingAddress được thêm vào
            warehouse,
            supplier,
            orderCode,
            purchaseOrderCode,
            importDate: Date.now(),
            status: 'Đang giao dịch', // Trạng thái mặc định khi tạo đơn hàng
            entryStatus: 'Chưa nhập', // Trạng thái nhập mặc định
            createdBy: req.user.id // Lấy id người dùng từ token (nếu có)
        });

        res.status(201).json({
            success: true,
            data: newOrder
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo đơn hàng: ' + error.message });
    }
});

// Thông tin đơn hàng dựa theo Id
exports.GetOrderById = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID đơn hàng không hợp lệ.' });
        }

        const order = await Order.findById(id)
            .populate('supplier')
            .populate('warehouse')
            .populate('user');

        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Cập nhật đơn hàng
exports.UpdateOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID đơn hàng không hợp lệ.' });
        }

        const updateData = req.body;

        // Nếu cập nhật trạng thái, đảm bảo nó là một trong các giá trị enum cho phép
        if (updateData.status && !['Hoàn thành', 'Đang giao dịch', 'Kết thúc', 'Đã Hủy'].includes(updateData.status)) {
            return res.status(400).json({ message: 'Trạng thái đơn hàng không hợp lệ.' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng để cập nhật.' });
        }

        res.status(200).json({
            success: true,
            data: updatedOrder
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Xóa đơn hàng
exports.DeleteOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID đơn hàng không hợp lệ.' });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng để xóa.' });
        }

        await order.remove();

        res.status(200).json({
            success: true,
            message: 'Đơn hàng đã được xóa thành công.'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});
