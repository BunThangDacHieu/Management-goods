const mongoose = require('mongoose');
const WarehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location:{
        type: String
    },
    capacity:{
        type: Number, //dùng số để tính toán
        default: 0
    }
}, 
    {
        timestamps: true
        //Cái này có cần không :v
    }
)

module.exports = mongoose.model('Warehouse', WarehouseSchema)