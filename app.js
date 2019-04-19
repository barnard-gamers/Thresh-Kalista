//discord
const Discord = require('discord.js');
const client = new Discord.Client();
const discord_token = process.env.DISCORD_KEY;
//slack
//dotenv
require('dotenv').config()

client.on('ready', () => {
    console.log('ready...');
});
client.on('message', message =>{
    if(message.author.bot){
        return;
    }
    if(message.channel.name === 'admin'){//get discord chat
        post_to_slack(message.author.username + " : " + message.content)
    }
});

function post_to_discord(message){//discord post
    let channel = client.channels.find(channel => channel.id === "508648369963532289")
    channel.send(message)
}

client.login(process.env.DISCORD_TOKEN);
//slack bot ↓
var SlackBot = require('slackbots');

// create a bot
var bot = new SlackBot({
    token: process.env.SLACK_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'kalista'
});
bot.on("start", function(){

})
bot.on('message', async function (message)  {

    if (message.type !== "message") {
      return;
    }
    bot.getUsers().then(userList => {
       for(var i = 0; i < userList.members.length; i ++){
         if(userList.members[i].id === message.user){
            post_to_discord(userList.members[i].real_name + " : "+ message.text);
         }
       }
    });
  });

function post_to_slack(message){
    let params = {
        icon_url: 'https://runes.lol/image/generated/championtiles/Kalista.jpg'
    };
    bot.postMessageToChannel("general", message, params)
}

client.on('error', console.error);
