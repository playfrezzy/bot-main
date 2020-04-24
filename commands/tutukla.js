const ayarlar = require('../ayarlar.json');
module.exports.run = (bot, message, args) => {
  let kisi = message.mentions.members.first();
  let kisi2 = message.author
  if (!message.member.roles.has(ayarlar.roles.polis))  return message.reply("Bir kişiyi tutuklamanız için polis olmanız gerekmektedir.");
  if (!kisi) return message.reply('Lütfen bir kişi belirtiniz!\nKullanım: h!tutukla <@kisi>');
  if (kisi.roles.has(ayarlar.roles.yapayzeka)) return message.reply('Botu tutuklayamazsınız!');
  if (kisi.roles.has(ayarlar.roles.suclu)) return message.reply('Kişi zaten tutuklu!');
  if (kisi === kisi2) return message.reply('Kendini tutuklayamazsın!')
  kisi.addRole(ayarlar.roles.suclu)
  message.channel.send(`${kisi}, ${kisi2} tarafından tutuklandınız!`)
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "tutukla",
  usage: "tutukla <üye>",
  category: "Özel"
}