const fs = require('fs');

module.exports = {
    name: "deny",
    category: "suggestions",
    usage: "deny <command>",
    description: "Denys a suggested command",
    run: async (bot, message, args) => {
       if (!(bot.owner.includes(message.author.id))) return message.channel.send('Only pineapple and madjay are allowed to do this.')
       if (!args[0]) return message.channel.send('Please give a command to deny.')
       bot.commandsuggestions.denied[args[0]] = bot.commandsuggestions.pending[args[0]]
       delete bot.commandsuggestions.pending[args[0]]
       fs.writeFile('./commandsuggestions.json', JSON.stringify(bot.commandsuggestions), err => {
          if (err) {
              console.log('Error writing file', err)
          }
       })
       message.channel.send(`${args[0]} denied.`)
    }
}