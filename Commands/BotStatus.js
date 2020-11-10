function botStatus(command, admin, shutdown, message) {
    if (command === "shutdown" && (admin.indexOf(message.author.username) !== -1)) {
        shutdown = true;
        console.log("Bot has stopped")
        return true
        // message.channel.send("Adieu tout le monde")
    } else if (command === "start" && (admin.indexOf(message.author.username) !== -1)) {
        shutdown = false;
        console.log("Bot started")
        return false
    }
    if (shutdown === true) return true;
}

exports.botStatus = botStatus