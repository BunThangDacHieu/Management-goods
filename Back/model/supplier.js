const mongoose = require('mongoose');
const SupplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    contactEmail: {
        type: String,
        required: true,
        unique: true // xác nhận rằng email của nhà cung cấp là duy nhất
    },
    contactPhone: {
        type: String
    },
})

module.exports = mongoose.model('Supplier', SupplierSchema)