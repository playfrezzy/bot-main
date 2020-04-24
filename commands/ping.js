const Discord = require('discord.js');
const fs = require('fs');
let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
module.exports.run = async (bot, message, args) => {
  let prefix = prefixes[message.guild.id].prefixes;
  const embed = new Discord.RichEmbed()
    .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
    .setTimestamp()
  if(args[0]) {
    if(args[0].toLowerCase() === "bot") {
      embed.addField(`Botun Pingi:`, `${bot.ping} ms`)
      embed.setAuthor(bot.user.username, bot.user.displayAvatarURL)
    } else return message.reply(`Lütfen geçerli bir opsiyon girin!\nKullanım: ${prefix}ping [bot]`);
  } else {
    let ping = Date.now() - message.createdTimestamp;
    embed.addField(`Senin Pingin:`, `${ping} ms`)
    embed.setAuthor(message.author.username, message.author.displayAvatarURL)
  }
  message.channel.send(embed)
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: false
}

module.exports.help = {
  name: "ping",
  usage: "ping [bot]",
  category: "Kullanıcı"
}