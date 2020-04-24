const Discord = require('discord.js');
exports.run = async (bot, message, args) => {
  let icerik = args.slice(0).join(' ');
  if(!icerik) return message.reply('Neyi oylatmak istediğinizi de yazınız lütfen!\nKullanım: h!oylama <oylanacak şey>');
  const embed = new Discord.RichEmbed()
    .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
    .setTitle(icerik)
    .addField('Oylama', 'Onaylamak için 👍 ye, reddetmek için 👎 ye basınız!')
  const msg = await message.channel.send(embed)
  msg.react("👍")
      .catch(console.error);
  msg.react("👎")
      .catch(console.error);
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true
}

exports.help = {
  name: "oylama",
  usage: "oylama <konu>",
  category: "Kullanıcı"
}