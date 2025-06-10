// nodemailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // false for STARTTLS
  auth: {
    user: process.env.NODEMAILER,
    pass: process.env.NODEMAILER_PASS,
  },
});

module.exports=transporter;
