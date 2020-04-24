const Discord = require('discord.js');
const fs = require('fs');
const ayarlar = require('../ayarlar.json');
module.exports.run = async (bot, message, args) => {
  let birim = JSON.parse(fs.readFileSync("./storage/birim.json", "utf8"))
  let para = JSON.parse(fs.readFileSync("./storage/para.json", "utf8"));
  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
  let prefix = prefixes[message.guild.id].prefixes;
  let kisi = message.mentions.members.first();
  let miktar = parseInt(args[0]);
  if(!kisi) return message.reply('Lütfen ilk önce birini etiketle!\nKullanım: ' + `${prefix}paraver <miktar> <kişi>`);
  if(!miktar) return message.reply(`Lütfen miktarı belirt!\nKullanım: ${prefix}paraver <miktar> <kişi>`)
  if(para[message.author.id + message.guild.id].nakit < miktar) return message.reply('Verecek nakit paran yok!');
  let logs = message.guild.channels.find('name', ayarlar.channels.logs);
    let embed1 = new Discord.RichEmbed()
      .setTitle('Para Verme')
      .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
      .setTimestamp()
      .addField('Eklenen Miktar', miktar)
      .addField('Para Veren', `<@${message.author.id}>`)
      .addField('Para Verilen', kisi)
    para[message.author.id + message.guild.id].nakit -= miktar
    para[kisi.id + message.guild.id].nakit += miktar
  let embed2 = new Discord.RichEmbed()
    .setTitle(`${kisi.user.username} kişisine ${miktar} ${birim[message.guild.id].birim} para verdiniz!`)
    .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
    .addField('Senin Yeni Nakitin', `${para[message.author.id + message.guild.id].nakit}`, true)
    .addField('Onun Yeni Nakiti', `${para[kisi.id + message.guild.id].nakit}`, true)
  message.channel.send(embed2)
  logs.send(embed1) 
  fs.writeFile("./storage/para.json", JSON.stringify(para), (err) => {
    if(err) console.log(err);
  })
};

module.exports.conf = {
  aliases: [],
  enabled: 'no',
  guild: true
}

module.exports.help = {
  name: "paraver",
  usage: "paraver <miktar> <kişi>",
  category: "Kullanıcı"
}