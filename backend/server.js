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
const uploadRoutes=require('./routes/uploadRoutes')
const SubscribeRoutes=require('./routes/SubscribeRoutes')
const adminRoutes=require('./routes/AdminRoutes')
const adminProductRoutes=require('./routes/ProductAdminRoutes')
const adminOrderRoutes=require('./routes/adminOrderRoutes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// const corsOptions = {
//     origin: [
//       'https://e-commerce-app-fxv2.vercel.app',
//       'http://localhost:3000',
//       'http://localhost:3001'
//     ],
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//     optionsSuccessStatus: 200
//   };
  
//   app.use(cors(corsOptions));
  
  // Handle preflight requests
//   app.options('*', cors(corsOptions));
dotenv.config()
connectDB ()
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

const PORT=process.env.PORT || 9000

app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.use('/api/users',userRoutes)
app.use('/api/products',productsRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/checkout',checkoutRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/api/subscribe',SubscribeRoutes)
app.use('/api/admin/users',adminRoutes)
app.use('/api/admin/products',adminProductRoutes)
app.use('/api/admin/orders',adminOrderRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})