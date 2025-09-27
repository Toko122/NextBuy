const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
     productId: {type:mongoose.Schema.Types.ObjectId, ref: 'Products', required:true},
     userId: {type:mongoose.Schema.Types.ObjectId, ref: 'Users', required:true},
     quantity: {type: Number, default: 1}
})

CartSchema.index({userId: 1, productId: 1}, {unique:true})

module.exports = mongoose.model('Cart', CartSchema)