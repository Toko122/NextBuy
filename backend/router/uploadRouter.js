const express = require('express');
const router = express.Router();
const { uploadImage, getImages } = require('../controllers/uploadController');
const upload = require('../middleware/upload');
const protect = require('../middleware/protect');

router.post('/uploadImage', protect, upload.single('image'), uploadImage);
router.get('/getImage', protect, getImages);

module.exports = router;
