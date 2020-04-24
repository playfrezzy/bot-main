const fs = require('fs');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const ms = require('ms');
module.exports.run = async (bot, message, args) => {
  let para = JSON.parse(fs.readFileSync("./storage/para.json"))
  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json"))
  let çal = JSON.parse(fs.readFileSync("./storage/çal.json"))
  let kisi = message.mentions.users.first();
  if(!kisi) return message.reply(`Lütfen bir kişi etiketleyiniz!\Kullanım: ${prefixes[message.guild.id].prefixes}paraçal <kişi>`);
  if(!çal[message.author.id + message.guild.id]) {
    çal[message.author.id + message.guild.id] = {
      süre: "bitti"
    }
  }
  fs.writeFile("./storage/çal.json", JSON.stringify(çal), (err) => {
    if(err) console.log(err);
  })
  if(çal[message.author.id + message.guild.id].süre === "bitmedi") return message.reply('Bir daha para çalmak için daha beklemen gerekiyor!');
  if(para[kisi.id + message.guild.id].nakit <= 0) return message.reply('Karşıdaki kişinin nakit parası yok!')
  
  const sans = ["0", "1"]
  
  let miktar = Math.floor((para[kisi.id + message.guild.id].nakit) / ((para[message.author.id + message.guild.id].nakit + para[message.author.id + message.guild.id].banka) / (Math.random() * ((para[message.author.id + message.guild.id].nakit + para[message.author.id + message.guild.id].banka) / 2))));
  çal[message.author.id + message.guild.id] = {
    süre: "bitmedi"
  }
  fs.writeFile("./storage/çal.json", JSON.stringify(çal), (err) => {
    if(err) console.log(err);
  })
  para[message.author.id + message.guild.id].nakit += miktar;
  para[kisi.id + message.guild.id].nakit -= miktar;
  setTimeout(function() {
    çal[message.author.id + message.guild.id] = {
      süre: "bitti"
    }
  }, ms('1m'))
//  let embed = new Discord.RichEmbed()
  //   .setTitle("Para Yatırma")
    //.addField('Yatırılan Miktar', miktar, true)
    //.addField('Yatıran Kişi', `<@${message.author.id}>`, true)
  //channel.send(embed)
  fs.writeFile("./storage/para.json", JSON.stringify(para), (err) => {
    if(err) console.log(err);
  })
  fs.writeFile("./storage/çal.json", JSON.stringify(çal), (err) => {
    if(err) console.log(err);
  })
};

module.exports.conf = {
  aliases: ["paraçal"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "paraçal",
  usage: "paraçal <kişi>",
  category: "Kullanıcı"
}