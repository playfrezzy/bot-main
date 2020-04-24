const Discord = require('discord.js');
const cevaplar = [
    "Evet",
    "Hayır",
    "Belki",
    "Olabilir",
    "Daha sonra tekrar sor",
    "İmkansız"
];

module.exports.run = function(bot, message, args) {
    var soru = args.slice(0).join(' ');

    var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];

    if(!soru) return message.reply('Bir soru belirt. **Doğru Kullanım**: ?8ball <soru>')
    else message.channel.send(cevap)

};  

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: false
}

module.exports.help = {
  name: '8ball', 
  usage: '8ball <soru>',
  category: "Eğlence"
};