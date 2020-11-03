function List(message) {
    let registered = require("./registered.json")
    console.log(registered.today)
    if (registered.today.length === 0) {
        message.channel.send("Personne n'a dit être disponible, RT si t triste")
    } else {
        let response = "```\n"
        registered.today.forEach((element) => {
            console.log(element)
            response = response + element + "\n"
        })
        response = response + "```"
        message.channel.send(response)
    }
}

exports.List = List;