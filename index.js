const Discord = require("discord.js");
const config = require("./config.json");

require('dotenv').config()

const client = new Discord.Client();

const prefix = "!";

const Code = require("./code")
const List = require("./list")
const Registration = require("./registration")
const Music = require("./music");
const Add = require("./add");

function Call(message) {
    let registered = require("./registered.json");
    console.log(registered.today);
    if (registered.today.length === 0) {
        message.reply("Personne n'a dit être disponible, RT si t triste");
    } else {
        registered.today.forEach((element) => {
            const split = element.split(' ');
            message.channel.send("<@" + split[split.length - 1] + ">");
        })
    }
}
var shutdown = false;

var admin = ["Zuma Torney", "Cerfio", "Rajie", "Meruto-kun"]

console.log(process.env.CHANNEL_ID)
console.log("BOT IS UP and removed reply to baptiste")
client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    console.log("Command => ", message.author.username, command, args)
    if (command === "shutdown" && (admin.indexOf(message.author.username) !== -1)) {
        shutdown = true;
        console.log("Bot has stopped")
        return
        // message.channel.send("Adieu tout le monde")
    } else if (command === "start" && (admin.indexOf(message.author.username) !== -1)) {
        shutdown = false;
        console.log("Bot started")
        return
        // message.channel.send("Me revoila, comme neuf")
    }
    if (shutdown === true) return;
    if (command === "code") {
        Code.Code(message, args)
        return
    }
    if (message.channel.id !== process.env.CHANNEL_ID) return;
    if (command === "register") {
        Registration.Register(message);
    } else if (command === "unregister") {
        Registration.Unregister(message);
    }
     if (command === "call") {
        Call(message);
    } else if (command === "list") {
    List.List(message);
    } else if (command === "cerfio") {
        message.channel.send("Oui maitre");
    } else if (command === "help") {
        message.channel.send("```\r!register:\tPermet de s'enregistrer pour ce soir\r!unregister:\tPermet d'annuler sa participation\r!list:\tPermet d'afficher la liste des participants\r!clear:\rPermet de réinitialiser la liste des participants\r!help: Pas besoin de dire plus\r\rBot made by Zuma Torney <3\r```");
    } else if (command === "buzz") {
        message.channel.send("nik ta mere");
    } else if (command === "clear") {
        let registered = require("./registered.json")
        registered.today = []
        Registration.updateRegistered(registered)
        message.channel.send("Liste nettoyé")
    } else if (command === "objection") {
        Music.playMusic(client, message, "https://www.youtube.com/watch?v=fR4P8o95WPA");
    } else if (command === "snk") {
        Music.playMusic(client, message, "https://youtu.be/pa00z_Bp2j4?t=161")
    } else if (command === "leave") {
        Music.leave(message)
    } else if (command === "add") {
        Add.Add(message, args, command)
    } else {
        let register = require("./registered.json")
        console.log(register[command])
        if (register[command] !== undefined) {
            Music.playMusic(client, message, register[command])
        } else {
            message.channel.send("Commande introuvable")
        }
    }
});

client.login(config.BOT_TOKEN);