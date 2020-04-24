module.exports.run = async (bot, message, args) => {
  let opsiyon = ["Taş", "Kağıt", "Makas"];
  let sonuc = Math.floor(Math.random() * opsiyon.length);
  let sonuc2 = opsiyon[sonuc].toLowerCase();
  message.channel.send('Hadi başlayalım!')
  message.channel.send('3, 2, 1, 0...')
    message.channel.send('Taş mı, kağıt mı, makas mı?')
    const filter = m => m.author.id === message.author.id;
    message.channel.awaitMessages(filter, {
      max: 1
    })
    .then((collected) => {
       let icerik = collected.first().content.toLowerCase();
         if(icerik === "taş") {
           if(sonuc2 === "taş") {
             message.channel.send(opsiyon[sonuc])
             return message.channel.send('Berabere');
           }
           else if(sonuc2 === "kağıt") {
             message.channel.send(opsiyon[sonuc])
             message.channel.send('Bot kazandı!');
             return;
           }
           else if(sonuc2 === "makas") {
             message.channel.send(opsiyon[sonuc])
             message.channel.send('Sen kazandın!')
             return;
           }
         }
         if(icerik === "kağıt") {
           if(sonuc2 === "taş") {
             message.channel.send(opsiyon[sonuc])
             message.channel.send('Sen kazandın!')
             return;
           }
           else if(sonuc2 === "kağıt") {
             message.channel.send(opsiyon[sonuc])
             return message.channel.send('Berabere');
           }
           else if(sonuc2 === "makas") {
             message.channel.send(opsiyon[sonuc])
             message.channel.send('Bot kazandı!')
             return;
           }
         }
         if(icerik === "makas") {
           if(opsiyon[sonuc] === "taş") {
             message.channel.send(opsiyon[sonuc])
             message.channel.send('Bot kazandı!');
             return;
           }
           else if(sonuc2 === "kağıt") {
             message.channel.send(opsiyon[sonuc])
             message.channel.send('Sen kazandın!')
             return;
           }
           else if(sonuc2 === "makas") {
             message.channel.send(opsiyon[sonuc])
             return message.channel.send('Berabere');
           }
         }
     })
};

module.exports.conf = {
  aliases: ["taşkağıtmakas"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "tkm",
  usage: "tkm",
  category: "Eğlence"
}