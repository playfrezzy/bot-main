module.exports.run = async (bot, message, args) => {
  let kisi = message.mentions.members.first();
  if(!kisi) return message.reply('Lütfen bir kişi belirtiniz!\nKullanım: öp <kişi>');
  message.channel.send(`${kisi}, seni <@${message.author.id}> öptü!\n💋💋💋`)
};

module.exports.conf = {
  aliases: ["kiss"],
  enabled: 'yes',
  guild: true
};

module.exports.help = {
  name: "öp",
  usage: "öp <kişi>",
  category: "Eğlence"
}