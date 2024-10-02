const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, //Yêu cầu mục phải tồn tại
        unique: true // Đảm bảo tên danh mục là duy nhất
    },
    description: {
        type: String    
    },
},
{ 
    timestamps: true //tạo cho tiện kiểm tra CreateAt và UpdateAt
}); 



module.exports = mongoose.model('Category', CategorySchema)