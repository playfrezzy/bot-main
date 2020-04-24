const fs = require("fs");
const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
  let para = JSON.parse(fs.readFileSync("./storage/para.json", "utf8"));
  let envanter = JSON.parse(fs.readFileSync("./storage/envanter.json", "utf8"));
  let prefix = prefixes[message.guild.id].prefixes;
  let esya = args.slice(0).join(" ");
  if (!esya) {
    return message.reply(`Lütfen bir eşya adı giriniz!\nKullanım: ${prefix}al <eşya>`);
  } else {
    let item = JSON.parse(fs.readFileSync(`./storage/envanter.json`, "utf8"));
    let env = item[message.author.id].envanter;
    env.split(',').forEach(en => {
      if(en == esya) {
        env -= `,${en}`
        fs.writeFile("./storage/envanter.json", JSON.stringify(envanter), (err) => {
          if(err) console.log(err);
        });
        message.channel.send(`**${en}** adlı eşya kullanıldı!`)
        return;
      }
    })
    message.channel.send("Böyle bir eşya bulunamadı!")
  }
};

module.exports.conf = {
  aliases: ["use"],
  enabled: 'yes',
  guild: true
};

module.exports.help = {
  name: "kullan",
  usage: "kullan <eşya>",
  category: "Kullanıcı"
};
