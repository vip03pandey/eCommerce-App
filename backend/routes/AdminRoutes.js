const express=require('express')
const User=require('../models/user')
const {protect,admin}=require('../middleware/authMiddleware')
const router=express.Router()


router.get("/",protect,admin,async(req,res)=>{
    try {
        const users=await User.find({})
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})


// allowing admin to add a new user
router.post("/",protect,admin,async(req,res)=>{
   const {name,email,password,role}=req.body
   try{
    let user=await User.findOne({email})
    if(user){
        return res.status(400).json({message:"email already exists"})
    }
    const newUser=new User({
        name,
        email,
        password,
        role:role || "customer"
    })
    await newUser.save()
    return res.status(200).json({message:"user added successfully"})
   }
   catch(err){
       console.log(err)
       return res.status(500).json({message:"server error"})
   }
})

// change the role of user who are admin
router.put('/:id',protect,admin,async(req,res)=>{
   try {
    const user=await User.findById(req.params.id)
    if(!user)return res.status(404).json({message:"user not found"})
    if(user){
        user.name=req.body.name||user.name
        user.email=req.body.email||user.email
        user.role=req.body.role||user.role
    }
    const updatedUser=await user.save()
    return res.status(200).json({message:"user updated successfully",user:updatedUser})
   } catch (error) {
    
   }
})


// route to delete user
router.delete('/:id',protect,admin,async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user)return res.status(404).json({message:"user not found"})
        await user.deleteOne()
        return res.status(200).json({message:"user deleted successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"})
    }
})


module.exports=router