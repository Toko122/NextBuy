const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()

app.use(cors(
    {origin: 'https://next-buy-eight.vercel.app'}
))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


const productsRouter = require('./router/productsRouter')
const userRouter = require('./router/userRouter')
const cartRouter = require('./router/cartRouter')
const uploadRouter = require('./router/uploadRouter')
const emailRouter = require('./router/emailRouter')

app.use('/api/products', productsRouter)
app.use('/api/users', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/image', uploadRouter)
app.use('/api/email', emailRouter)

mongoose.connect(process.env.MONGODB)
.then(() => {
    console.log('mongoose connected well');
    const PORT = 5000
    app.listen(PORT, () => {
        console.log(`server running on ${PORT} port`);
    })
}).catch((err) => console.log(err))