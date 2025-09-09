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
  try {
    console.log(req.body);

    const paymentLink = await instance.paymentLink.create({
      amount: req.body.amount * 100,
      currency: "INR",
      description: "Access to Telegram Group",
      customer: {
        name: "Test User",
        email: "nomail@gmail.com",
        contact: "7428723247"
      },
      
      notes: {
        telegram_user_id: req.body.chat_id,
        plan: req.body.amount
      },
      notify: {
        sms: false,
        email: false
      },
      callback_url: `${process.env.domain}/redirect`,
      callback_method: "get",
      expire_by: Math.floor(Date.now() / 1000) + 30 * 60
    });

    
    res.json(paymentLink);

  } catch (err) {
    console.error("❌ Error creating payment link:", err);
    res.status(500).json({ error: "Failed to create payment link" });
  }
})


module.exports = router