const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async (bot, message, args) => {
  // let user = message.mentions.users.first() || message.author;
  // let embed = new Discord.RichEmbed()
  //   .setAuthor(user.username, user.avatarURL)
  //   .setTimestamp()
  //   .setFooter('Sayfa 1/1')
  // fs.readdir("./itemsInventory/", (err, files) => {
  //   if(err) console.error(err);
  //   let item = files.filter(f => f.split(".").pop() === "json");
  //   item.forEach(i => {
  //     let f = JSON.parse(fs.readFileSync("./itemsInventory/"+i, "utf8"));
  //     if(!f[user.id]) {
  //       f[user.id] = 0;
  //       fs.writeFile(`./itemsInventory/${i}`, JSON.stringify(f), (err) => {
  //         if(err) console.error(err);
  //       })
  //     } else {
  //       if(f[user.id] = 0) {
  //         embed.addField("deneme", "deneme");
  //       }
  //     }
  //   })
  // })
  // message.channel.send(embed)
};

module.exports.conf = {
  aliases: ["inventory"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "envanter",
  usage: "envanter [kişi]",
  category: "Kullanıcı"
}