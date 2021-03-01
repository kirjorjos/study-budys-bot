const fs = require(`fs`);
module.exports = {
    name: "test",
    category: "bugs",
    usage: "bugreport <command you ran that errored>, [anything possible you know about the error, steps to replicate, etc.]",
    description: "Report a bug in the bot",
    run: async (bot, message, args) => {
      command = args.join(' ').split(',')
      if (!command[1]) return message.channel.send(`Not enough arguments, try ${bot.prefix}help for more info.`)
       bot.bugs[command[0]] = command[1]
        fs.writeFile('./bugs.json', JSON.stringify(bot.bugs), err => {
          if (err) {
              console.log('Error writing file', err)
              message.channel.send('<@500682420723384321>, error writing to JSON, check console for more info')
          } else {
            message.channel.send(`${command[0]} reported with a description of${command[1]}`)
          }
       })
    }
}