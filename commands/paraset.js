const Discord = require('discord.js');
const fs = require('fs');
const ayarlar = require('../ayarlar.json');
module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) return;
  let birim = JSON.parse(fs.readFileSync("./storage/birim.json", "utf8"))
  let para = JSON.parse(fs.readFileSync("./storage/para.json", "utf8"));
  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
  let prefix = prefixes[message.guild.id].prefixes;
  let kisi = message.mentions.members.first();
  let miktar = parseInt(args[0]);
  if(!miktar) return message.reply(`Lütfen miktarı belirt!\nKullanım: ${prefix}paraset <kişi> <miktar>`);
  para[kisi.id + message.guild.id] = {
    banka: miktar,
    nakit: para[kisi.id + message.guild.id].nakit
  }
  fs.writeFile("./storage/para.json", JSON.stringify(para), (err) => {
    if(err) console.log(err);
  })
  message.channel.send("Para eşitlenmiştir!");
};

module.exports.conf = {
  aliases: ["paraeşitle", "paraayarla"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "paraset",
  usage: "paraset <kişi> <miktar>",
  category: "Yetkili"
}