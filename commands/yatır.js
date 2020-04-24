const fs = require('fs');
module.exports.run = async (bot, message, args) => {
  let para = JSON.parse(fs.readFileSync("./storage/para.json"));
  let birim = JSON.parse(fs.readFileSync("./storage/birim.json"));
  let miktar = parseInt(args.join(' '));
  if(miktar > para[message.author.id + message.guild.id].nakit) return message.reply('O kadar nakit paran yok!');
  para[message.author.id + message.guild.id].banka += miktar;
  para[message.author.id + message.guild.id].nakit -= miktar;
  message.reply(miktar + " " + birim[message.guild.id].birim + ' yi bankaya yatırdın!')
  fs.writeFile("./storage/para.json", JSON.stringify(para), (err) => {
    if(err) console.log(err);
  })
};

module.exports.conf = {
  aliases: ["deposit"],
  enabled: 'no',
  guild: true
}

module.exports.help = {
  name: "yatır",
  usage: "yatır <miktar>",
  category: "Kullanıcı"
}