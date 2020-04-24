const fs = require("fs");
const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
  let para = JSON.parse(fs.readFileSync("./storage/para.json", "utf8"));
  let prefix = prefixes[message.guild.id].prefixes;
  let esya = args.slice(0).join(" ");
  if (!esya) {
    return message.reply(`Lütfen bir eşya adı giriniz!\nKullanım: ${prefix}al <eşya>`);
  } else {
    let item = JSON.parse(fs.readFileSync(`./items/${esya.toLowerCase()}.json`, "utf8"));
    if(para[message.author.id + message.guild.id].nakit < item.fiyat) return message.reply('Bu eşyayı alacak kadar nakit paran yok!');
    para[message.author.id + message.guild.id].nakit -= item.fiyat;
    fs.writeFile("./storage/para.json", JSON.stringify(para), (err) => {
      if(err) console.log(err);
    })
    let embed = new Discord.RichEmbed()
      .setTitle(esya)
      .setDescription(`**${esya}** adlı eşyayı aldınız!`)
      .setColor('RANDOM')
      .addField('Ad', esya, true)
      .addField('Fiyat', item.fiyat, true)
      .addField('Açıklama', item.aciklama, true)
    
    // let i = JSON.parse(fs.readFileSync(`./itemsInventory/${esya.toLowerCase()}.json`, "utf8"));
    // i[message.author.id] += 1;
    // fs.writeFile(`./itemsInventory/${esya.toLowerCase()}.json`, JSON.stringify(i), (err) => {
    //   if(err) console.log(err);
    // })
    if(item.rol != "Yok") {
      message.member.addRole(item.rol)
    }
    if(item.tepki != "Yok") {
      message.reply(item.tepki)
    }
    message.channel.send(embed)
  }
};

module.exports.conf = {
  aliases: ["satınal", "buy", "ürünal"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "al",
  usage: "al <eşya>",
  category: "Kullanıcı"
};
