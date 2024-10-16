const mongoose = require('mongoose');
const SupplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name need to required"]
    },
    address: {
        type: String,
        required: [true, "Address need to required"]
    },
    contactEmail: {
        type: String,
        required: [true, "Email need to required"],
        unique: true // xác nhận rằng email của nhà cung cấp là duy nhất
    },
    contactPhone: {
        type: String,
        required: [true, "Phone need to required"],
        minLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
        maxLength: [11, "Phone Number Must Contain Exact 11 Digits!"]
    },
})

module.exports = mongoose.model('Supplier', SupplierSchema)