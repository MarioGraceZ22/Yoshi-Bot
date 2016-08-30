try {
    var Discord = require("discord.js");
}
catch (e) {
    console.log(e.stack);
    console.log(process.version);
    console.log("I think there is a complete lack of everything here... I mean, do you even want to start? There is no 'discord.js.'");
    process.exit();
}

var LOADDIR = "C:\\Users\\Ian\\Music\\";

try{
    var auth = require("./auth.json");
}
catch(e){
    console.log("You aren't getting very far without an 'auth.json'... just sayin'.");
}


try{
    var commands = require('./commands.js').commands;
}
catch(e){
    console.log("You see, if you don't have a 'commands.js', you can't really command me to do things...");
    throw new Error(e);
}

var password = "";

var bot = new Discord.Client({autoReconnect: true});

bot.loginWithToken(auth.token, function (error, token) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Successfully logged in.")
    }
})
bot.on("ready", function () {
    console.log("Bot is live and ready!");
    bot.sendMessage("168188374023274496", "<@110932722322505728> succs");
    games = ["with " + bot.users.length + " users!", "with over 500 lines of code!", "with eggs and ham!", "with Ian's sanity!", "in Yoshi's Island!"]
    randGame = Math.floor(Math.random() * 5);
    bot.setPlayingGame(games[randGame]);
});


bot.on("serverNewMember", function (server, user) {
    bot.sendMessage("136609300700332032", "Welcome, " + user + ", to our little piece of Discord: Shitpost Central - Live. We're really glad to have ya and we hope that you will enjoy your time here to the fullest. We encourage you to head on to <#169511435347558400> to ensure you know all the rules and become informed in the extents of each channel. If you have any questions, feel free to ask the admin or the mods, they'll be happy to answer. Cya around!");
});

bot.on("message", function (msg) {
    //check if message is a command
    if (msg.author.id != bot.user.id && (msg.content[0] === '!')) {
        if (msg.channel.isPrivate === false && msg.channel.server.id === "136609300700332032" && (msg.channel.id != "168188374023274496" && msg.channel.id != "137676980387577857")) {
            bot.sendMessage(msg.channel, "Use #bots_channel, please.");
        }
        else {
            console.log("treating " + msg.content + " from " + msg.author + " as command");
            var msgcmd = msg.content.split(" ")[0].substring(1);
            var params = msg.content.substring(msgcmd.length + 2);
            var cmd = commands[msgcmd];

            if(msgcmd == "help"){
                bot.sendMessage(msg.channel, "These are the commands I can use:", function(){
                    var info = "```";
                for(var command in commands) {
                    info += "!" + command;
                    var usage = commands[command].usage;
                    if(usage){
                        info += " " + usage;
                    }
                    var description = commands[command].description;
                    if(description){
                        info += "\n\t" + description + "\n\n";
                    }
                }
                info += "```";
                bot.sendMessage(msg.channel, info);
                });
            }
            else if(cmd) {
                cmd.process(bot,msg,params);
            }
            else {
                return;
            }
        }
    }
    else if (msg.content.indexOf(bot.user.mention()) != -1 && msg.content[0] != '!') { //Customized language responses.
        var choice = Math.floor((Math.random() * 6));
        if (msg.content.toLowerCase().indexOf("hello") != -1 || msg.content.toLowerCase().indexOf("hi ") != -1 || msg.content.toLowerCase().indexOf("welcome") != -1) { //Greetings.
            var response = ["Hello to you, ", "Greetings, ", "Hi there, ", "Hiya, ", "Howdy, ", "*Yoshi-yosh*, "];
            bot.sendMessage(msg.channel, response[choice] + msg.author + "!");
        }
        else if (msg.content.toLowerCase().indexOf("thank you") != -1 || msg.content.toLowerCase().indexOf("thanks") != -1 || msg.content.toLowerCase().indexOf("thank") != -1 || msg.content.toLowerCase().indexOf("thx") != -1 || msg.content.toLowerCase().indexOf("thank u") != -1) { //Gratitude
            var response = ["my pleasure!", "you're absolutely welcome.", "no problem, buddy!", "anytime!", "glad to help!", "it was nothing!"];
            bot.reply(msg, response[choice]);
        }
        else if (msg.content.length === 21) { //Only a mention.
            if (choice === 1 || choice === 2) {
                bot.reply(msg, "may I help you? Use \"!help @Yoshi Bot\" to learn about my commands.");
            }
            else if (choice === 3 || choice === 4) {
                bot.reply(msg, "what can I do for you? Use \"!help @Yoshi Bot\" if you aren't aware of my options.");
            }
            else if (choice === 5 || choice === 6) {
                bot.reply(msg, "you called? Try \"!help @Yoshi Bot\" to see what you could ask me to do.");
            }
        }
        else { //Anything else.
            var response = ["no u", "Y- Yoshi..?", "isokay.", "Ian, my creator, is a ~~dirty furfag~~ nice guy.", "you must have called me here for a reason... right?", "fun fact: Ian only gave me 6 options in my random language responses."];
            bot.reply(msg, response[choice]);
        }
    }
});
