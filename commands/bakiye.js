const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async (bot, message, args) => {
  let user = message.mentions.users.first() || message.author;
  let para = JSON.parse(fs.readFileSync("./storage/para.json", "utf8"));
  let birim = JSON.parse(fs.readFileSync("./storage/birim.json", "utf8"));
  if(!para[user.id + message.guild.id]) {
    para[user.id + message.guild.id] = {
      banka: 1500,
      nakit: 0
    }
  }
  fs.writeFile("./storage/para.json", JSON.stringify(para), (err) => {
    if(err) console.log(err);
  })  
  let embed = new Discord.RichEmbed()
      .setTitle('Banka')
      .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .addField('Hesap Sahibi', user.username)
      .addField('Nakit Para', `${para[user.id + message.guild.id].nakit} ${birim[message.guild.id].birim}`, true)
      .addField('Bankadaki Para', `${para[user.id + message.guild.id].banka} ${birim[message.guild.id].birim}`, true)
  message.channel.send(embed) 
};

module.exports.conf = {
  aliases: ["param", "para"],
  enabled: 'no',
  guild: true
}

module.exports.help = {
  name: "bakiye",
  usage: "bakiye [kişi]",
  category: "Kullanıcı"
}