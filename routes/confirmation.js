const express = require('express')
const router = express.Router()
let crypto=require('crypto')
let domain=process.env.domain;
require('dotenv').config();
// middleware that is specific to this router



// define the home page route
router.post('/',express.raw({ type : 'application/json' }) ,async (req, res) => {
  let secret= process.env.Secret;
  let rawBody=req.body;
  let signature=req.headers["x-razorpay-signature"]
  let digest=crypto.createHmac('sha256',secret).update(rawBody).digest('hex')
  if(digest==signature){
    let payload= JSON.parse(rawBody.toString());
    res.status(200).send('ok')
    console.log("success")
    let b=await fetch(`${domain}/bot/paymentdone`,{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        chat_id: payload.payload.payment.entity.notes.telegram_user_id,
        plan: payload.payload.payment.entity.notes.plan,
        secretOwn:process.env.SecretOwn,
      })
    })

  }
  else if(digest!=signature){
    res.status(400).send("signature mismatch");
    console.log("signature mismatch")
  }


})

module.exports = router