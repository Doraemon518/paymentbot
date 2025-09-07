const express = require('express')

const app = express()
const port = 3000
let payment=require('./routes/payment.js')
let bot=require('./routes/bot.js')
app.use('/payment',payment)
app.use('/bot',bot)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


