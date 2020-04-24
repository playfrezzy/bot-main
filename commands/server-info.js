const { RichEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json');
module.exports.run = async (bot, message, args) => {
  let guild = message.guild;
  var serverCreated = guild.createdAt.toString().split(' ');
  var serverH = serverCreated[4];
  const server = new RichEmbed()
    .setTitle(guild.name)
    .setDescription(`${guild.name} Sunucusunun Bilgileri`)
    .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
    .addField('Sunucu Adı:', `**${guild.name}**, IDsi: ${guild.id}`)
    .addField('Sunucu Sahibi:', `**${guild.owner}**, IDsi: ${guild.ownerID}`)
    .addField('Sunucunun Kurulma Zamanı:', `**Tarih:** ${serverCreated[2]} ${serverCreated[1]} ${serverCreated[3]}\n**Saat:** ${serverH[0]}${serverH[1]}:${serverH[3]}${serverH[4]}`)
    .addField('Sunucu Üye Sayısı:', `${guild.memberCount}`)
    .addField('Sunucudaki Rol Sayısı:', `${guild.roles.size}`)
    .addField('Sunucudaki Kanal Sayısı:', `${guild.channels.size}`)
  message.channel.send(server)
};

module.exports.conf = {
  aliases: ["server", "si"],
  enabled: 'yes',
  guild: true
}

exports.help = {
  name: "server-info",
  usage: "server-info",
  category: "Kullanıcı"
}