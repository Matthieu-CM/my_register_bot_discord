const Discord = require("discord.js");
const config = require("./config.json");


const client = new Discord.Client();

const prefix = "!";

const Code = require("./code")
const List = require("./list")
const Registration = require("./registration")
const Music = require("./music")


client.on("message", function (message) {
    if (message.author.bot) return;
    if (message.author.username === "bod") {
        message.reply("Toi je t'aime pas")
    }
    if (!message.content.startsWith(prefix)) return;
    if (message.channel.id !== process.env.channel_id) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    console.log("Command => ", message.author.username, command, args)
    if (command === "register") {
        Registration.Register(message)
    } else if (command === "unregister") {
        Registration.Unregister(message)
    } else if (command === "cerfio") {
        message.channel.send("Oui maitre")
    } else if (command === "help") {
        message.channel.send("```\r!register:\tPermet de s'enregistrer pour ce soir\r!unregister:\tPermet d'annuler sa participation\r!list:\tPermet d'afficher la liste des participants\r!clear:\rPermet de réinitialiser la liste des participants\r!help: Pas besoin de dire plus\r\rBot made by Zuma Torney <3\r```")
    } else if (command === "buzz") {
        message.channel.send("nik ta mere")
    } else if (command === "clear") {
        let registered = require("./registered.json")
        registered.today = []
        Registration.updateRegistered(registered)
        message.channel.send("Liste nettoyé")
    } else if (command === "list") {
        List.List(message)
    } else if (command === "code") {
        Code.Code(message, args)
    } else if (command === "objection") {
        Music.playMusic(client, message, "https://www.youtube.com/watch?v=fR4P8o95WPA")
    } else if (command === "snk") {
        Music.playMusic(client, message, "https://youtu.be/pa00z_Bp2j4?t=161")     
    } else if (command === "leave") {
        Music.leave(message)     
    } else if (command === "add") {
        if (args[0] !== undefined && args[1] !== undefined) {
            let register = require("./registered.json")
            register[args[0]] = args[1]
            fs.writeFile("./registered.json", JSON.stringify(register), function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
            message.channel.send("Command added")
        }
    } else {
        let register = require("./registered.json")
        if (register[command] !== undefined) {
            Music.playMusic(client, message, register[command])
        }
    }
});


client.login(config.BOT_TOKEN);
