const fs = require('fs');
const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD") || !message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bunun için yetkiniz yok!');
  let isim = args.slice(0).join(" ");
  if(!isim) return message.reply('Lütfen eşyanın ismini giriniz\nKullanım: prefix + ürünekle <isim>')
  fs.unlink(`./items/${isim.toLowerCase()}.json`, (err) => {
    if(err) {
      message.channel.send("Böyle bir ürün bulunamadı!");
      console.error(err);
    }
  })
  fs.unlink(`./items/${isim.toLowerCase()}.json`, (err) => {
    if(err) console.error(err);
  })
  fs.unlink(`./itemsInventory/${isim.toLowerCase()}.json`, (err) => {
    if(err) console.error(err);
  })
  console.log(`${isim} adlı ürün silindi!`);
  message.channel.send(`**${isim}** adlı ürün silindi!`);
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true
};

module.exports.help = {
  name: "ürünsil",
  usage: "ürünsil <isim>",
  category: "Yetkili"
}