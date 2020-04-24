const fs = require('fs');
module.exports.run = async (bot, message, args) => {
  let para = JSON.parse(fs.readFileSync("./storage/para.json", "utf8"));
  message.channel.send('Emin misin?(Evet veya Hayır de)')
  const filter = m => m.author.id === message.author.id;
  message.channel.awaitMessages(filter, {
    max: 1
  })
  .then((collected) => {
    let icerik = collected.first().content.toLowerCase();
    if(icerik === "evet") {
      message.guild.members.forEach(user => {
        para[user.id + message.guild.id] = {
          banka: 1500,
          nakit: 0
        }
      })
      fs.writeFile("./storage/para.json", JSON.stringify(para), (err) => {
        if(err) console.log(err);
      })
      message.channel.send('Sıfırlandı!')
    } else return message.reply('İptal edildi!');
  })
};

module.exports.conf = {
  aliases: [],
  enabled: 'no',
  guild: true
}

module.exports.help = {
  name: "parasıfırla",
  usage: "parasıfırla",
  category: "Yetkili"
}