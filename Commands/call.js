function Call(message, author) {
    let registered = require("./registered.json");
    console.log(registered.today);
    if (registered.today.length === 0 && message.author.username.indexOf(admin) !== -1) {
        message.reply("Personne n'a dit être disponible, RT si t triste");
    } else {
        registered.today.forEach((element) => {
            const split = element.split(' ');
            message.channel.send("<@" + split[split.length - 1] + ">");
        })
    }
}

exports.Call = Call;