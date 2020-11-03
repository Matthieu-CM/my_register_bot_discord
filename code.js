
function Code(message, args) {
    let registered = require("./registered.json")
    if (args.length === 0) {
        message.channel.send("Le code de la partie est :\n```\r" + registered.code + "\r```")
    } else {
        let code = args[0]
        if (code.length === 6 && /^[a-zA-Z()]+$/.test(code)) {
            registered.code = code.toUpperCase()
            message.channel.send("Code de partie enregistré Bonne Partie :)")
        } else {
            message.channel.send("Ceci n'est pas un code valide")
        }
    }
}

exports.Code = Code;