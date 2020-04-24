const Discord = require('discord.js');
const fs = require('fs');
let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
const mapping = {
    ' ': '   ',
    '0': ':zero:',
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:',
    '!': ':grey_exclamation:',
    '?': ':grey_question:',
    '#': ':hash:',
    '*': ':asterisk:'
};

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
	mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
});


module.exports.run = async (bot, message, args) => {
  let prefix = prefixes[message.guild.id].prefixes.toLowerCase();

	if (args.length < 1) return message.reply(`Lütfen bir mesaj belirt!\nKullanım: ${prefix}emojiyazı <mesaj>`)
		
	message.channel.send(args.join(' ').split('').map(c => mapping[c] || c).join(' '));

};

module.exports.conf = {
  aliases: ["emoji", "emoji-yazı"],
  enabled: 'yes',
  guild: false
}

module.exports.help = {
  name: 'emojiyazı', 
  usage: 'emojiyazı <mesaj>',
  category: "Eğlence"
};