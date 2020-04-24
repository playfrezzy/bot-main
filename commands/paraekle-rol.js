const Discord = require('discord.js');
const fs = require('fs');
const ayarlar = require('../ayarlar.json');
module.exports.run = async (bot, message, args) => {
  let birim = JSON.parse(fs.readFileSync("./storage/birim.json", "utf8"));
  let para = JSON.parse(fs.readFileSync("./storage/para.json", "utf8"));
  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply('Bunu yapman için yetkin yok!')
  let prefix = prefixes[message.guild.id].prefixes;
  let rol = message.mentions.roles.first();
  let miktar = parseInt(args[0]);
  let logs = message.guild.channel.find('name', ayarlar.channels.logs);
  let embed = new Discord.RichEmbed()
    .setTitle('Para Ekleme')
    .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
    .setTimestamp()
    if(!rol) return message.reply('Lütfen ilk önce birini etiketle!\nKullanım: ' + `${prefix}paraekle-rol <rol> <miktar>`);
    if(!miktar) return message.reply(`Lütfen miktarı belirt!\nKullanım: ${prefix}paraekle-rol <rol> <miktar>`)
      embed.addField('Para Ekleyen', `<@${message.author.id}>`)
      embed.addField('Para Eklenen', rol)
      embed.addField('Eklenen Miktar', `${miktar} ${birim[message.guild.id].birim}`)
  message.guild.members.forEach(kisi => {
    if(kisi.roles.has(rol.id)) {
      para[kisi.id + message.guild.id].banka += miktar;
    }
  })
  message.channel.send(embed)
  logs.send(embed)
  fs.writeFile("./storage/para.json", JSON.stringify(para), (err) => {
    if(err) console.log(err);
  })
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "paraekle-rol",
  usage: "paraekle-rol <rol> <miktar>",
  category: "Yetkili"
}