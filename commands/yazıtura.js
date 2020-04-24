module.exports.run = async (bot, message, args) => {
    let opsiyon = ["Yazı", "Tura"]
    let durum = Math.floor(Math.random() * opsiyon.length);
    let kisi = message.mentions.members.first();
    if(!kisi) {
      message.channel.send('Yazı veya Tura yaz lütfen!')
      const filter1 = m => m.author.id === message.author.id;
      message.channel.awaitMessages(filter1, {
        max: 1,
        time: 120000
      })
      .then((collected1) => {
        let icerik1 = collected1.first().content.toLowerCase();
        if(icerik1 === opsiyon[durum].toLowerCase()) {
          message.channel.send('Sen Kazandın!')
        } else {
            message.channel.send('Kaybettin!')
          }
      })
    } else {
      message.reply(', Yazı veya Tura yaz lütfen!')
      message.channel.send('<@' + kisi.id + '>, Yazı veya Tura yaz lütfen!')
        const filter2 = r => r.author.id === kisi.id;
        message.channel.awaitMessages(filter2, {
          max: 1,
          time: 120000
        })
        .then((collected2) => {
          let icerik2 = collected2.first().content.toLowerCase();
          if(icerik2 === opsiyon[durum].toLowerCase()) {
            message.channel.send('<@' + kisi.id + '>, kazandı!')
          }
        })
        const filter3 = n => n.author.id === message.author.id;
        message.channel.awaitMessages(filter3, {
          max: 1,
          time: 120000
        })
        .then((collected3) => {
          let icerik3 = collected3.first().content.toLowerCase();
          if(icerik3 === opsiyon[durum].toLowerCase()) {
            message.channel.send('<@' + message.author.id + '>, kazandı!')
          }
        })
      }
};

module.exports.conf = {
  aliases: ["yt"],
  enabled: 'yes',
  guild: false
}

exports.help = {
  name: "yazıtura",
  usage: "yazıtura",
  category: "Eğlence"
}