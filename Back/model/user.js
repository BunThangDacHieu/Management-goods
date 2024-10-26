const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, //tên ng dùng là duy nhất
        minLength: [3, "Name Must Contain At Least 3 Characters!"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Provide A Valid Email!"],
    },  
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password Must Contain At Least 8 Characters!"],
        select: false
    },
    //Chia vị trí trong dự án
    role:{
        type: String,
        required: [true, "User Role Required"],
        enum: ['Manager', 'Employee', 'Supplier'],
    },
    username: { type: String, unique: true, sparse: true },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: function() {
            return this.role === 'Supplier';
        }
    },
    passwordResetToken: {
        type: String,
        select: false // Không muốn lưu trường này khi tìm kiếm
    },
    passwordResetExpires: {
        type: Date,
        select: false // Không muốn lưu trường này khi tìm kiếm
    }
}, 
    { 
        timestamps: true 
    }
)
//
UserSchema.methods.createPasswordResetToken = function() {
    // Tạo một token mới
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Lưu token và thời gian hết hạn vào cơ sở dữ liệu
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex'); // Băm token để lưu
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Hết hạn sau 10 phút

    return resetToken; // Trả về token gốc để gửi qua email
};


//Middleware để hash mật khẩu trước khi lưu
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next(); // Nếu không thay đổi mật khẩu, tiếp tục
    }
    this.password = await bcrypt.hash(this.password, 10); // Hash mật khẩu
    next(); // Gọi next sau khi hash
});

//So sánh mật khẩu
UserSchema.methods.comparePassword = async function (enteredPassword) {
    console.log('Mật khẩu nhập vào:', enteredPassword);
    console.log('Mật khẩu đã lưu:', this.password);
    return await bcrypt.compare(enteredPassword, this.password);
};
// Phương thức tạo JWT
UserSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
      });
}

module.exports = mongoose.model('User', UserSchema)