const Discord = require('discord.js');

module.exports = {
    name: "suggestions",
    category: "suggestions",
    usage: "suggestions [command]",
    description: "See the suggestions of a command or list all command suggestions",
    run: async (bot, message, args) => {
      if (!args[0]) {
        var accepted =''
        var pending = ''
        var denied = ''
        Object.keys(bot.commandsuggestions.accepted).forEach(key => {
            accepted = accepted + '\n' + key
        });
        Object.keys(bot.commandsuggestions.pending).forEach(key => {
            pending = pending + '\n' + key
        });
        Object.keys(bot.commandsuggestions.denied).forEach(key => {
            denied = denied + '\n' + key
        });
        if (pending == '') pending = 'Nothing to display.'
        if (accepted == '') accepted = 'Nothing to display.'
        if (denied == '') denied = 'Nothing to display.'
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Suggested Commands')
        .addFields(
          { name: 'Pending aproval', value: pending, inline: true },
          { name: 'Aproved, pending implementation', value: accepted, inline: true },
          { name: 'Denied', value: denied, inline: true },
        )
        .setTimestamp()

      message.channel.send(exampleEmbed);
      } else {
        var command = args[0]
        if (!command) return message.channel.send(`Unable to find ${args[0]}.`)
        let suggestionDupeEmbed = new Discord.MessageEmbed()
        .setAuthor("This command has the following descriptions:")
        .setColor("#92BA2F")
        .setThumbnail(bot.user.avatarURL)
        .setTimestamp(Date.now());
        bot.commandsuggestions.pending[command].forEach(entry => {
          suggestionDupeEmbed.addField(command, entry);
        });

        message.channel.send(suggestionDupeEmbed)
      }
    }
}