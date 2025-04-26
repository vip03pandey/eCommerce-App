const express=require('express')
const Subscriber=require('../models/Subscriber')
const {protect}=require('../middleware/authMiddleware')
const router=express.Router()

router.post("/",async(req,res)=>{
    const {email}=req.body
    if(!email){
        return res.status(400).json({message:"email is required"})
    }
    try{
        const subscriber=await Subscriber.findOne({email})
        if(subscriber){
            return res.status(400).json({message:"email already subscribed"})
        }
        const newSubscriber=new Subscriber({
            email:req.body.email
        })
        await newSubscriber.save()
        return res.status(200).json({message:"subscribed successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"})
    }
})

module.exports=router