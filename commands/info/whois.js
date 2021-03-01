const Discord = require('discord.js');
module.exports = {
    name: "userinfo",
    category: "info",
    usage: "userinfo [user]",
    description: "Displays info about a user",
    aliases: ['whois'],
    run: async (bot, message, args) => {
       let user = message.mentions.users.first() || bot.users.cache.find(user => user.username == args.join(' ')) || message.author
       const member = message.guild.member(user)

        var playing = '' 
        if (user.presence.activities == ' ') {
        playing = ("[ " + user.presence.activities + " ]")
        } else {
          playing = 'Nothing'
        }
        const joinedAt = new Date(member.joinedAt)
        const Registered = new Date(user.createdAt)
        const whois = new Discord.MessageEmbed()
              .setTitle(`User Info:`)
              .addField("Joined: ", joinedAt.toDateString())
              .addField("Registered: ", Registered.toDateString())
              .addField("Username: ", user.tag)
              .addField("ID: ", user.id)
              .addField("Playing: ", playing)
              .setColor('light_blue')
              .setTimestamp()
              .setThumbnail(user.displayAvatarURL({
                          dynamic: true,
                    }))  
          message.channel.send(whois)
    }
}