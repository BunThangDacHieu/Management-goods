const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true //tên ng dùng là duy nhất
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    //Chia vị trí trong dự án
    role:{
        type: String,
        enum: ['manager', 'employee', 'admin'],
        default: 'employee'
    },
    name: {
        type: String
    },
}, 
    { 
        timestamps: true 
    }
)

module.exports = mongoose.model('User', UserSchema)