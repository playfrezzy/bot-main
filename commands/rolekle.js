const ayarlar = require('../ayarlar.json');
const Discord = require('discord.js');
module.exports.run = async (bot, message, args, prefix, msg) => {
  if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('Yetkin yok!');
  
  let isim = args.join(" ").trim();
  let renk = "RANDOM"
  
  message.guild.createRole({
    name: isim,
    color: renk,
  })
    .then(role => message.channel.send(`Yeni rol oluşturuldu: İsim: "${role.name}", Renk: "${role.color}"`))
    .catch(console.error)
  
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "rolekle",
  usage: "rolekle <ad> [renk(İng. Büyük Harf)]",
  category: "Yetkili"
}