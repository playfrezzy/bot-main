const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');
module.exports.run = async (bot, message, args , prefix) => {
  let hedef = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let sebep = args.slice(1).join(' ');
  let logs = message.guild.channels.find('name', ayarlar.channels.logs);
  
  const ban = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(hedef.user.avatarURL)
    .setTitle('Banlanma')
    .addField('Banlanan Kişi: ', `${hedef.user.username}, IDsi: ${hedef.user.id}`)
    .addField('Banlayan Kişi: ', `${message.author.username}, IDsi: ${message.author.id}`)
    .addField('Banladığı Zamanı: ', message.createdAt)
    .addField('Banlandığı Kanal: ', message.channel)
    .addField('Banlanma Sebebi: ', sebep)
    .setFooter('Banlanan Kişinin Bilgileri', hedef.user.displayAvatarURL)
  
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('Yetkin Yok!') 
  if (!hedef) return message.reply('Lütfen birini etiketle!\nKullanım: h!ban <üye> <sebep>');
  if (!sebep) return message.reply('Lütfen sebep belirt!\nKullanım: h!ban <üye> <sebep>');
  if (!logs) return message.reply(`Lütfen ${ayarlar.channels.logs} adlı bir kanal oluşturunuz!`);
  
  hedef.ban(sebep);
  logs.send(ban);
  message.channel.send(`**${hedef.user.username}**, **${message.author}** tarafından **${sebep}** sebebiyle banlandı!`);
};

module.exports.conf = {
  aliases: ["ban"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "yasakla",
  usage: "yasakla <üye> <sebep>",
  category: "Yetkili"
};