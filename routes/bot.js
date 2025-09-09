const express = require('express')
const router = express.Router()
let TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
Tele_token = process.env.bot_token;
let bot = new TelegramBot(Tele_token)
router.use(express.json())
async function main() {
   try {
    let webHookUrl = `${process.env.domain}/bot`;
    await bot.setWebHook(webHookUrl);
    console.log("✅ Webhook set:", webHookUrl);
  } catch (err) {
    console.error("❌ Error setting webhook:", err);
  }
}
main()
router.post('/', (req, res) => {
  res.sendStatus(200)
  bot.processUpdate(req.body);
  
})
bot.onText(/\/start/, async (msg) => {
  try {
    const options = {

      reply_markup: {
        inline_keyboard: [
          [{ text: '99/month', callback_data: '1' }],
          [{ text: '499/month', callback_data: '2' }],


        ],
      },
    };
    OptionMessage = await bot.sendMessage(msg.chat.id, "Choose what you want:", options)
  } catch (err) {
    bot.sendMessage(msg.chat.id, "We rank into some error.Please try again later")
    console.log("error sending first options", err)
  }
});
bot.on('callback_query', async (callback) => {
  
  try {
    let data = {
      chat_id: callback.message.chat.id,
      amount: callback.data
    };

    let a = await fetch(`${process.env.domain}/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    let response=await a.json()


    console.log("✅ Payment request sent:", response.short_url);
    await bot.sendMessage(callback.message.chat.id,`Pay the money here. This link will expire after 15 minutes : ${response.short_url}`)
  } catch (err) {
    console.error("❌ Error in callback_query fetch:", err);
    await bot.sendMessage(callback.message.chat.id, "⚠️ Payment service is unavailable right now. Try again later.");
  }

})

router.post('/paymentdone',async(req,res)=>{
  if(req.body.secretOwn==process.env.SecretOwn){
    res.status(200).send("OK")
    console.log('success2')
    if(Number(req.body.plan)==1){
      bot.sendMessage(req.body.chat_id,`Through this message one time invite link of telegroup will be sent `)
    }
    else if(Number(req.body.plan)==2){
      bot.sendMessage(req.body.chat_id,`Through this message id of mentor will be sent `)
    }
  }
  else if(req.body.secretOwn!=process.env.SecretOwn){
    res.status(400).send("not OK")
    console.log('not success2')
  }

})





module.exports = router