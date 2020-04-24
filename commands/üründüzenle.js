const fs = require('fs');
const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD") || !message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bunun için yetkiniz yok!');
  let opsiyon = args.shift();
  let isim = args.join(" ").split(" ")[0].replace(/-/g, " ").toLowerCase();
  let value = args.join(" ").slice(isim.length);
  let item = JSON.parse(fs.readFileSync(`./items/${isim.toLowerCase()}.json`, "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle(isim)
    .setColor('RANDOM')
    .addField('Opsiyon', opsiyon, true)
  
  if(opsiyon == "fiyat" || opsiyon == "price") {
    embed.addField('Eski Değer', item.fiyat, true)
    item = {
      fiyat: parseInt(value),
      ad: item.ad,
      aciklama: item.aciklama,
      rol: item.rol,
      tepki: item.tepki
    }
  }
  else if(opsiyon == "açıklama" || opsiyon == "desc") {
    embed.addField('Eski Değer', item.aciklama, true)
    item = {
      aciklama: value,
      fiyat: item.fiyat,
      ad: item.ad,
      rol: item.rol,
      tepki: item.tepki
    }
  }
  else if(opsiyon == "ad" || opsiyon == "isim" || opsiyon == "name") {
    embed.addField('Eski Değer', item.ad, true)
    item = {
      ad: value,
      fiyat: item.fiyat,
      aciklama: item.aciklama,
      rol: item.rol,
      tepki: item.tepki
    }
  }
  else if(opsiyon == "rol") {
    value = message.mentions.roles.first()
    embed.addField('Eski Değer', item.rol, true)
    item = {
      rol: value.id,
      fiyat: item.fiyat,
      aciklama: item.aciklama,
      ad: item.ad,
      tepki: item.tepki
    }
  }
  else if(opsiyon == "tepki") {
    embed.addField('Eski Değer', item.tepki, true)
    item = {
      rol: item.rol,
      fiyat: item.fiyat,
      aciklama: item.aciklama,
      ad: item.ad,
      tepki: value
    }
  }
  else return message.reply('Lütfen geçerli bir opsiyon giriniz!');
  
  fs.writeFile(`./items/${isim}.json`, JSON.stringify(item), (err) => {
    if(err) console.error(err);
  })
  console.log(`${isim} adlı ürün düzenlendi!`);
  embed.addField('Yeni Değer', value, true)
  message.channel.send(embed)
};

module.exports.conf = {
  aliases: ["ürün-düzenle", "edit-item", "edititem"],
  enabled: 'yes',
  guild: true
};

module.exports.help = {
  name: "üründüzenle",
  usage: "üründüzenle <opsiyon> <isim> <değer>",
  category: "Yetkili"
}