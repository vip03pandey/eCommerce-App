const express = require('express')
const cors=require('cors')
const app=express()
const dotenv=require('dotenv')
const connectDB=require('./config/db')

app.use(express.json())
app.use(cors())
dotenv.config()
connectDB ()


const PORT=process.env.PORT || 9000

app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})