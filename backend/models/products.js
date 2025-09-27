const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    price: {type: Number, required: true},
    image: {type: String},
})

module.exports = mongoose.model('Products', ProductsSchema)