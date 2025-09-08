const express = require('express')
const router = express.Router()
require('dotenv').config();
let razorpay = require('razorpay')
router.use(express.json())
let instance = new razorpay({
    key_id: process.env.Key_Id,
    key_secret: process.env.Key_Secret,
});


router.post('/', async (req, res) => {
    console.log(req.body);
    const paymentLink = await instance.paymentLink.create({
        amount: 100,
        currency: "INR",
        description: "Access to Telegram Group",
        customer: {
            name: "Test User",
            email: "nomail@gmail.com",
            contact: "9999999999"
        },
        notify: {
            sms: false,
            email: false
        },
        callback_url: "https://yourdomain.com/payment-callback",
        callback_method: "get"
    });
    console.log(paymentLink)
   
    res.send(paymentLink)
})


module.exports = router