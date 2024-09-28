const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    productId: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: String,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    quantity:{  
        type: String,
    }
});


module.exports = mongoose.model('Product', ProductSchema)