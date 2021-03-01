const keep_alive = require('./keep_alive.js')   //run bot a a webserver so repl keeps it alive
const nocachefile = require('./handlers/nocache.js')
const fs = require('fs');   //file manager access
function nocache(module) {require("fs").watchFile(require("path").resolve(module), () => {delete require.cache[require.resolve(module)]})}
nocache('./handlers/command.js')
const Discord = require('discord.js');
const bot = new Discord.Client({disableMentions: "everyone"});
const token = process.env.TOKEN;
bot.prefix = process.env.PREFIX;
let jsonString = fs.readFileSync('./bugs.json');
bot.bugs = JSON.parse(jsonString);
const WIPCOMMANDS = process.env.WIPCOMMANDS;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.queue = new Map()
bot.owner = process.env.OWNER
jsonString = fs.readFileSync('./commandsuggestions.json')
bot.commandsuggestions = JSON.parse(jsonString);

require('./handlers/command.js')(bot)



bot.on("ready", async () => {
  //console.log(786719754140123138.channels.cache.find(channel => channel.name === "general"))

  //const list = bot.guild.channel.get(786719754140123138)
  //list.members.forEach(member => console.log(member.user.username));
  console.log(`Logged in as ${bot.user.tag}!`);

  bot.user.setPresence({
    status: "online",  //You can show online, idle....
    game: {
      name: "Awaiting commands.",  //The message shown
      type: "WATCHING" //PLAYING: WATCHING: LISTENING: STREAMING:
    }
  });
});

bot.on("message", async message => {
  try {
    if (!message.guild) return;
    if (!message.content.startsWith(bot.prefix) && (!message.content.startsWith('<@!814685920183844924>'))) return;
    if (!message.author.bot)  {

    


    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    if (message.content.startsWith(bot.prefix)) {
      args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
    } else {
      args = message.content.slice(23).trim().split(/ +/g);
      }
    const cmd = args.shift().toLowerCase();
    const argsConst = args

    if (cmd.length === 0) return;

    // Get the command
    let command = bot.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    // If a command is finally found, run the command
    if (command) if (!WIPCOMMANDS.includes(command.name) || bot.owner.includes(message.author.id))
      command.run(bot, message, args);
    }
  } catch (e) {
    console.log(e.stack)
    message.channel.send(`<@814685920183844924>, something went wrong you need to look into.`)
  }
});

bot.login(token);