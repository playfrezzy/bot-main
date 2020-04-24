const fs = require('fs');
const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
  let maas = JSON.parse(fs.readFileSync("./storage/maas.json", "utf8"))
  let embed1 = new Discord.RichEmbed()
    .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
    .setTitle('Maaş Listesi')
  let embed2 = new Discord.RichEmbed()
    .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
    .setTitle('Maaş Listesi')
  let rol = message.mentions.roles.first();
  var i;
  if(!rol) {
    i = 0
    message.guild.roles.forEach(rol2 => {
      if(maas[rol2.id]) {
        i++;
        if(i < 25) {
          embed1.addField(`${rol2.name}`, `Süre: ${maas[rol2.id].sure}, Ücret: ${maas[rol2.id].ucret}`)
        }
        else if(i < 50) {
            embed2.addField(`${rol2.name}`, `Süre: ${maas[rol2.id].sure}, Ücret: ${maas[rol2.id].ucret}`)
        }
      }
    })
  }
  else {
    embed1.setTitle(`${rol.name} Rolü için Maaş Bilgileri`)
    embed1.addField(`${rol.name}`, `Maaş: ${maas[rol.id].ucret}`)
  }
  if(i<50) {
    embed1.setFooter("Sayfa 1/2")
    embed2.setFooter("Sayfa 2/2")
    message.channel.send(embed1);
    message.channel.send(embed2);
  } else  message.channel.send(embed1);
};

module.exports.conf = {
  aliases: ["maas"],
  enabled: 'yes',
  guild: true
};

module.exports.help = {
  name: "maaş",
  usage: "maaş",
  category: "Kullanıcı"
};