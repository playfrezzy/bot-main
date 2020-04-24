
const Discord = require('discord.js');
module.exports.run = async (client, message, args, prefix) => {
  let sayı = args[0];
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Yetkin Yok!");
  if (!sayı) return message.channel.send("Silinecek mesajın miktarını yaz!");
  message.delete()
  message.channel.bulkDelete(sayı).then(() => {
    message.channel.send(`${sayı} tane mesaj silindi!`)  })
};

module.exports.conf = {
  aliases: ["sil", "delete", "purge"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "temizle",
  usage: "temizle <adet>",
  category: "Yetkili"
}