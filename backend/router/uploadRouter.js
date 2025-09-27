const express = require('express')
const router = express.Router()
const {uploadImage, getImages} = require('../controllers/uploadController')
const multer = require('../middleware/upload')
const protect = require('../middleware/protect')

router.post('/uploadImage', multer.single('image'), protect, uploadImage)
router.get('/getImage', protect, getImages)

module.exports = router