const {bot} = require('../server');
const { RichEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json');
bot.on('messageDelete', message => {
  let logsname = ayarlar.channels.logs;
  if(message.guild.id === '641022127637528606') {
    let logs = message.guild.channels.find('name', logsname);
    const embed = new RichEmbed()
      .setTitle('Mesaj Silindi')
      .setColor(message.member.displayHexColor === '#000000' ? 'ffffff' : message.member.displayHexColor)
      .setTimestamp()
      .addField('**Kullanıcı:**', '<@' + message.author.id + '>')
      .addField('**Kanal:**', '<#' + message.channel.id + '>')
      .addField('**Mesaj:**', message, true)
    logs.send(embed)
  }
})