const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');
const ayarlar = require('../ayarlar.json');
let warns = JSON.parse(fs.readFileSync("./storage/warnings.json", "utf8"));
module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply('Yetkin yok!');
  let reason = args.join(" ").slice(22);
  if(!reason) return message.reply('Lütfen bir sebep belirt!\nKullanım: h!uyarı <kişi> <sebep>');
  let wUser = message.guild.member(message.mentions.users.first());
  if(!wUser) return message.reply('Lütfen birini etiketle!');
  if(wUser.id === message.author.id) return message.reply('Kendini uyaramazsın 😀');
  let logs = message.guild.channels.find('name', ayarlar.channels.logs);
  let uyarı = message.guild.channels.find('id', ayarlar.channels.uyarı);
  let muterole = message.guild.roles.find('id', ayarlar.roles.muted);
  let yz = message.guild.roles.find('id', ayarlar.roles.yapayzeka);
  if(wUser.roles.has(yz)) return message.reply('Botları uyaramazsın 😀');
  
  
  if(!warns[wUser.id]){
    warns[wUser.id] = {
      warns: 0
    };
  };
  
  warns[wUser.id].warns++;
  
  fs.writeFile("./storage/warnings.json", JSON.stringify(warns), (err) => {
    if(err) console.log(err);
  });
  
  let warnEmbed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(wUser.user.avatarURL)
    .setTitle('Uyarma')
    .addField('Uyarılan Kişi: ', `${wUser.user.username}, IDsi: ${wUser.user.id}`)
    .addField('Uyaran Kişi: ', `${message.author.username}, IDsi: ${message.author.id}`)
    .addField('Uyarılma Sayısı: ', warns[wUser.id].warns)
    .addField('Uyarıldığı Zamanı: ', message.createdAt)
    .addField('Uyarıldığı Kanal: ', message.channel)
    .addField('Uyarılma Sebebi: ', reason)
    .setFooter('Uyarılan Kişinin Bilgileri', wUser.user.displayAvatarURL);
  
  message.channel.send(`✅ <@${wUser.id}> uyarıldı!`)
  logs.send(warnEmbed)
  
  if(warns[wUser.id].warns == 3) {
    let mutetime = "15m";
    await(wUser.addRole(muterole.id));
    uyarı.send(`<@${wUser.id}>, 3 kez uyarıldığı için 15 dakikalığına susturuldu.`)
    setTimeout(function(){
      wUser.removeRole(muterole.id)
      uyarı.send(`<@${wUser.id}>\'nın susturulma süresi bitti.`)
    }, ms(mutetime))
  }
  else if(warns[wUser.id].warns == 6) {
    let mutetime = "30m";
    await(wUser.addRole(muterole.id));
    uyarı.send(`<@${wUser.id}>, 6 kez uyarıldığı için 30 dakikalığına susturuldu.`)
    setTimeout(function(){
      wUser.removeRole(muterole.id)
      uyarı.send(`<@${wUser.id}>\'nın susturulma süresi bitti.`)
    }, ms(mutetime))
  }
  else if(warns[wUser.id].warns == 9) {
    message.guild.member(wUser).kick('9 Kez uyarıldığın için atıldın!');
    uyarı.send(`<@${wUser.id}>, 9 kez uyarıldığı için atıldı!`)
  }
  else if(warns[wUser.id].warns == 12) {
    message.guild.member(wUser).ban('12 Kez uyarıldığın için yasaklandın!');
    uyarı.send(`<@${wUser.id}>, 12 kez uyarıldığı için yasaklandı!`)
  }
};

module.exports.conf = {
  aliases: ["warn"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "uyarı",
  usage: "uyarı <kişi>",
  category: "Yetkili"
}