const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
module.exports.run = async (bot, message, args) => {
  let duyuruchannel = message.guild.channels.find('id', ayarlar.channels.duyuru);
  let opsiyon = args[0].toLowerCase();
  let mesaj = args.slice(1).join(' ');
  let duyuru = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(message.author.username, message.author.displayAvatarURL)
  if(opsiyon === "haber") {
    duyuru.addField(":newspaper:Haber", mesaj)
  }
  else if(opsiyon === "duyuru") {
    duyuru.addField("📢Duyuru", mesaj)
  }
  else if(opsiyon === "açıklama") {
    duyuru.addField("👨Açıklama", mesaj)
  } else return message.reply('Lütfen geçerli bir opsiyon giriniz.');
  duyuruchannel.send(duyuru)
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "duyuru",
  usage: "duyuru <tür(haber, duyuru, açıklama)> <mesaj>",
  category: "Yetkili"
}