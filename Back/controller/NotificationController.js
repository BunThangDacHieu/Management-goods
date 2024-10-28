// controllers/NotificationController.js
const Notification = require('../model/notification');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Lấy tất cả thông báo cho người dùng
exports.getUserNotifications  = catchAsyncErrors(async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Đánh dấu thông báo là đã đọc
exports.markAsRead =catchAsyncErrors(async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Tạo thông báo mới
exports.createNotification = catchAsyncErrors(async (req, res) => {
    const { userId, message } = req.body;
    try {
        const notification = new Notification({ userId, message });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
