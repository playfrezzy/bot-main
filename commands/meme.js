const randomPuppy = require('random-puppy');

module.exports.run = async (bot, message, args) => {

    let reddit = [
        "meme",
        "animemes",
        "MemesOfAnime",
        "animememes",
        "AnimeFunny",
        "dankmemes",
        "dankmeme",
        "wholesomememes",
        "MemeEconomy",
        "techsupportanimals",
        "meirl",
        "me_irl",
        "2meirl4meirl",
        "AdviceAnimals"
    ]

    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

    message.channel.startTyping();

    randomPuppy(subreddit).then(async url => {
            await message.channel.send({
                files: [{
                    attachment: url,
                    name: `${subreddit}.png`
                }]
            }).then(() => message.channel.stopTyping());
    }).catch(err => console.error(err));

};

module.exports.conf = {
  aliases: ['memes'],
  enabled: 'yes',
  guild: false
}

module.exports.help = {
  name: 'meme',
  usage: "meme",
  category: "Eğlence"
}