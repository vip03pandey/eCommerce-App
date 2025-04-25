const express = require('express')
const cors=require('cors')
const app=express()
const dotenv=require('dotenv')
const connectDB=require('./config/db')
const userRoutes=require('./routes/useRoutes')
const productsRoutes=require('./routes/productssRoutes')
const cartRoutes=require('./routes/CartRoutes')
const checkoutRoutes=require('./routes/checkoutRoutes')
const orderRoutes=require('./routes/orderRoutes')

app.use(express.json())
app.use(cors())
dotenv.config()
connectDB ()


const PORT=process.env.PORT || 9000

app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.use('/api/users',userRoutes)
app.use('/api/products',productsRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/checkout',checkoutRoutes)
app.use('/api/orders',orderRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})