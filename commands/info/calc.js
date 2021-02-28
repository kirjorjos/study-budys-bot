const Calculator = require("@mroutput/jscalc");
var c = new Calculator();
const WolframAlphaAPI = require('@dguttman/wolfram-alpha-api');
const waApi = WolframAlphaAPI(process.env['WOLFRAM_APPID']);
const Discord = require('discord.js');

module.exports = {
    name: "calc",
    category: "info",
    description: "Calculates math equations",
    usage: "calc <expression>",
    aliases: ['calculator'],
    run: async (bot, message, args) => {
      let EMBED_COLOR = 1752220
      try {
      let result = c.exec(args.join(' '));
      let embed = new Discord.MessageEmbed()
                  .setTitle('Wolfram|Alpha')
                  .addField('Question', args.join(' '))
                  .addField('Simple Answer', result)
                  .setColor(EMBED_COLOR)
                  .setFooter('Requested by: ' + message.author.tag);
      message.channel.send(embed);
        } catch(e) {let query = args.join(' ');
          waApi.getShort(query)
              .then(data => {
                console.log(message.author.tag, query, data);
                let embed = new Discord.MessageEmbed()
                  .setTitle('Wolfram|Alpha')
                  .addField('Question', query)
                  .addField('Simple Answer', data)
                  .setColor(EMBED_COLOR)
                  .setFooter('Requested by: ' + message.author.tag);

                message.channel.send(embed);
              })
              .catch(e => {
                console.log(message.author.tag, query, e.message);
                let embed = new Discord.MessageEmbed()
                  .setTitle('Wolfram|Alpha')
                  .addField('Question', query)
                  .addField('Result', e.message)
                  .setColor(EMBED_COLOR)
                  .setFooter('Requested by: ' + message.author.tag);

                message.channel.send(embed);
              })
          }
    }
}