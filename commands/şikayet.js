const ayarlar = require('../ayarlar.json');
const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
  let hedef = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let sebep = args.slice(1).join(' ');
  let sikayetler = message.guild.channels.find('id', ayarlar.channels.sikayet);
  
  if (!hedef) return message.reply('Lütfen birini etiketle!\nKullanım: h!şikayet <@üye> <sebep>');
  if (!sebep) return message.reply('Lütfen bir sebep belirt!\nKullanım: h!şikayet <@üye> <sebep>');
  if (hedef.id === message.author.id) return message.reply('Kendini şikayet edemezsin! :smile:');
  if (hedef.roles.has(ayarlar.roles.yapayzeka)) return message.reply('Botları şikayet edemezsin! :smile:');
  
  const sikayet = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(hedef.user.avatarURL)
    .addField('Şikayet Edilen Kişi:', `${hedef.user.username} IDsi: ${hedef.user.id}`)
    .addField('Şikayet Eden Kişi:', `${message.author.username} IDsi: ${message.author.id}`)
    .addField('Şikayet Edilen Zaman:', message.createdAt)
    .addField('Şikayet Edilme Sebebi:', sebep)
    .setFooter('Şikayet Edilen Kişinin Bilgileri', hedef.user.displayAvatarURL)
  
  sikayetler.send(sikayet);
  message.reply(' :white_check_mark: Şikayetin İletildi!');
};

module.exports.conf = {
  aliases: ["raporla", "report"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "şikayet",
  usage: "şikayet <üye> <sebep>",
  category: "Kullanıcı"
}