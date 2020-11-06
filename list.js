function List(message) {
    let registered = require("./registered.json")
    console.log(registered.today)
    if (registered.today.length === 0) {
        message.channel.send("Personne n'a dit être disponible, RT si t triste")
    } else {
        let response = "```\n"
        registered.today.forEach((element) => {
            const user = element.split(' ');
            response = response + user[0] + "\n";
        })
        response = response + "\nIl y'a " + registered.today.length + " joueurs pour ce soir" + "\n```"
        message.channel.send(response)
    }
}

exports.List = List;