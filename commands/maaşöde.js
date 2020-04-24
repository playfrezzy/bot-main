const ms = require('ms');
const fs = require('fs');
const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply('Bunu yapmak için yetkin yok!');
  let maas = JSON.parse(fs.readFileSync("./storage/maas.json", "utf8"))
  let para = JSON.parse(fs.readFileSync("./storage/para.json", "utf8"))
  message.guild.roles.forEach(rol => {
    if(maas[rol.id]) {
      let ücret = parseInt(maas[rol.id].ucret)
      message.guild.members.forEach(user => {
        if(user.roles.has(rol.id)) {
          para[user.id + message.guild.id].banka += ücret;
          setInterval(() => {
              para[user.id + message.guild.id].banka += ücret;
          }, ms(maas[rol.id].sure))
        }
      })
    }
  })
  fs.writeFile("./storage/para.json", JSON.stringify(para), (err) => {
    if(err) console.log(err);
  })
  message.channel.send('Maaşlar Ödenmeye Başladı!')
};

module.exports.conf = {
  aliases: ["maasöde"],
  enabled: 'yes',
  guild: true
};

module.exports.help = {
  name: "maaşöde",
  usage: "maaşöde",
  category: "Yetkili"
};