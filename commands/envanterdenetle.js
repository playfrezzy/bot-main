const fs = require('fs');
module.exports.run = async (bot, message, args) => {
  
  fs.writeFile("./storage/envanter.json", JSON.stringify(envanter), (err) => {
    if(err) console.log(err);
  })
  message.channel.send('Denetlendi!')
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "envanterdenetle",
  usage: "envanterdenetle",
  category: "Yetkili"
}