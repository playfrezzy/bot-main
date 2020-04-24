const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (bot, message, args) => {
  
  let user = message.author
  let sebep = args.join(" ")
 
  if (!sebep) return message.channel.send(`:x: Bir sebep yazmalısın.`)
 
  message.channel.send(` Artık \`${sebep}\` sebebiyle AFK'sın.`)
  db.set(`afk_${user.id}`, sebep)
};

module.exports.conf = {
  aliases: ["afkol"],
  enabled: 'yes',
  guild: true
}

exports.help = {
  name: 'afk',
  usage: "afk <sebep>",
  category: "Kullanıcı"
}