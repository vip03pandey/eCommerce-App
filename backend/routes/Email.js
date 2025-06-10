const express = require('express')
const router = express.Router()
const transporter=require('../config/nodemailer')
router.post("/", async (req, res) => {
    try {
      console.log("Received body:", req.body); // ✅ This is correct
  
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      const mailOptions = {
        from: "vipul03pandey@gmail.com",
        to: email,
        subject: "Paypal Id and Password",
        text: `Your Paypal Email is ${process.env.PAYPAL_EMAIL} and password is ${process.env.PAYPAL_PASSWORD}`,
      };
  
      await transporter.sendMail(mailOptions);
      res.status(201).json({ message: "mail sent successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
module.exports=router