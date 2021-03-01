const Discord = require('discord.js')
module.exports = {
    name: "sourcecode",
    category: "info",
    usage: "sourcecode",
    description: "Get a link to the source code of the bot",
    run: async (bot, message, args) => {
      let Embed = new Discord.MessageEmbed()
        .setTitle(`Source code`)
        .setDescription(`The source coe is located [here](https://github.com/kirjorjos/study-budys-bot).`)
       message.channel.send(Embed)
    }
}