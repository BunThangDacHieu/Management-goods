const mongoose = require('mongoose');
const Order = require('../model/order');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Lấy tất cả đơn hàng
exports.GetAllOrder = catchAsyncErrors(async (req, res) => {
    const orders = await Order.find()
        .populate('user', 'name email')
        .populate('supplier', 'name')
        .populate('warehouse', 'name');

    res.status(200).json({ success: true, data: orders });
});

// Tạo đơn hàng mới
exports.CreateOrder = catchAsyncErrors(async (req, res) => {
    const { user, products, shippingAddress, warehouse, supplier, orderCode, purchaseOrderCode } = req.body;

    if (!user || !products || !shippingAddress || !warehouse || !supplier || !orderCode || !purchaseOrderCode) {
        return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ thông tin đơn hàng.' });
    }

    // Tính tổng giá trị
    const totalPrice = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const newOrder = await Order.create({
        user,
        products,
        totalPrice,
        shippingAddress,
        warehouse,
        supplier,
        orderCode,
        purchaseOrderCode,
        importDate: Date.now(),
        status: 'Đang giao dịch',
        entryStatus: 'Chưa nhập',
        createdBy: req.user.id
    });

    res.status(201).json({ success: true, data: newOrder });
});

// Lấy tất cả đơn hàng của một user cụ thể
exports.GetOrdersByUserId = catchAsyncErrors(async (req, res) => {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId })
        .populate('user', 'name email')
        .populate('supplier', 'name')
        .populate('warehouse', 'name')
        .populate('products.productId', 'name price');

    if (!orders || orders.length === 0) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng nào cho người dùng này.' });
    }

    res.status(200).json({ success: true, data: orders });
});

// Thông tin đơn hàng dựa theo Id
exports.GetOrderById = catchAsyncErrors(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'ID đơn hàng không hợp lệ.' });
    }

    const order = await Order.findById(id)
        .populate('supplier')
        .populate('warehouse')
        .populate('user');

    if (!order) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng.' });
    }

    res.status(200).json({ success: true, data: order });
});

// Cập nhật đơn hàng
exports.UpdateOrder = catchAsyncErrors(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'ID đơn hàng không hợp lệ.' });
    }

    const updateData = req.body;

    // Nếu cập nhật trạng thái, đảm bảo nó là một trong các giá trị enum cho phép
    if (updateData.status && !['Hoàn thành', 'Đang giao dịch', 'Kết thúc', 'Đã Hủy'].includes(updateData.status)) {
        return res.status(400).json({ success: false, message: 'Trạng thái đơn hàng không hợp lệ.' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });

    if (!updatedOrder) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng để cập nhật.' });
    }

    res.status(200).json({ success: true, data: updatedOrder });
});

// Xóa đơn hàng
exports.DeleteOrder = catchAsyncErrors(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'ID đơn hàng không hợp lệ.' });
    }

    const order = await Order.findById(id);

    if (!order) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng để xóa.' });
    }

    await order.remove();

    res.status(200).json({ success: true, message: 'Đơn hàng đã được xóa thành công.' });
});
