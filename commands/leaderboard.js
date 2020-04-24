const fs = require('fs');
const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
  let para = JSON.parse(fs.readFileSync("./storage/para.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("Sıralama")
    .setColor("RANDOM")
    .setFooter("Sayfa 1/3")
  let embed2 = new Discord.RichEmbed()
    .setTitle("Sıralama")
    .setColor("RANDOM")
    .setFooter("Sayfa 2/3")
  let embed3 = new Discord.RichEmbed()
    .setTitle("Sıralama")
    .setColor("RANDOM")
    .setFooter("Sayfa 3/3")
  var i = 0;
  message.guild.members.forEach(member => {
    i++;
    if(i>25 && i<=50) {
      embed2.addField(member.user.username, `Nakit: ${para[member.id + message.guild.id].nakit}, Banka: ${para[member.id + message.guild.id].banka}`)
    }
    else if(i>50 && i<=75) {
      embed3.addField(member.user.username, `Nakit: ${para[member.id + message.guild.id].nakit}, Banka: ${para[member.id + message.guild.id].banka}`)
    }
    else {
    embed.addField(member.user.username, `Nakit: ${para[member.id + message.guild.id].nakit}, Banka: ${para[member.id + message.guild.id].banka}`)
    }
  })
  message.channel.send(embed);
  if(i>25 && i<=50) {
    message.channel.send(embed2)
  }
  if(i>50 && i<=75) {
    message.channel.send(embed2)
    message.channel.send(embed3)
  }
};

module.exports.conf = {
  aliases: ["sıralama"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "leaderboard",
  usage: "leaderboard",
  category: "Kullanıcı"
}