const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    quantity:{  
        type: Number,
        default: 0
    },
    supplier: { // Tham chiếu đến Supplier
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    warehouse: { // Tham chiếu đến Warehouse
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse'
    },
    description: {
        type: String
    },
    //Nhập hàng

    sku: { //mã duy nhất cho sản phẩm / Stock Keping unit
        type: String,
        unique: true
    }
},
    {
        timestamps: true
    }
);


module.exports = mongoose.model('Product', ProductSchema)