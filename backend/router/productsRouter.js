const express = require('express')
const router = express.Router()
const {getProducts, postProduct, deleteProduct} = require('../controllers/productsController')
const multer = require('../middleware/upload')

router.get('/getProducts', getProducts)
router.post('/postProduct', multer.single('image'), postProduct)
router.delete('/deleteProduct', deleteProduct)

module.exports = router