const fs = require('fs');
const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD") || !message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bunun için yetkiniz yok!');
  
  
  
  // fs.readdir("./items/", (err, files) => {
  //   files.forEach(f => {
  //     fs.unlinkSync("./itemsInventory/"+f);
  //     fs.appendFileSync("./itemsInventory/"+f, "{}");
  //     let item = JSON.parse(fs.readFileSync("./itemsInventory/"+f));
  //     message.guild.members.forEach(member => {
  //           item[member.id] = {
  //             number: 0
  //           }
  //           fs.writeFile("./itemsInventory/"+f, JSON.stringify(item), (err) => {
  //             if(err) console.error(err);
  //           })
  //     })
  //   })
  // })
  
  message.channel.send("Ürünler denetlendi!")
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true
};

module.exports.help = {
  name: "üründenetle",
  usage: "üründenetle",
  category: "Yetkili"
}