const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "suggest",
    category: "suggestions",
    usage: "suggest <command> <description>",
    description: "Suggest a command to add to the me",
    run: async (bot, message, args) => {
      var description = []
       if (!args[1]) return message.channel.send(`Not enough arguments, try ${bot.prefix}help for help.`)
       const command = args.shift()
       if (typeof(bot.commandsuggestions.pending[command]) == "array") {
          description = bot.commandsuggestions.pending[command].concat(args.join(' '))
       } else {
          description[0] = args.join(' ')
       } 

      if ((command in bot.commandsuggestions.pending)) {
        let suggestionDupeEmbed = new Discord.MessageEmbed()
        .setAuthor("This command already exists with the following descriptions:")
        .setColor("#92BA2F")
        .setThumbnail(bot.user.avatarURL)
        .setTimestamp(Date.now());
        bot.commandsuggestions.pending[command].forEach(entry => {
          suggestionDupeEmbed.addField(command, entry);
        });
        suggestionDupeEmbed.setFooter(`Do you still wish to add ${args.join(' ')}?`)

        message.channel.send(suggestionDupeEmbed).then(msg => {
        msg.react('👍').then(r => {
                            msg.react('👎');
                    });

                    // First argument is a filter function
                    msg.awaitReactions((reaction, user) => user.id !== msg.author.id && (reaction.emoji.name == '👍' || reaction.emoji.name == '👎'),
                            { max: 1, time: 30000 }).then(collected => {
                                    if (collected.first().emoji.name == '👍') {
                                            bot.commandsuggestions.pending[command] = bot.commandsuggestions.pending[command].concat(description)
                                            message.channel.send(`${command} suggested with a description of ${description}.`)
                                            fs.writeFile('./commandsuggestions.json', JSON.stringify(bot.commandsuggestions), err => {
                                              if (err) {
                                                  console.log('Error writing file', err)
                                              }
                                          })
                                    }
                                    else
                                            msg.channel.send('Suggestion canceled.');
                            }).catch(() => {
                                    msg.channel.send('No reaction after 30 seconds, suggestion canceled.');
                            });
                    })

      } else {
        bot.commandsuggestions.pending[command] = description
        message.channel.send(`${command} suggested with a description of ${description}.`)
        fs.writeFile('./commandsuggestions.json', JSON.stringify(bot.commandsuggestions), err => {
          if (err) {
              console.log('Error writing file', err)
          }
       })
      }
    }
}