const Discord = require('discord.js');
const ms = require('ms');
const cevaplar = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10"
];
module.exports.run = async (bot, message, args) => {
    let soru = args.slice(0).join(' ');

    let cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];

    if(!soru) return message.reply('Bir soru belirt. **Doğru Kullanım**: ?8ball <soru>')
    else {
      const msg = await message.channel.send(`Hmm... 10 üzerinden...`);
      setTimeout(function(){
        msg.edit(cevap)
      }, ms('2s')); 
    }
};  

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: false
};

module.exports.help = {
  name: '10ball', 
  usage: '10ball <soru>',
  category: "Eğlence"
};