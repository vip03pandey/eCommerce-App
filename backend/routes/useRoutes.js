const express=require('express')
const User=require('../models/User')
const jwt=require('jsonwebtoken')
const {protect}=require('../middleware/authMiddleware')
const router=express.Router()

router.post('/register',async(req,res)=>{
    const {name,email,password}=req.body
    try{
       let user=await User.findOne({email});
       if(user)return res.status(400).send("User already exists")
       user=new User({name,email,password})
       await user.save()
       const payload={user: {id:user._id,role:user.role}};
       jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'},(err,token)=>{
           if(err)return res.status(500).send(err)
           res.status(201).json({user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        },token
        })
       }
    );
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

// login route
router.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        let user=await User.findOne({email})
        if(!user)return res.status(400).json("User not found")
        const isMatch=await user.matchPassword(password)
        if(!isMatch)return res.status(400).json("Invalid Credentials")
        const payload={user: {id:user._id,role:user.role}};
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'},(err,token)=>{
            if(err)return res.status(500).send(err)
            res.json({user:{
             _id:user._id,
             name:user.name,
             email:user.email,
             role:user.role
         },token
         })
        }
     );
        
    }
    catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})


// user profile request
// router.get('/profile')
router.get('/profile',protect,async(req,res)=>{
    res.json(req.user)
})


module.exports=router