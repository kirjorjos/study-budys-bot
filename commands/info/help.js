const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description:
    "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "info",
  aliases: ['h'],
  run: async (bot, message, args) => {
    if (args[0]) {
      const command = await bot.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, bot.user.displayAvatarURL())
        .addField("Description", command.description || "Not Provided :(")
        .addField("Usage", "`" + bot.prefix + command.usage + "`" || "Not Provied")
        .addField("Aliases", "`" + command.aliases + "`" || "No aliases")
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor("GREEN")
        .setFooter(bot.user.username, bot.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      const commands = await bot.commands;

      let emx = new MessageEmbed()
        .setDescription("All commands:")
        .setColor("GREEN")
        .setFooter(bot.user.username, bot.user.displayAvatarURL())
        .setThumbnail(bot.user.displayAvatarURL());

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`${category.toUpperCase()}[${value.length}]`, desc);
      }

      return message.channel.send(emx);
    }
  }
};