const Discord = require('discord.js');
const bot = new Discord.Client();
const db = require('quick.db');
const ms = require('ms');
const fs = require('fs');

const ayarlar = require('./ayarlar.json');

var logs = ayarlar.channels.logs;
var sınır1 = ayarlar.channels.sınır;

require("./functions")(bot);

  //Command Handler
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

let agirkufur = [
  "oç",
  "orospu",
  "anan",
  "amına",
  "piç"
]

let kufur = [
  "amq",
  "amk",
  "sik"
]


bot.on('message', async message => {
  
  // fs.readdir("./items/", (err, files) => {
  //   files.forEach(f => {
  //     let item = JSON.parse(fs.readFileSync("./items/"+f));
  //     item.tepki = "Yok";
  //     item.rol = "Yok";
  //     fs.writeFile("./items/"+f, JSON.stringify(item), (err) => {
  //       if(err) console.log(err);
  //     })
  //   })
  // });
  
  
  if(message.content.toLowerCase().includes === agirkufur) {
    const embed = new Discord.RichEmbed()
      .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
      .setTimestamp()
      .setTitle('Küfür')
      .addField('Küfür Edilen Mesaj', message)
      .setAuthor(message.author.username, message.author.displayAvatarURL)
    logs.send(embed)
  }
  
  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
  
  if(!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: ayarlar.prefix
    };
  }
  
  let prefix = prefixes[message.guild.id].prefixes;
  
  let kullanıcı = message.mentions.users.first() || message.author
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
  let sebep = afkkullanıcı
  
  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;
 
  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`✔️ **${message.author.tag}** adlı kullanıcı artık AFK degil...`)
      db.delete(`afk_${message.author.id}`)
    }
    if (afkkullanıcı) {
      message.delete()
      message.channel.send(`:x: **${kullanıcı.tag}** şu anda AFK.\n Sebep : **${sebep}**`)
      return;
    }
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`✔️ **${message.author.tag}** adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
    }
  } 
  
});

module.exports = {
  bot: bot
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(8080, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
