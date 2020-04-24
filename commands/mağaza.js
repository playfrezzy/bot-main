const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async (bot, message, args) => {
  fs.readdir("./items/", (err, files) => {
    if (err) console.error(err);
    let birim = JSON.parse(fs.readFileSync("./storage/birim.json", "utf8"));
    let jfiles = files.filter(f => f.split(".").pop() === "json");
    let magaza = new Discord.RichEmbed()
      .setTitle('Mağaza')
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
    jfiles.forEach((f, i) => {
      let esya = JSON.parse(fs.readFileSync(`./items/${f}`));
      magaza.addField(`${esya.ad}`, `Fiyat: ${esya.fiyat} ${birim[message.guild.id].birim} - ${esya.aciklama}`)
    });
    message.channel.send(magaza)
  });
};

module.exports.conf = {
  aliases: ["market", "shop"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "mağaza",
  usage: "mağaza",
  category: "Kullanıcı"
}