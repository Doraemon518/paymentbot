const express = require('express')
const router = express.Router()
let TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
Tele_token=process.env.bot_token;
let bot=new TelegramBot(Tele_token)
router.use(express.json())
async function main(){
    let webHookUrl=`${process.env.domain}/bot`
    await bot.setWebHook(webHookUrl)
}
main()
router.post('/bot',(req,res)=>{
    console.log(req)
})

// define the home page route
router.get('/', (req, res) => {
  console.log(req)
})
// define the about route




module.exports = router