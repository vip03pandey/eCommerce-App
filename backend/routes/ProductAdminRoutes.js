const express=require('express')
const Product=require('../models/Products')
const {protect,admin}=require('../middleware/authMiddleware')
const router=express.Router()


// get all products
router.get("/",protect,admin,async(req,res)=>{
    try{
        const products=await Product.find({})
        return res.status(200).json(products)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"})
    }
})


module.exports=router