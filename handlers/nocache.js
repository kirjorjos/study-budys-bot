function nocache(module) {require("fs").watchFile(require("path").resolve(module), () => {delete require.cache[require.resolve(module)]})}
const fs = require("fs");
module.exports = (bot) => {
  readdirSync("../").forEach(dir1 => {
    nocache(`../${dir1}`)
    readdirSync(`./${dir1}`).forEach(dir2 => {
      nocache(`../${dir1}/${dir2}`)
      readdirSync(`./${dir1}/${dir2}`).forEach(dir3 => {
        nocache(`../${dir1}/${dir2}/${dir3}`)
      })
    })
  })
}