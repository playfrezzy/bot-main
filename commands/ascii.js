const ascii = require('ascii-art');
module.exports.run = async (bot, message, args) => {
  ascii.font(args.slice(0).join(' '), 'Doom', function(rendered) {
    rendered = rendered.trimRight();
    if(rendered.length > 2000) return message.reply('Üzgünüm, mesaj çok uzun!');
    
    message.channel.send(rendered, {
      code: 'md'
    });
    console.log(rendered);
  });
};

module.exports.conf = {
  aliases: ["ascii-art"],
  enabled: 'yes',
  guild: false
}

module.exports.help = {
  name: "ascii",
  usage: "ascii <yazılacak mesaj>",
  category: "Eğlence"
}