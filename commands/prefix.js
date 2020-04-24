const fs = require('fs');
const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
  
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply('Bunu yapmaya yetkin yok!');
  
  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
  
  prefixes[message.guild.id] = {
    prefixes: args[0]
  };
  
  fs.writeFile("./storage/prefixes.json", JSON.stringify(prefixes), (err) => {
    if(err) console.log(err)
  });
  
  let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle("Prefix ayarlandı!")
    .setDescription(`Prefix, **${args[0]}** a ayarlandı.`)
  message.channel.send(embed);
};

module.exports.conf = {
  aliases: ["önek"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "prefix",
  usage: "prefix <prefix>",
  category: "Yetkili"
}