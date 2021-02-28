module.exports = async (text, channel) => {
    const log = function log(message) {
    console.log(message);
    bot.channels.get(805153019254538251).send("```\n" + message + "```")
    }
}