const Discord = require('discord.js');
module.exports.run = async (bot, message) => {
  const embed = new Discord.RichEmbed()
  let kisi = message.mentions.members.first();
  if(!kisi) {
    embed.setAuthor(message.author.username)
    embed.setImage(message.author.avatarURL)
  } else {
    embed.setAuthor(kisi.username)
    embed.setImage(kisi.avatarURL)
  }
  message.channel.send(embed)
};

module.exports.conf = {
  aliases: ['avatarım'],
  enabled: 'yes',
  guild: false
}

module.exports.help = {
  name: 'avatar', 
  usage: 'avatar',
  category: "Kullanıcı"
};