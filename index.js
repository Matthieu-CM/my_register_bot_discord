const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs")

const client = new Discord.Client();


const prefix = "!";

function updateRegistered (content) {
    fs.writeFile("./registered.json", JSON.stringify(content), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}

function List(message) {
    let registered = require("./registered.json")
    console.log(registered.today)
    if (registered.today.length === 0) {
        message.reply("Personne n'a dit être disponible, RT si t triste")
    } else {
        let response = "```\n"
        registered.today.forEach((element) => {
            console.log(element)
            response = response + element + "\n"
        })
        response = response + "```"
        message.reply(response)
    }
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
        message.reply("Vous n'êtes pluys disponible")
    }

}

client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    console.log(command)
    if (command === "register") {
        Register(message)
    } else if (command === "unregister") {
        Unregister(message)
    } else if (command === "cerfio") {
        message.reply("Oui maitre")
    } else if (command === "help") {
        message.reply("```\r!register:\tPermet de s'enregistrer pour ce soir\r!unregister:\tPermet d'annuler sa participation\r!list:\tPermet d'afficher la liste des participants\r!clear:\rPermet de réinitialiser la liste des participants\r!help: Pas besoin de dire plus\r\rBot made by Zuma Torney <3\r```")
    } else if (command === "buzz") {
        message.reply("nik ta mere")
    } else if (command === "clear") {
        let registered = require("./registered.json")
        registered.today = []
        updateRegistered(registered)
        message.reply("Liste nettoyé")
    } else if (command === "list") {
       List(message)
    }
});


client.login(config.BOT_TOKEN);