const fs = require("fs")

function updateRegistered (content) {
    fs.writeFile("./registered.json", JSON.stringify(content), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}

function Register(message) {
    let registered = require("./registered.json")
    if (registered.today.indexOf(message.author.username) === -1) {
        registered.today.push(message.author.username)
        updateRegistered(registered)
        message.reply("Participation à ce soir enregistré");
    } else {
        message.reply("Vous êtes déjà enregistré")
    }
}

function Unregister(message) {
    let registered = require("./registered.json")
    let index = registered.today.indexOf(message.author.username)
    if ( index === -1) {
        message.reply("T'a même pas dit que tu était dispo et la tu cherche à anuler ta participation frère");
    } else {
        registered.today.splice(index, 1)
        message.reply("Vous n'êtes plus disponible")
    }

}

exports.updateRegistered = updateRegistered;
exports.Unregister = Unregister;
exports.Register = Register;