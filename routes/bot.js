const express = require('express')
const router = express.Router()
let TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
Tele_token = process.env.bot_token;
let bot = new TelegramBot(Tele_token)
router.use(express.json())
async function main() {
  let webHookUrl = `${process.env.domain}/bot`
  await bot.setWebHook(webHookUrl)
}
main()
router.post('/', (req, res) => {
  res.sendStatus(200)
  bot.processUpdate(req.body);
  console.log(req.body)

})
bot.onText(/\/start/, async (msg) => {
  try {
    const options = {

      reply_markup: {
        inline_keyboard: [
          [{ text: '99/month', callback_data: '99' }],
          [{ text: '499/month', callback_data: '499' }],


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
  
  let data = {
    chat_id: callback.message.chat.id,
    amount: callback.data

  }
  let a = await fetch(`${process.env.domain}/payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

})





module.exports = router