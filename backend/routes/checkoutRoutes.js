const express=require('express')
const Checkout = require('../models/Checkout')
const Cart=require("../models/Cart");
const Order=require("../models/Order");
const Product=require("../models/Products");

const {protect}=require("../middleware/authMiddleware");
const router=express.Router();

// checkout route
router.post('/',protect,async(req,res)=>{
    const {checkoutItems,shippingAddress,paymentMethod,totalPrice}=req.body;
    if(!checkoutItems || !shippingAddress || !paymentMethod || !totalPrice){
        return res.status(400).json({message:"no items in checkout"})
    }
    try{
        const newCheckout=await Checkout.create({
            user:req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus:"pending",
            isPaid:false
        })
        console.log(newCheckout)
        res.status(201).json(newCheckout)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"})
    }
})


// updating checout to mark as paid after payment
router.put("/:id/pay", protect, async (req, res) => {
    const { id } = req.params;
    const { paymentStatus, paymentDetails } = req.body; // ✅ FIX

    try {
        const checkout = await Checkout.findById(id);
        if (!checkout) return res.status(404).json({ message: "checkout not found" });

        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = new Date();
            await checkout.save();
            return res.status(200).json(checkout);
        } else {
            res.status(200).json({ message: "Invalid Payment Status" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server error" });
    }
});


// finalizing checkout
router.post("/:id/finalize",protect,async(req,res)=>{
    try{
        const checkout=await Checkout.findById(req.params.id);
        if(!checkout)return res.status(404).json({message:"checkout not found"})
            if(checkout.isPaid &&  !checkout.isFinalized){
                const finalOrder=await Order.create({
                    user:checkout.user,
                    orderItems:checkout.checkoutItems,
                    totalPrice:checkout.totalPrice,
                    shippingAddress:checkout.shippingAddress,
                    paymentMethod: checkout.paymentMethod,
                    totalPrice:checkout.totalPrice,
                    isPaid:true,
                    paidAt:checkout.paidAt,
                    isDelivered:false,
                    paymentStatus:"paid",
                    paymentDetails:checkout.paymentDetails
                })
                // 
                checkout.isFinalized=true
                checkout.finalizedAt=Date.now()
                await checkout.save()

                await Cart.findOneAndDelete({user:checkout.user})
                return res.status(201).json(finalOrder)
            }
            else if(checkout.isFinalized){
                res.status(400).json({message:"checkout already finalized"})
            }
            else{
                res.status(400).json({message:"checkout not paid"})
            }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"})
    }
})

module.exports=router