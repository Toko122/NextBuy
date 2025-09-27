const Cart = require('../models/cart')

exports.addToCart = async(req, res) => {
     const userId = req.user.id
     const {productId, quantity} = req.body
     try{
        let cartItem = await Cart.findOne({userId, productId})

        if(cartItem){
            cartItem.quantity += quantity || 1
            await cartItem.save()
            return res.status(200).json({ message: 'Quantity updated', cartItem })
        }else{
            const newCartItem = new Cart({
                userId,
                productId,
                quantity: quantity || 1
            })
            await newCartItem.save()
            return res.status(201).json({ message: 'Product added to cart', newCartItem })
        }

     }catch(err){ 
        res.status(500).json({message: 'error adding to cart', erro: err.message})
     }
}


exports.getCart = async(req, res) => {
    const userId = req.user.id
      try{ 
    
        const cart = await Cart.find({userId}).populate('productId')
        res.status(200).json({ cart })

      }catch(err){
        res.status(500).json({message: 'error getting cart', erro: err.message})
      }
}


exports.deleteCart = async(req, res) => {
     const {productId} = req.body
     const userId = req.user.id
      try{
        const deletedItem = await Cart.findOneAndDelete({userId, productId})

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found in cart" })
          }
      
          res.status(200).json({ message: "Item deleted from cart", deletedItem })

      }catch(err){
        res.status(500).json({message: 'error deleting cart', erro: err.message})
      }
}