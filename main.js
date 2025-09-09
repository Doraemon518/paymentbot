const express = require('express')

const app = express()
const port = process.env.PORT||3000
let payment=require('./routes/payment.js')
let bot=require('./routes/bot.js')
let confirmation=require('./routes/confirmation.js')
let redirect=require('./routes/redirect.js')
app.use('/payment',payment)
app.use('/bot',bot)
app.use('/confirmation',confirmation)
app.use('/redirect',redirect)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


