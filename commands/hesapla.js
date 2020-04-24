const Discord = require('discord.js');
const math = require('math-expression-evaluator');
const fs = require('fs');
let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
module.exports.run = async (bot, message, args) => {
  let prefix = prefixes[message.guild.id].prefixes.toLowerCase();
    var soru = args.slice(0).join(' ');
    
    if(!soru) return message.reply(`Lütfen işlemi giriniz.\nKullanım: ${prefix}hesapla <işlem>`)
    else { let cevap;
        try {
            cevap = math.eval(soru)
        } catch(err) {
            message.channel.send('Hatalı işlem: **' + err)
        }

        const embed = new Discord.RichEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL)
          .addField('Soru', soru)
          .addField('Cevap', cevap)
          .setColor('RANDOM')

        message.channel.send(embed)
    }


};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: false
}

module.exports.help = {
  name: 'hesapla', 
  usage: 'hesapla <işlem>',
  category: "Eğlence"
}