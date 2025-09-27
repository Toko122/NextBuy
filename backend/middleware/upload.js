const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
    filename: (req, file, cb) => cb(null, Date.now() + ' - ' + file.originalname)
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpg|png|jpeg/
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mime = allowedTypes.test(file.mimetype);
    if(ext && mime){
        cb(null, true)
    }else{
        cb(new Error("only images with extension jpg, png, jpeg are allowed"))
    }
}

const limits = {
     fileSize: 1024 * 1024 * 25
}


module.exports = multer({storage, fileFilter, limits})