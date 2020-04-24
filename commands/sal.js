const ayarlar = require('../ayarlar.json');
module.exports.run = (bot, message, args) => {
  let kisi = message.mentions.members.first();
  let kisi2 = message.author
  if (!message.member.roles.has(ayarlar.roles.polis))  return message.reply("Bir kişiyi salmanız için polis olmanız gerekmektedir.");
  if (!kisi) return message.reply('Lütfen bir kişi belirtiniz!\nKullanım: h!sal <@kisi>');
  if (kisi.roles.has(ayarlar.roles.yapayzeka)) return message.reply('Botu salamazsın!');
  if (!kisi.roles.has(ayarlar.roles.suclu)) return message.reply('Kişi tutuklu değil!');
  if (kisi === kisi2) return message.reply('Kendini salamazsın!')
  kisi.removeRole(ayarlar.roles.suclu)
  message.channel.send(`${kisi}, ${kisi2} tarafından salındınız!`)
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "sal",
  usage: "sal <üye>",
  category: "Özel"
}