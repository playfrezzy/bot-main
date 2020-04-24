const fs = require('fs');
module.exports.run = async (bot, message, args) => {
  let para = JSON.parse(fs.readFileSync("./storage/para.json", "utf8"));
  let name1 = args[0].toLowerCase();
  let sehir = message.guild.roles.find('name', name1)
  let kisi = message.member;
  if(name1 === "milano") {
    kisi.addRole(sehir);
  }
  else if(name1 === "roma") {
    kisi.addRole(sehir)
  }
  else if(name1 === "venedik") {
    kisi.addRole(sehir)
  }
  else if(name1 === "sicilya") {
    kisi.addRole(sehir)
  }
  else if(name1 === "napoli") {
    kisi.addRole(sehir)
  }
  else return message.reply('Lütfen geçerli bir şehir ismi giriniz!(Milano/Venedik/Roma/Napoli/Sicilya)');
};

module.exports.conf = {
  aliases: ["seyahatet"],
  enabled: 'no',
  guild: true
}

module.exports.help = {
  name: "seyahat",
  usage: "seyahat <şehir ismi>",
  category: "Kullanıcı"
}