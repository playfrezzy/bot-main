const Discord = require("discord.js");
const fs = require("fs");
const ayarlar = require("../ayarlar.json");
module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD") || !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.reply("Bunun için yetkiniz yok!");
  let birim = JSON.parse(fs.readFileSync("./storage/birim.json", "utf8"));
  let para = JSON.parse(fs.readFileSync("./storage/para.json", "utf8"));
  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
  let prefix = prefixes[message.guild.id].prefixes;
  let kisi = message.mentions.members.first();
  let miktar = parseInt(args[0]);
  if (!kisi) {
    let miktar = parseInt(args[0]);
    let logs = message.guild.channels.find("name", ayarlar.channels.logs);
    let embed = new Discord.RichEmbed()
      .setTitle("Para Ekleme")
      .setColor(
        message.member.displayHexColor === "#000000"
          ? "#ffffff"
          : message.member.displayHexColor
      )
      .setTimestamp()
      .addField("Para Ekleyen", `<@${message.author.id}>`)
      .addField("Para Eklenen", `<@${message.author.id}>`)
      .addField("Eklenen Miktar", `${miktar} ${birim[message.guild.id].birim}`);
    para[message.author.id + message.guild.id].banka += miktar;
    message.channel.send(embed);
    fs.writeFile("./storage/para.json", JSON.stringify(para), err => {
      if (err) console.log(err);
    });
  } else {
    if (!miktar)
      return message.reply(
        `Lütfen miktarı belirt!\nKullanım: ${prefix}paraekle <kişi> <miktar>`
      );
    let logs = message.guild.channels.find("name", ayarlar.channels.logs);
    let embed = new Discord.RichEmbed()
      .setTitle("Para Ekleme")
      .setColor(
        message.member.displayHexColor === "#000000"
          ? "#ffffff"
          : message.member.displayHexColor
      )
      .setTimestamp()
      .addField("Para Ekleyen", `<@${message.author.id}>`)
      .addField("Para Eklenen", kisi)
      .addField("Eklenen Miktar", `${miktar} ${birim[message.guild.id].birim}`);
    para[kisi.id + message.guild.id].banka += miktar;
    message.channel.send(embed);
    fs.writeFile("./storage/para.json", JSON.stringify(para), err => {
      if (err) console.log(err);
    });
  }
};

module.exports.conf = {
  aliases: [],
  enabled: "yes",
  guild: true
};

module.exports.help = {
  name: "paraekle",
  usage: "paraekle <kişi> <miktar>",
  category: "Yetkili"
};
