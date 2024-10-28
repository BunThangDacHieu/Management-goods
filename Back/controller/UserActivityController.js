// controllers/UserActivityController.js
const UserActivity = require('../model/userActivity');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

// Lấy tất cả hoạt động của người dùng
exports.getUserActivities = catchAsyncErrors(async (req, res) => {
    try {
        const activities = await UserActivity.find({ userId: req.user._id }).sort({ timestamp: -1 });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Tạo hoạt động mới
exports.createUserActivity = catchAsyncErrors(async (req, res) => {
    const { action } = req.body;
    try {
        const userActivity = new UserActivity({ userId: req.user._id, action });
        await userActivity.save();
        res.status(201).json(userActivity);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
