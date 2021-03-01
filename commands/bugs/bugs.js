const Discord = require('discord.js');
module.exports = {
    name: "bugs",
    category: "bugs",
    usage: "bugs",
    description: "Get the known bugs",
    run: async (bot, message, args) => {
       let bugsEmbed = new Discord.MessageEmbed()
        .setAuthor("The following bugs are known:")
        .setColor("#92BA2F")
        .setThumbnail(bot.user.avatarURL)
        .setTimestamp(Date.now());
        for (const [key, value] of Object.entries(bot.bugs)) {
          bugsEmbed.addField(key, value);
        }
        if (Object.keys(bot.bugs).length == 0) bugsEmbed.setDescription('There are no bugs.')
        message.channel.send(bugsEmbed)
    }
}