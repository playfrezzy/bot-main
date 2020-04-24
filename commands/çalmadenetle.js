const fs = require('fs');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const ms = require('ms');
module.exports.run = async (bot, message, args) => {
  let çal = JSON.parse(fs.readFileSync("./storage/çal.json"))
  message.guild.members.forEach(kisi => {
    if(!çal[kisi.id + message.guild.id]) {
      çal[kisi.id + message.guild.id] = {
        süre: "bitti"
      }
    }
  })
  fs.writeFile("./storage/çal.json", JSON.stringify(çal), (err) => {
    if(err) console.log(err);
  })
  message.channel.send('Denetlendi!')
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "çalmadenetle",
  usage: "çalmadenetle",
  category: "Yetkili"
}