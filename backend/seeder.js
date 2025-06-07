const mongoose = require('mongoose')
const dotenv=require('dotenv')
const Product = require('./models/Products')
const User = require('./models/User')
const products = require('./data/productList')
const Cart=require('./models/Cart')
dotenv.config()

mongoose.connect(process.env.MONGO_URI);

const seedData=async()=>{
    try{
        await Product.deleteMany({})
        await User.deleteMany()
        await Cart.deleteMany({})

        // admin user
        const createdUser=await User.create({
            name:'AdminUser',
            email:'admin@admin.com',
            password:'admin123',
            role:'admin'
        })
        // default userId for each product
        const userId=createdUser._id
        const sampleProducts=products.map((product)=>{
            return {...product,user:userId}
        })
        // inserting products
        await Product.insertMany(sampleProducts)
        console.log('Products inserted successfully')
        process.exit(0)
    }
    catch(err){
        console.log(err.message)
    }
}
seedData()