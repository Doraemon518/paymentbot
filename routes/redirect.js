const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(express.json())


// define the home page route
router.get('/', (req, res) => {
  if (req.query.razorpay_payment_link_status == "paid") {
      res.send("Payment was Successful. You can go back to telegram.")
  }
  else if(req.query.razorpay_payment_link_status == "failed"){
    res.send("Payment failed. Please try again later.You can exit the page")
  }
  else if(req.query.razorpay_payment_link_status == "cancelled"){
    res.send("The payment was either cancelled by you or the link has expired. You can exit this page and try again")
  }
})
module.exports = router