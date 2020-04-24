const fs = require('fs');
const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD") || !message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bunun için yetkiniz yok!');
  let isim = args.slice(0).join(" ");
  if(!isim) return message.reply('Lütfen eşyanın ismini giriniz\nKullanım: prefix + ürünekle <isim>')
  fs.appendFile(`./items/${isim.toLowerCase()}.json`, `{\n  "ad":\"${isim}\","fiyat":0,"aciklama":"Yok","tepki":"Yok","Rol":"Yok" \n}`, (err) => {
    if(err) {
      message.channel.send("Ürün oluşturulamadı!");
      console.error(err);
    }
  })
  fs.appendFile(`./itemsInventory/${isim.toLowerCase()}.json`, "{}", (err) => {
    if(err) console.error(err)
  })
  console.log(`${isim} adlı ürün oluşturuldu!`);
  let embed = new Discord.RichEmbed()
    .setTitle(isim)
    .setColor('RANDOM')
    .addField('İsim', isim, true)
    .addField('Fiyat', "0", true)
    .addField('Açıklama', "Yok", true)
  message.channel.send(embed)
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true
};

module.exports.help = {
  name: "ürünekle",
  usage: "ürünekle <isim>",
  category: "Yetkili"
}