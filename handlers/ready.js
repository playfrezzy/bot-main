const {bot} = require('../server');
const ayarlar = require('../ayarlar.json');
const fs = require('fs');
const ms = require('ms');
let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
bot.login(ayarlar.token);
bot.on('ready', async function() {
  console.log(`Bot, ${bot.user.username} ismi ile hazır!`);
  bot.user.setStatus(ayarlar.activity.status);
  let states = [
    `s!yardım`,
    `${bot.users.size} kişi ile birlikte!`,
  ]
  
  setInterval(function() {
    let state = states[Math.floor(Math.random() * states.length)];
    if (ayarlar.activity.mode == 0) {
      bot.user.setActivity(state, {type: 'PLAYING'})
    } else
      if (ayarlar.activity.mode == 2) {
        bot.user.setActivity(state, {type: 'LISTENING'})
      } else
        if (ayarlar.activity.mode == 3) {
          bot.user.setActivity(state, {type: 'WATCHING'})
        } 
  }, 5000)
  let server = bot.guilds.find('id', "690171048045445157");
  let kanal = server.channels.find('id', "692102012917252177");
  setInterval(async () => {
    const message = await kanal.send('Aktiflik için mesaj gönderildi!')
    kanal.send('Zaman: ' + message.createdAt)
  }, ms('10m'))
});