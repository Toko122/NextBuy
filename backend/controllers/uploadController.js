const Image = require('../models/image')

exports.uploadImage = async (req, res) => {
     if(!req.file){
        return res.status(400).json({ message: "image file is required" });
     }
     try{
      const fullUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      const newImage = new Image({
        title: req.body.title,
        imageUrl: fullUrl
    })
    const savedImage = await newImage.save();
        res.status(201).json(savedImage);
     }catch(err){
        if(err.code === "LIMIT_FILE_SIZE"){
            return res.status(400).json({message: "image size must be 25MB max"});
          }
      
          res
            .status(500)
            .json({ message: "Failed to upload image", error: err.message }); 
     }
}

exports.getImages = async (req, res) => {
    try {
      const images = await Image.find().sort({ createdAt: -1 });
      res.status(200).json(images);
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err.message });
    }
  };
