const mongoose = require('mongoose');
const SupplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name need to required"]
    },
    password: {
        type: String,
        required: [true, "Password need to required"]
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
        minLength: [9, "Phone Number Must Contain Exact 9 Digits!"],
        maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"]
    },
})

module.exports = mongoose.model('Supplier', SupplierSchema)