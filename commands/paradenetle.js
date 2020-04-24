const fs = require('fs');
module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) return;
  let para = JSON.parse(fs.readFileSync("./storage/para.json", "utf8"));
  message.guild.members.forEach(user => {
    if(!para[user.id + message.guild.id]) {
      para[user.id + message.guild.id] = {
        banka: 1500,
        nakit: 0
      }
    }
    if(para[user.id + message.guild.id].banka === null || para[user.id + message.guild.id].banka === undefined) {
      para[user.id + message.guild.id] = {
        banka: 1500,
        nakit: para[user.id + message.guild.id].nakit
      }
    }
    if(para[user.id + message.guild.id].nakit === null || para[user.id + message.guild.id].nakit === undefined) {
      para[user.id + message.guild.id] = {
        banka: para[user.id + message.guild.id].banka,
        nakit: 0
      }
    }
  })
  fs.writeFile("./storage/para.json", JSON.stringify(para), (err) => {
    if(err) console.log(err);
  })
  message.channel.send('Denetlendi!')
};

module.exports.conf = {
  aliases: [],
  enabled: 'no',
  guild: true
}

module.exports.help = {
  name: "paradenetle",
  usage: "paradenetle",
  category: "Yetkili"
}