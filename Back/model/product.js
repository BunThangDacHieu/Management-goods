const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    productId: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type:number,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    quantity:{  
        type: number,
    }
});


module.exports = mongoose.model('Product', ProductSchema)