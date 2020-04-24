const {bot} = require('../server');
const Discord = require('discord.js');
const fs = require('fs');
const ayarlar = require('../ayarlar.json');
bot.on('guildMemberAdd', member => {
  let sınır = member.guild.channels.find('id', ayarlar.channels.sınır);
  let para = JSON.parse(fs.readFileSync("./storage/para.json", "utf8"));
  sınır.send('**<@' + member.user.id + '>** ülkemize giriş yaptı!🎉🎉🎉')
  member.addRole(ayarlar.roles.kayıt)
  const giris = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('🎉Hoşgeldin!🎉')
    .setTimestamp()
    .addField("😉Merhaba😉", `<@${member.user.id}>! Seninle birlikte ${member.guild.memberCount} kişiyiz.`, true)
    .addField("👫Vatandaşlık Almak👫", "Vatandaş Olabilmek için Kayıt Olman Gerekiyor!", true)
    .addField('👥Aile Ortamı gibi👥', "Kendini Aile Ortamında Hissedebilirsin, Buradaki Oyuncular Çok Sıcakkanlıdır.", true)
  member.send(giris)
  para[member.id + member.guild.id] = {
    banka: 15000,
    nakit: 0
  }
  fs.writeFile("./storage/para.json", JSON.stringify(para), (err) => {
    if(err) console.log(err);
  })  
})