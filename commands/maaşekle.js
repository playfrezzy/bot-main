const fs = require('fs');
const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply('Bunu yapmak için yetkin yok!');
  let maas = JSON.parse(fs.readFileSync("./storage/maas.json", "utf8"))
  let rol = message.mentions.roles.first();
  let sure = args[1];
  let ucretstr = args[2];
  if(!rol) return message.reply('Lütfen bir rol etiketleyiniz!');
  if(!sure) return message.reply('Lütfen bir süre belirtiniz!');
  if(!ucretstr) return message.reply('Lütfen verilecek maaş ücretini belirtiniz!');
  maas[rol.id] = {
    ad: rol.name,
    ucret: ucretstr,
    sure: sure
  }
  fs.writeFile("./storage/maas.json", JSON.stringify(maas), (err) => {
    if(err) console.log(err);
  })
  let embed = new Discord.RichEmbed()
    .setTitle('Maaş Eklendi!')
    .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
    .addField('Rol', `${rol}`)
    .addField('Süre', `${sure}`, true)
    .addField('Maaş', `${ucretstr}`, true)
  message.channel.send(embed)
};

module.exports.conf = {
  aliases: ["maasekle"],
  enabled: 'yes',
  guild: true
};

module.exports.help = {
  name: "maaşekle",
  usage: "maaşekle <rol> <süre> <ücret>",
  category: "Yetkili"
};