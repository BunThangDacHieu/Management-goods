const mongoose = require('mongoose');
const WarehouseSchema = new mongoose.Schema({
    warehouseId: {
        type: String
    },
    name: {
        type: String
    },
    location:{
        type: String
    },
    capacity:{
        type: String
    }
})

module.exports = mongoose.model('Warehouse', WarehouseSchema)