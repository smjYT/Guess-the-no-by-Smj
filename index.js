const aoijs = require("aoi.js");
const express = require("express");
require('dotenv').config();

const bot = new aoijs.Bot({
  token: process.env.TOKEN,
  prefix: "." //Change prefix ! if you like
});

const app = express();

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});
// This will return a simple website

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
// This will listen on port.

bot.onMessage({
  respondToBots: false
});
// This will ignore bots from executing the commands

bot.command({
  name:"ping",
  code:`:ping_pong: Pong! \`$ping ms\``
});
// This will be the first command for your bot
// It will return the websocket ping

bot.status({
  text:".help | $allMembersCount Users", // This sets the message status
  type:"PLAYING",
  time:12
});
// This will be the bot status 

//commands

bot.command({
  name: "invite",
  aliases: ['inv'],
  code: `$title[INVITE LINK 🔗]
  $description[You Invite Me By Clicking [Here](https://discord.com/api/oauth2/authorize?client_id=855280597891022898&permissions=8&scope=bot)]`
})

 bot.command({
    name: "guessno",
    code: `$title[Guess The Number Winning Number]
$description[The winning number for GTN is $getservervar[winning_number].]
$onlyPerms[admin;You need to be an Admin to use this.]
$suppressErrors`
});
 
bot.command({
    name: "gtnstats",
    aliases: ['gtnstatistics'],
    code: `$title[Guess The Number Stats]
$description[GTN commands: disableGtn, gtnstats, gtn]
$addField[GTN Status;$getservervar[gtnstatus];yes]
$addField[GTN Channel;<#$getservervar[guess_the_number_channel]>;yes]
$addField[Wins;$getglobaluservar[gtnwins;$findmember[$message]];yes]
$addField[Total Attempts/Wins;$getglobaluservar[gtnattempts;$findmember[$message]];yes]
$thumbnail[$useravatar[$findmember[$message]]]
$suppressErrors`
});
 
bot.command({
    name: "guessthenumber",
    aliases: ['gtn'],
    code: `$setservervar[winning_number;$random[$message[1];$message[2]]]
$setservervar[guess_the_number_channel;$channelid]
$setservervar[gtn;true]
$setservervar[n1;$message[1]]
$setservervar[n2;$message[2]]
$setservervar[gtnstatus;There is an ongoing game of GTN in <#$channelID>]
$author[Guess the number!;$servericon]
$title[Alrighty!]
$description[I have got the number in mind. I have DMed you the number.]
$color[BLUE]
$channelSendMessage[$channelID;Guess the number has started! The number is from __$message[1] to $message[2]__. Good luck everybody!]
$sendDM[$authorID;The number for Guess The Number is $random[$message[1];$message[2]].
__Why are you getting this DM?__
You started a Guess The Number event in your server $servername.]
$onlyif[$isuserdmenabled==true;Your DMs are disabled. but the number is $random[$message[1];$message[2]]. Keep that number somewhere safe! {delete:5s}]
$onlyif[$message[1]<$message[2];You have provided the wrong input, please make sure the first number is the min number and the second the max number.]
$onlyif[$message[2]>=5;The max number has to be at least 5!]
$onlyif[$checkcontains[$message;q;w;e;r;t;y;u;i;o;p;a;s;d;f;g;h;j;k;lz;x;c;v;b;n;m]==false;You only need to use numbers as input.]only need to use numbers as input.]
$argscheck[>2;Please provide a min $argscheck[>2;Please provide a min  provide a min number and a max number]
$onlyperms[managechannels;you don't have the managechannels permission]
$suppressErrors`
});
 
bot.command({
    name: "$alwaysExecute",
    code: `$setservervar[winning_number;Ended. start again with the gtn command.]
$setglobaluserVar[gtnwins;$sum[$getglobaluserVar[gtnwins];1]]
$setservervar[gtntries;0]
$setservervar[gtnstatus;Unfortunately, the last GTN round has ended.]
$setservervar[gtn;false]
$title[$randomText[Winner winner, chicken dinner.;Well well well.;We have a winner!;Congratulations!;You have won the GTN Event.;Woah, great job!;We're proud of you;Guess The Number has ended.;GTN;Woop woop.]]
$description[Looks like we have a winner..]
$addField[Correct Number;$getservervar[winning_number];yes]
$addField[Winner;$usertag;yes]
$addField[Tries;$getServerVar[gtntries];yes]
$color[BLUE]
$thumbnail[$authoravatar]
$footer[Guess The Number! +1 gtn wins added. Check stats with the gtnstats command!]
$onlyif[$message[1]==$getservervar[winning_number];Wrong number $usertag, it's not $message]
$setServerVar[gtntries;$sum[$getServerVar[gtntries];1]]
$setglobaluserVar[gtnattempts;$sum[$getglobaluserVar[gtnattempts];1]]
$onlyif[$message[1]>=$getservervar[n1];The number is a random number from $getservervar[n1] to $getservervar[n2]. You provided a number smaller than $getservervar[n1].]
$onlyif[$message[1]<=$getservervar[n2];The number is a random number from $getservervar[n1] to $getservervar[n2]. You provided a number bigger than $getservervar[n2].]
$onlyif[$getservervar[winning_number]!=Ended. start again with the gtn command.;Looks like the last gtn has ended, you will have to get a staff to re-set it up.]
$onlyif[$isNumber[$message]==true;Please only enter a number. This is a Guess The Number Channel.]
$onlyif[$channelid==$getservervar[guess_the_number_channel];]
$onlyIf[$getservervar[gtn]==true;]
$suppressErrors`
});
 
 
bot.command({
    name: "disablegtn",
    code: `Disabled.
$setservervar[gtntries;0]
$setservervar[guess_the_number_channel;Not set]
$setservervar[winning_number;0]
$suppressErrors
$onlyperms[managechannels;No thanks, you don't have the managechannels permission]`
})

bot.command({
  name: "help",
  code: `$title[🔢 MY HELP PAGE 🔢]
  $description[Here Given Below My All Commands My Prefix Is **.** You Can Use Commands By Doing **.<command name>**
  $addField[Command Name: invite;
  Work: Get The Bot Invite Link]
$addField[Command Name: guessno;
Work: Tell The Winning No]

$addField[Command Name: disablegtn;
Work: Disabled The Game You Start Previous]

$addField[Command Name: gtnstats;
Work: Show The Stats Of all games you played Previously]

$addField[Command Name: gtn;
Usage: gtn <no1> <no2>
Work: Start The Game In Channel You Write It.]]
$color[RANDOM]
$footer[Bot Made By SMJ    B⃢ot.#0007 With ❤️]`
})
 
 
//Variables
bot.variables({
  guess_the_number_channel: "",
  winning_number: "",
  gtntries: "0",
  gtn: "false",
  gtnwins: "0",
  gtnattempts: "0",
  gtnstatus: "No ongoing game.",
  n1: "",
  prefix: ".",
  n2: ""
})

bot.botJoinCommand({
channel: "855727515896250368",
code: `
Hi Smj I joined A New Server 😄😄 $serverName!
`
})

bot.onGuildJoin()

bot.botLeaveCommand({
  channel: "855727515896250368",
  code: `Hi Someone Kick Me From $serverName 😭😭`
})

bot.onGuildLeave()

bot.botJoinCommand({
  channel: "$randomChannelID",
  code: `Thanks To Inviting Me In Your Server Write **.help** For Knowing About My Commands And Start The Game And Dont Forget To Join My Support Server 
  
  🔗 https://discord.gg/em44gJXRbJ

 **STAY HAPPY STAY SAFE :)**`
})