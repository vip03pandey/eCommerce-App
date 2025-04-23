const express=require('express')
const Cart=require('../models/Cart')
const Product=require('../models/Products')
const {protect}=require('../middleware/authMiddleware')


const router=express.Router()

const getCart=async(userId,guestId)=>{
    if(userId){
        return await Cart.findOne({user:userId  })

    }
    else if(guestId){
        return await Cart.findOne({guestId:guestId})
    }
    return null
}

// adding a product to cart
router.post("/",async(req,res)=>{
    const {productId,quantity,size,color,guestId,userId}=req.body
    try{
        const product=await Product.findById(productId)
        if(!product)return res.status(404).json({message:"Product not found"})

        let cart=await getCart(userId,guestId)
        if(cart){
            // check if product already exists in cart
            const productIndex=cart.products.findIndex(p=>p.productId.toString()===productId && p.size===size && p.color===color)
        
        if(productIndex>-1){
            cart.products[productIndex].quantity+=quantity
        }
        else {
            cart.products.push({
                productId,
                name:product.name,
                image:product.images[0].url,
                price:product.price,
                size,
                color,
                quantity
            })
        }
        // total price
        cart.totalPrice=cart.products.reduce((acc,curr)=>acc+curr.price*curr.quantity,0)
        await cart.save()
        res.status(200).json(cart)
    }
    // when user does not have cart
    else{
        const newCart=new Cart({
            user:userId ? userId:undefined,
            guestId:guestId ? guestId:"guest"+new Date().getTime(),
            products:[{
                productId,
                name:product.name,
                image:product.images[0].url,
                price:product.price,
                size,
                color,
                quantity
            }],
            totalPrice:product.price*quantity
        })
        await newCart.save() 
        return res.status(201).json(newCart)
    }
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports=router