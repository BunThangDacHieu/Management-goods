const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { // Người dùng đặt hàng
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{ // Danh sách sản phẩm trong đơn hàng
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: { // Giá tại thời điểm đặt hàng
            type: Number,
            required: true
        }
    }],
    totalPrice: { // Tổng giá trị đơn hàng
        type: Number,
        required: true
    },
    importDate: { // Ngày đặt đơn hàng
        type: Date,
        default: Date.now
    },
    exportDate: {
        type: Date,
        default: Date.now
    },
    status: { // Trạng thái đơn hàng
        type: String,
        enum: ['đang chờ', 'Đang xử lý', 'Đang giao', 'Đã giao', 'Hủy bỏ'],
        default: 'đang chờ'
    },
    orderDate: { // Ngày đặt hàng
        type: Date,
        default: Date.now
    },
    shippingAddress: { // Địa chỉ giao hàng
        type: String,
        required: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    }
}, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Order', OrderSchema)