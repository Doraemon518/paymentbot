const express = require('express')
const router = express.Router()
require('dotenv').config();
let razorpay = require('razorpay')
let instance = new razorpay({
    key_id: process.env.Key_Id,
    key_secret: process.env.Key_Secret,
});


router.post('/', async (req, res) => {
    const order = await instance.orders.create({
        amount: 100, // amount in paise (₹500)
        currency: "INR",
        receipt: "receipt#1",
    })
    const paymentLink = await instance.paymentLink.create({
        amount: 100,
        currency: "INR",
        description: "Access to Telegram Group",
        customer: {
            name: "Test User",
            email: "jjde20197@gmail.com",
            contact: "8972614258"
        },
        notify: {
            sms: true,
            email: true
        },
        callback_url: "https://yourdomain.com/payment-callback",
        callback_method: "get"
    });
    console.log(paymentLink)
   
    res.send(paymentLink)
})

module.exports = router