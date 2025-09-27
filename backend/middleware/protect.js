const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith(`Bearer`)){
        return res.status(401).json({ message: "Authorization required" })
    }

    const token = authHeader.split(' ')[1]

    try{
       const decode = jwt.verify(token, process.env.JWT)
       req.user = decode
       next()
    }catch(err){
        res.status(401).json({ message: "Invalid Token" })
    }

} 

module.exports = protect