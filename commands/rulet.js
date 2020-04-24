const Discord = require('discord.js');
const ms = require('ms');
const fs = require('fs');
const sayı = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36
];

const yesil = [
  0
];

const kirmizi = [
  1,
  3,
  5,
  7,
  9,
  12,
  14,
  16,
  18,
  19,
  21,
  23,
  25,
  27,
  30,
  32,
  34,
  36
];

const siyah = [
  2,
  4,
  6,
  8,
  10,
  11,
  13,
  15,
  17,
  20,
  22,
  24,
  26,
  28,
  31,
  33,
  35
];

module.exports.run = function(bot, message, args) {
  let para = JSON.parse(fs.readFileSync("./storage/para.json", "utf8"));
  let rulet = JSON.parse(fs.readFileSync("./storage/rulet.json", "utf8"));
  let birim = JSON.parse(fs.readFileSync("./storage/birim.json", "utf8"));
  let miktar = parseInt(args[0])
  let cevap = args.slice(1).join(" ");
  var sonuc = sayı[Math.floor(Math.random() * sayı.length)];
  if(!miktar) return message.reply('Lütfen ne kadar bahis oynayacağını giriniz!');
  if(!cevap) return message.reply('Lütfen neye bahis gireceğinizi giriniz!');
  if(miktar > para[message.author.id + message.guild.id].nakit) return message.reply('Bu kadar nakit paranız yok!');
  
  para[message.author.id + message.guild.id].nakit -= miktar
  
  fs.writeFile("./storage/para.json", JSON.stringify(para), (err) => {
    if(err) console.log(err)
  });
  
  message.reply(`✅**${miktar} ${birim[message.guild.id].birim}** yi **${cevap}** a yatırdın!`)
  
  if(!rulet[message.channel.id].oyun) {
    rulet[message.channel.id] = {
      oyun: "false"
    }
  }
  
  if(rulet[message.channel.id].oyun === "true") {
    let secenek = rulet[message.channel.id].secenek;
    let renk = rulet[message.channel.id].renk;
    if(renk === cevap.toLowerCase()) {
      if(renk === "yeşil") {
        para[message.author.id + message.guild.id].nakit += 36 * miktar
      } else {
        para[message.author.id + message.guild.id].nakit += 2 * miktar
      }
    }
    else if(secenek === parseInt(cevap)) {
      para[message.author.id + message.guild.id].nakit += 36 * miktar
    }
  }
  else {
    let embed = new Discord.RichEmbed()
      .setTitle('Rulet Oyunu')
      .setTimestamp()
      .addField('Sayı', `${sonuc}`, true)

    kirmizi.forEach(k => {
      if(k === sonuc) {
        embed.addField('Renk', 'Kırmızı', true)
        embed.setColor(0xFF0000)
      }
      rulet[message.channel.id] = {
        oyun: "true",
        secenek: sonuc,
        renk: "kırmızı"
      }
    })

    siyah.forEach(s => {
      if(s === sonuc) {
        embed.addField('Renk', 'Siyah', true)
        embed.setColor(0x000000)
      }
      rulet[message.channel.id] = {
        oyun: "true",
        secenek: sonuc,
        renk: "siyah"
      }
    })

    yesil.forEach(y => {
      if(y === sonuc) {
        embed.addField('Renk', 'Yeşil', true)
        embed.setColor(0x00FF00)
      }
      rulet[message.channel.id] = {
        oyun: "true",
        secenek: sonuc,
        renk: "yeşil"
      }
    })

    setTimeout(function() {
      rulet[message.channel.id] = {
        oyun: "false"
      }
      let secenek = rulet[message.channel.id].secenek;
      let renk = rulet[message.channel.id].renk;
      if(renk === cevap.toLowerCase()) {
        if(renk === "yeşil") {
          para[message.author.id + message.guild.id].nakit += 36 * miktar
        } else {
          para[message.author.id + message.guild.id].nakit += 2 * miktar
        }
      }
      else if(secenek === parseInt(cevap)) {
        para[message.author.id + message.guild.id].nakit += 36 * miktar
      }
      message.channel.send(embed)
      message.channel.send('Kazananlara ödüller dağıtıldı!')
    }, ms('5s'))

    fs.writeFile("./storage/para.json", JSON.stringify(para), (err) => {
      if(err) console.log(err)
    });

    fs.writeFile("./storage/rulet.json", JSON.stringify(rulet), (err) => {
      if(err) console.log(err)
    });
  }
};  

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: 'rulet', 
  usage: 'rulet <para> <seçenek>',
  category: "Eğlence"
};