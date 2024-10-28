const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderCode: { // Mã đơn nhập (ví dụ: IN-001)
        type: String,
        required: true,
        unique: true
    },
    purchaseOrderCode: { // Mã đơn đặt hàng (ví dụ: PO-001)
        type: String,
        required: true,
        unique: true
    },
    user: { // Người dùng đặt hàng
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{ // Danh sách sản phẩm trong đơn hàng
        productId: {
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
    importDate: { // Ngày nhập đơn hàng
        type: Date,
        default: Date.now
    },
    status: { // Trạng thái đơn hàng
        type: String,
        enum: ['Hoàn thành', 'Đang giao dịch', 'Kết thúc', 'Đã Hủy'],
        required: true
    },
    entryStatus: { // Trạng thái nhập
        type: String,
        enum: ['Đã nhập', 'Chưa nhập'],
        required: true
    },
    warehouse: { // Tham chiếu đến kho hàng
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: true
    },
    supplier: { // Tham chiếu đến nhà cung cấp
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    createdBy: { // Nhân viên tạo đơn
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // Bạn cần tạo mô hình Employee nếu chưa có
        required: true
    },
}, 
{
    timestamps: true // Tự động thêm createdAt và updatedAt
});

module.exports = mongoose.model('Order', OrderSchema);
