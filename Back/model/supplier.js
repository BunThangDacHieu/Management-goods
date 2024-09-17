const mongoose = require('mongoose');
const SupplierSchema = new mongoose.Schema({
    supplierId: {
        type: String    
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    contactInfo: {
        type: String
    }
})

module.exports = mongoose.model('Supplier', SupplierSchema)