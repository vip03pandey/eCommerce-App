const express=require('express')
const Order=require('../models/Order')
const {protect,admin}=require('../middleware/authMiddleware')
const router=express.Router()


router.get("/",protect,admin,async(req,res)=>{
    try{
        const orders=await Order.find({}).populate("user","name email")
        if(!orders)return res.status(404).json({message:"orders not found"})
        return res.status(200).json(orders)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"})
    }
})

// updating order status
router.put("/:id",protect,admin,async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id)
        if(!order)return res.status(404).json({message:"order not found"})
        order.status=req.body.status || order.status
        order.isDelivered=req.body.status==="Delivered" ?true : order.isDelivered
        order.DeliveredAt=req.body.status==="Delivered" ? new Date():order.DeliveredAt
        const updatedOrder=await order.save()
        return res.status(200).json({message:"order updated successfully",updatedOrder})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"})
    }
})

// delete order by id
router.delete("/:id",protect,admin,async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id)
        if(!order)return res.status(404).json({message:"order not found"})
        await order.deleteOne()
        return res.status(200).json({message:"order deleted successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"})
    }
})

module.exports=router