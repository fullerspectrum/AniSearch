require('dotenv').config();
var Discord = require('discord.js');
var client = new Discord.Client();
var anilist = require('./anilist.js');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if(msg.content.startsWith("ani!") || msg.content.startsWith("man!")){
        var command = msg.content;
        console.log(command);
        var animan = '';
        console.log("ANILIST");
        if(command.startsWith("ani")){
            command = command.replace('ani','').trim();
            animan = "ANIME";
        }
        if(command.startsWith("man")){
            command = command.replace('man','').trim();
            animan = "MANGA";
        }
        if(command.includes("-id")){
            msg.delete();
            var fullout = false;
            console.log("ID");
            command = command.replace('-id','').trim();
            var dataProm = anilist.searchId(Number(command));
            dataProm.then(function(res) {
            if(res.data.Media.isAdult == true && !msg.channel.nsfw)
                msg.reply('no')
            else
                msg.channel.send(anilist.aniEmbed(res.data.Media));
            if(fullout = true)
                console.log(res.data.Media);
            })
        } else{
            msg.delete();
            anilist.searchTitle(command, 1, msg, animan, msg.channel.nsfw).then(function(res){
            anilist.search(res);
            });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);