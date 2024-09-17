const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    categoryId: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String    
    }
})

module.exports = mongoose.model('Category', CategorySchema)