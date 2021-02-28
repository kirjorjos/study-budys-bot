module.exports = {
    name: "ping",
    category: "info",
    usage: "ping",
    description: "Returns latency and API ping",
    run: async (bot, message, args) => {
       message.channel.send(`Pong - ${bot.ws.ping}ms`)
    }
}