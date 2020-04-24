const ayarlar = require('../ayarlar.json');
const ms = require('ms');
exports.run = async (bot, message, args, cmd) => {
  let person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!person) return message.reply("Böyle bir kişi bulamadık!");
  
  let role2 = message.guild.roles.find('id', ayarlar.roles.muted);
  
  let time = args[1];
  
  if (!time) {
    return message.reply('Lütfen bir zaman belirtin!');
  }
  
  person.addRole(role2);
  message.channel.send(`<@${person.user.id}>, ${ms(ms(time))} süresince susturuldu!`);
  person.send(`<@${person.user.id}>, ${ms(ms(time))} süresince susturuldun!`);
  
  setTimeout(function(){
    person.removeRole(role2);
    message.channel.send(`<@${person.user.id}>\'ın susturulma süresi bitti!`)
    person.send(`<@${person.user.id}> susturulma süren bitti!`)
  }, ms(time)); 
};

module.exports.conf = {
  aliases: ["mute"],
  enabled: 'yes',
  guild: true
}

exports.help = {
  name: "sustur",
  usage: "sustur <üye> <süre>",
  category: "Yetkili"
}