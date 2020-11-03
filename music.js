const ytdl = require('ytdl-core');

function channelVerif(voiceChannel, message, channel) {
    console.log("COUCOU")
    if (!voiceChannel)
        return { res: -1, response: "You need to be in a voice channel to play music!" }
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return { res: -1, response: "I need the permissions to join and speak in your voice channel!" }
    }
    if (!channel) return console.error("The channel does not exist!");
    return { res: 0, response: 0 }
}
const queue = new Map();


async function playMusic(client, message, link) {
    
    const serverQueue = queue.get(message.guild.id);
    
    const channel = client.channels.fetch("765283586726690850");
    const voiceChannel = message.member.voice.channel;
    let res = channelVerif(voiceChannel, message, channel)
    console.log(res)
    if (res.res === -1) {
        message.channel.send(res.response)
        return
    }
    console.log("Hello")
    // console.log(message.member)
    const songInfo = await ytdl.getInfo(link);
    const song = {
        title: songInfo.playerResponse.videoDetails.title,
        url: link
    }
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        }

        queue.set(message.guild.id, queueContruct);
        
        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, song);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 43);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

function skip(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    if (!serverQueue)
      return message.channel.send("There is no song that I could skip!");
    serverQueue.connection.dispatcher.end();
  }
  
  function stop(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }

  function leave(message) {
    const voiceChannel = message.member.voice.channel;
    voiceChannel.leave()
  }

exports.playMusic = playMusic;
exports.stop = stop;
exports.leave = leave;