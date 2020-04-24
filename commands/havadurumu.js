const Discord = require('discord.js');
const weather = require('weather-js');
module.exports.run = (bot, message, args) => {
  let yer = args.slice(0).join(' ');
    weather.find({search: yer, degreeType: 'C'}, function(err, result) {
      if (err) message.channel.send(err);

      var current = result[0].current;
      var location = result[0].location;

        message.channel.send({embed: {
          author: {
            name:`${current.observationpoint} için Hava Durumu`
          },
          description:`**${current.skytext}**`,
          color: 0x00AE86,
          thumbnail: {
            url: (current.imageUrl)
          },
          fields:[
            {
              name:'Saat Dilimi',
              value:`UTC${location.timezone}`,
              inline: true
            },
            {
              name:'Derece Türü',
              value:'°C',
              inline: true
            },
            {
              name:'Sıcaklık',
              value:`${current.temperature} Derece`,
              inline: true
            },
            {
              name:'RealFeel',
              value:`${current.feelslike} Derece`,
              inline: true
            },
            {
              name:'Rüzgar',
              value:(current.winddisplay),
              inline: true
            },
            {
              name:'Nem',
              value:`${current.humidity}%`,
              inline: true
            }
          ]
        }});
    })
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: false
}

module.exports.help = {
  name: "havadurumu",
  usage: "havadurumu <yer>",
  category: "Kullanıcı"
}