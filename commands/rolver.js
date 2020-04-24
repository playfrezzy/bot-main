const ayarlar = require('../ayarlar.json');
const Discord = require('discord.js');
module.exports.run = async (bot, message, args, prefix, msg) => {
  if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('Yetkin yok!');
  
  let logs = message.guild.channels.find('name', ayarlar.channels.logs);
  let user = message.mentions.members.first();
  let roleString = args.slice(1).join(' ');
  let role = message.mentions.roles.first();
  let role2 = message.guild.roles.find('name', roleString);
  
  if(!role) return message.reply('Böyle bir rol bulunamadı!');
    
  if (!role) {
    user.addRole(role2)
    message.channel.send(`Başarıyla **${user}** kişisine **${role2}** rolü verildi!`)
    const embed1 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(user.user.avatarURL)
      .setTitle('Rol Verme')
      .addField('Rol Verilen Kişi: ', `${user.user.username}, IDsi: ${user.user.id}`)
      .addField('Rol Veren Kişi: ', `${message.author.username}, IDsi: ${message.author.id}`)
      .addField('Rol Verilen Zamanı: ', message.createdAt)
      .addField('Rol Verilen Kanal: ', message.channel)
      .addField('Verilen Rol:', `${role2}, IDsi: ${role2.id}`)
      .setFooter('Rol Verilen Kişinin Bilgileri', user.user.displayAvatarURL);
    logs.send(embed1);
  } else {
    user.addRole(role)
    message.channel.send(`Başarıyla **${user}** kişisine **${role}** rolü verildi!`)
    const embed2 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(user.user.avatarURL)
      .setTitle('Rol Verme')
      .addField('Rol Verilen Kişi: ', `<@${user.user.id}>, IDsi: ${user.user.id}`)
      .addField('Rol Veren Kişi: ', `<@${message.author.id}>, IDsi: ${message.author.id}`)
      .addField('Rol Verilen Zamanı: ', message.createdAt)
      .addField('Rol Verilen Kanal: ', `<@${message.channel.id}>, IDsi: ${message.channel.id}`)
      .addField('Verilen Rol:', `${role}, IDsi: ${role.id}`)
      .setFooter('Rol Verilen Kişinin Bilgileri', user.user.displayAvatarURL);
    logs.send
    } 
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "rolver",
  usage: "rolver <üye> <rol>",
  category: "Yetkili"
}