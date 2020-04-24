const ayarlar = require('../ayarlar.json');
const Discord = require('discord.js');
exports.run = async (bot, message, args , prefix) => {
  let hedef = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let sebep = args.slice(1).join(' ');
  let logs = message.guild.channels.find('name', ayarlar.channels.logs);
  
  const kick = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(hedef.user.avatarURL)
    .setTitle('Kicklenme')
    .addField('Kicklenen Kişi: ', `${hedef.user.username}, IDsi: ${hedef.user.id}`)
    .addField('Kickleyen Kişi: ', `${message.author.username}, IDsi: ${message.author.id}`)
    .addField('Kicklendiği Zamanı: ', message.createdAt)
    .addField('Kicklendiği Kanal: ', message.channel)
    .addField('Kicklenme Sebebi: ', sebep)
    .setFooter('Kicklenen Kişinin Bilgileri', hedef.user.displayAvatarURL)
  
  if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('Yetkin Yok!');
  if (!hedef) return message.reply('Lütfen birini etiketle!\nKullanım: h!kick <üye> <sebep>');
  if (!sebep) return message.reply('Lütfen sebep belirt!\nKullanım: h!kick <üye> <sebep>');
  if (!logs) return message.reply(`Lütfen ${ayarlar.logsChannel} adlı bir kanal oluşturunuz!`);
  
  message.channel.send(`**${hedef.user.username}**, **${message.author}** tarafından **${sebep}** sebebiyle kicklendi!`);
  hedef.kick(sebep);
  logs.send(kick);
};

module.exports.conf = {
  aliases: ['kick'],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "at",
  usage: "at <üye> <sebep>",
  category: "Yetkili"
};