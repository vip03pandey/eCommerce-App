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

// route to increase/decrease quantity
router.put("/",async(req,res)=>{
    const {productId,quantity,size,color,guestId,userId}=req.body
    try{
        let cart=await getCart(userId,guestId);
        if(!cart)return res.status(404).json({message:"Cart Not found"})
        const productIndex=cart.products.findIndex((p)=>p.productId.toString()===productId && p.color===color && p.size===size)
        
        if(productIndex>-1){
            if(quantity>0){
                cart.products[productIndex].quantity=quantity
            }
            else{
                cart.products.splice(productIndex,1)
            }
            cart.totalPrice = cart.products.reduce((sum, p) => sum + (p.price * p.quantity), 0);                        
            await cart.save()
            return res.status(200).json(cart);
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"server error"})
    }
})

// deleting products from cart
router.delete("/",async(req,res)=>{
    const {productId,size,color,guestId,userId}=req.body
    try{

        let cart=await getCart(userId,guestId)
        if(!cart)return res.status(404).json({message:"cart not found"})
        const productIndex=cart.products.findIndex((p)=>p.productId.toString()===productId && p.color===color && p.size===size)
        if(productIndex>-1){
            cart.products.splice(productIndex,1);
            cart.totalPrice = cart.products.reduce((sum, p) => sum + (p.price * p.quantity), 0);  
            await cart.save()
            return res.status(200).json(cart)                      
        }
        else{
            return res.status(404).json({message:"Product Not found"})
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"server error in cart"})
    }
})

// get users cart
router.get("/",async(req,res)=>{
    const {userId,guestId}=req.query
    try{
        const cart=await getCart(userId,guestId)
        if(cart){
           return res.json(cart)
        }
        else{
            res.status(404).json({message:"cart not found"})
        }
    }
    catch(err){
        return res.status(500).json({message:"Server error"})
    }
})

// cart merge
router.post("/merge",protect,async(req,res)=>{
    const {guestId}=req.body;
    try{
        const guestCart=await Cart.findOne({guestId})
        const userCart=await Cart.findOne({user:req.user._id})

        if(guestCart){
            if(guestCart.products.length===0){
                return res.status(400).json({message:"guest cart is empty"})
            }
            if(userCart){
                guestCart.products.forEach((guestItem)=>{
                    const productIndex=userCart.products.findIndex((item)=>
                        item.productId.toString()===guestItem.productId.toString() && 
                    item.size===guestItem.size && item.color===guestItem.color)
                    if(productIndex>-1){
                        userCart.products[productIndex].quantity+=guestItem.quantity
                    }
                    else{
                        userCart.products.push(guestItem)
                    }
                })
                userCart.totalPrice=userCart.products.reduce((acc,item)=>acc + item.price*item.quantity,0)
                await userCart.save();


                try{
                    await Cart.findOneAndDelete({guestId})
                }
                catch(err){
                    console.log("error deleting guest Cart");
                }
                return res.status(200).json(userCart)
            }
            // it no cart exist for user , assigning guest cart to user
            else{
                guestCart.user=req.user._id
                guestCart.guestId=undefined
                await guestCart.save()
                return res.status(200).json(guestCart)
            }

        }
        else{
            if(userCart){
                return res.status(200).json(userCart)
            }
            res.status(404).json({message:"guest cart not found"})
        }
    }
    catch(err){
        return res.status(500).json({message:"server error"})
    }
})

module.exports=router