const Products = require('../models/products')

exports.postProduct = async(req, res) => {
     const {title, description, price} = req.body
      
       if(!title || !req.file || !description || !price){
          return res.status(500).json({message: "all forms need"})
       }

     try{
       const product = await Products.create({
         title, description, price, image: req.file.path
       })

       res.status(200).json(product)

     }catch(err){
      res.status(500).json({message: 'cannot post products', error: err.message})
     }
}


exports.getProducts = async(req, res) => {
      try{
         const products = await Products.find().sort({createdAt: -1})
         res.status(200).json(products)
      }catch(err){
        res.status(500).json({message: 'cannot get products', error: err.message})
      }
}

exports.deleteProduct = async (req, res) => {
     const {productId} = req.body
      try{
          const deletedItem = await Products.findByIdAndDelete(productId)
          if (!deletedItem) {
            return res.status(404).json({ message: "Item not found in cart" })
          }
      
          res.status(200).json({ message: "Item deleted from cart", deletedItem })
     }catch(err){ 
      res.status(500).json({message: 'error deleting product', error: err.message})
     }
}