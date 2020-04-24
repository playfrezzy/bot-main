const fs = require('fs');
const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
  let prefix = prefixes[message.guild.id].prefixes;
  
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply('Bunu yapmaya yetkin yok!');
  
  let birim = JSON.parse(fs.readFileSync("./storage/birim.json", "utf8"));
  let br = args.join(' ');
  
  if(!br) {
    message.reply(`Lütfen birimi giriniz!\nKullanım: ${prefix}parabirimi <birim>`)
  }
  
  birim[message.guild.id] = {
    birim: br
  };
  
  fs.writeFile("./storage/birim.json", JSON.stringify(birim), (err) => {
    if(err) console.log(err)
  });
  
  let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle("Para Birimi ayarlandı!")
    .setDescription(`Para Birimi, **${args[0]}** a ayarlandı.`)
  message.channel.send(embed);
};

module.exports.conf = {
  aliases: ["birim"],
  enabled: 'no',
  guild: true
}

module.exports.help = {
  name: "parabirimi",
  usage: "parabirimi <birim>",
  category: "Yetkili"
}