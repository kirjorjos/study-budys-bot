const fs = require('fs');

module.exports = {
    name: "accept",
    category: "suggestions",
    usage: "accept <command>",
    description: "Accepts a suggested command",
    aliases: ['approve'],
    run: async (bot, message, args) => {
       if (!(bot.owner.includes(message.author.id))) return message.channel.send('Only pineapple and madjay are allowed to do this.')
       if (!args[0]) return message.channel.send('Please give a command to accept.')
       bot.commandsuggestions.accepted[args[0]] = bot.commandsuggestions.pending[args[0]]
       delete bot.commandsuggestions.pending[args[0]]
       fs.writeFile('./commandsuggestions.json', JSON.stringify(bot.commandsuggestions), err => {
          if (err) {
              console.log('Error writing file', err)
          }
       })
       message.channel.send(`${args[0]} accepted.`)
    }
}