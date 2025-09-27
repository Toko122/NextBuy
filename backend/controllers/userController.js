const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerUser = async(req, res) => {
      const {name, surname, email, password} = req.body
      try{

        if(!password || password.trim().length < 6){
          return res.status(400).json({ message: 'Password must be more than 6 characters' });
      }

      if(!name || name.trim().length <= 1){
          return res.status(400).json({ message: 'Name must be more than 1 characters' });
      }

      if(!surname || surname.trim().length <= 1){
        return res.status(400).json({ message: 'Surname must be more than 1 characters' });
    }

        const existedUser = await User.findOne({email})
        if(existedUser) return res.status(400).json({message: "user arleady exist"})

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name, surname, email, password:hashedPassword
        })

        res.status(200).json({user})

      }catch(err){
        res.status(500).json({message: 'error register user', error: err.message})
      }
}

exports.loginUser = async(req, res) => {
      const {email, password} = req.body
      try{
         const user = await User.findOne({email})
         if(!user) return res.status(404).json({message: "user doesn't exist"})

         const isMatch = await bcrypt.compare(password, user.password)
         if(!isMatch) return res.status(400).json({message: "invalid password or email"})

        const token = jwt.sign({id: user.id}, process.env.JWT, {expiresIn: '2d'})

        res.status(200).json({message: 'login succsessuflly', user, token})

      }catch(err){
        res.status(500).json({message: 'error login user', error: err.message})
      }
}