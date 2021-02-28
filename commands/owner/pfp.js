module.exports = {
    name: "pfp",
    category: "owner",
    usage: "pfp <link>",
    description: "Changes the bot's pfp, bot owner only",
    run: async (bot, message, args, prefix, owner) => {
      if (bot.owner.includes(message.author.id)) {
        var url = ''
        if (message.attachments.size > 0) {
          url = message.attachments.first().url
        } else {
           url =  args.join(' ')
        }
          if (url !== '') {bot.user.setAvatar(url)} else
          { 
            return message.channel.send('Please provide an image')
          }
          message.channel.send('pfp set.')
        }
      }
    }