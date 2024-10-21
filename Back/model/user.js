const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    }
}, 
    { 
        timestamps: true 
    }
)
//Middleware để hash mật khẩu trước khi lưu
UserSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})
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