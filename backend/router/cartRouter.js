const express = require('express')
const router = express.Router()
const {deleteCart, addToCart, getCart} = require('../controllers/cartController')
const protect = require('../middleware/protect')

router.post('/addToCart', protect, addToCart)
router.get('/getCart', protect, getCart)
router.delete('/deleteCart', protect, deleteCart)

module.exports = router