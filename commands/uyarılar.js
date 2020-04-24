const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');
const ayarlar = require('../ayarlar.json');
let warns = JSON.parse(fs.readFileSync("./storage/warnings.json", "utf8"));
module.exports.run = async (bot, message, args) => {
  let wUser = message.guild.member(message.mentions.users.first());
  if(!wUser) {
    if(!warns[message.author.id]) {
      let warnlvl = 0;
      message.reply(`Uyarı Sayın: ${warnlvl}`)
    } else {
        let warnlvl = warns[message.author.id].warns;
        message.reply(`Uyarı Sayın: ${warnlvl}`)
    }
  } else {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('Başkalarının uyarı sayısını görmek için yetkin yok!');
    if(!warns[wUser.id]) {
      let warnlvl = 0;
      message.channel.send(`<@${wUser.id}>\'nın Uyarı Sayısı: ${warnlvl}`)
    } else {
        let warnlvl = warns[wUser.id].warns;
        message.channel.send(`<@${wUser.id}>\'nın Uyarı Sayısı: ${warnlvl}`)
    }
  }
};

module.exports.conf = {
  aliases: ["uyarılistesi"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "uyarılar",
  usage: "uyarılar <kişi>",
  category: "Yetkili"
}