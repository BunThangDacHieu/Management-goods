// models/UserActivity.js
const mongoose = require('mongoose');

const UserActivitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserActivity', UserActivitySchema);
