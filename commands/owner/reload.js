module.exports = {
    name: "reload",
    category: "owner",
    usage: "reload [file path]",
    description: "Quick reload a file so I don't have to take the bot offline",
    run: async (bot, message, args) => {
      if (!bot.owner.includes(message.author.id)) return message.channel.send('Not enough perms.')
       if (args[0]) return require(args.join(' '))
       require('../../handlers/command.js')(bot);
       message.channel.send('reload successful.')
    }
}