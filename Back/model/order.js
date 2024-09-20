const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String
    },
    userId: {
        type: String
    },
    productId: {
        type: String
    },
    quantity: {
        type: String
    },
    price: {
        type: String
    },
    status: {
        type: String,
        enum: ['PENDING', 'SHIPPED', 'DELIVERED'] 
    },
})

module.exports = mongoose.model('Order', OrderSchema)