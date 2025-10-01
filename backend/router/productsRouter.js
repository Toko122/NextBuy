const express = require('express');
const router = express.Router();
const { postProduct, getProducts, deleteProduct } = require('../controllers/productsController');
const upload = require('../middleware/upload');

router.post('/postProduct', upload.single('image'), postProduct);
router.get('/getProducts', getProducts);
router.delete('/deleteProduct', deleteProduct);

module.exports = router;
