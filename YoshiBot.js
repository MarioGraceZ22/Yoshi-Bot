try {
    var Discord = require("discord.js");
}
catch (e) {
    console.log(e.stack);
    console.log(process.version);
    console.log("I think there is a complete lack of everything here... I mean, do you even want to start? There is no 'discord.js.'");
    process.exit();
}

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

var bot = new Discord.Client({autoReconnect: true, disableEvents: ["TYPING_START", "TYPING_STOP", "GUILD_MEMBER_SPEAKING", "GUILD_MEMBER_AVAILABLE", "PRESSENCE_UPDATE"]});

bot.login(auth.token);

bot.on("ready", function () {
    console.log("New and rehauled Yoshi-Bot online and ready to serve!");
    var users = bot.users.array();

    games = ["with " + users.length + " users!", "with over 500 lines of code!", "with eggs and ham!", "with Ian's sanity!", "in Yoshi's Island!", "Dunkin' Nose Simulator", "Super Smash Brothers"]
    randGame = Math.floor(Math.random() * games.length);
    bot.user.setStatus('online', games[randGame]);
});

bot.on("guildMemberAdd", (guild, member) => {
    if(guild.id == "136609300700332032"){
        bot.channels.get("136609300700332032").sendMessage("Welcome, " + member.user + ", to our little piece of Discord: **" + guild.name + "**. We're really glad to have ya and we hope that you will enjoy your time here to the fullest. We encourage you to head on to <#169511435347558400> to ensure you know all the rules and become informed in the extents of each channel. If you have any questions, feel free to ask the admin or the mods, they'll be happy to answer. Cya around!");
    }
});

bot.on("messageDelete", (message) => {
    var t = new Date(Date.now());
    if(message){
        if(message.guild.id == "136609300700332032"){
            bot.channels.get("220258542131740672").sendMessage("```" + t + "```" + "Message by **" + message.author.username + "#" + message.author.discriminator + "** was deleted in " + message.channel.name + "\n**Message: **" + message.content);
        }
    }
});

bot.on("messageUpdate", (oldMessage, newMessage) =>{
    var d = new Date(Date.now());
    if(oldMessage.author.id !== bot.user.id){
        if(oldMessage && newMessage){
            if(oldMessage !== newMessage){
                if(newMessage.guild.id == "136609300700332032"){
                    bot.channels.get("220258542131740672").sendMessage("```" + d + "```" + "Message by **" + newMessage.author.username + "#" + newMessage.author.discriminator + "** was updated in " + newMessage.channel + "\n**Old:** " + oldMessage.content + "\n**New:** " + newMessage.content);
                }
            }
        }
    }
});

bot.on("message", function (msg) {
    //check if message is a command
    if (msg.author.id != bot.user.id && (msg.content[0] === '!')) {
        if (msg.channel.isPrivate === false && msg.channel.server.id === "136609300700332032" && (msg.channel.id != "168188374023274496" && msg.channel.id != "137676980387577857")) {
            msg.channel.sendMessage("Use #bots_channel, please.");
        }
        else {
            var msgcmd = msg.content.split(" ")[0].substring(1);
            var params = msg.content.substring(msgcmd.length + 2);
            for(var module in commands){
                for(var cmnd in commands[module].commands){
                    if(cmnd == msgcmd){
                        var cmd = commands[module].commands[msgcmd];
                        break;
                    }
                }
            }

            if(msgcmd == "help"){
                console.log("treating " + msg.content + " from " + msg.author + " as command");
                var info = "```";
                if(params){
                    if(commands[params]){
                        msg.channel.sendMessage("These are the commands for the module **" + params + "**:").then(msg => {
                            for(var command in commands[params].commands){
                                info += "!" + command;
                                var usage = commands[params].commands[command].usage;
                                if(usage){
                                    info += " " + usage;
                                }
                                var description = commands[params].commands[command].description;
                                if(description){
                                    info += "\n\t" + description + "\n\n";
                                }
                            }
                            info += "```";
                            msg.channel.sendMessage(info);
                        });
                    }
                    else{
                         msg.channel.sendMessage("I don't believe that's a module, bud.");
                    }
                }
                else{
                    msg.channel.sendMessage("Please tell me which module you would like to learn about:").then(msg => {
                        for(var module in commands) {
                            info += module;
                            var help = commands[module].help;
                            if(help){
                                info += " - " + help;
                            }
                            var description = commands[module].description;
                            if(description){
                                info += "\n\t" + description + "\n\n";
                            }
                        }
                        info += "```";
                        msg.channel.sendMessage(info);
                    });
                }
            }
            else if(cmd) {
                console.log("treating " + msg.content + " from " + msg.author + " as command");
                cmd.process(bot,msg,params);
            }
            else {
                return;
            }
        }
    }
    else if (msg.content.indexOf("<@182989844136329217>") != -1 && msg.content[0] != '!') { //Customized language responses.
        var choice = Math.floor((Math.random() * 6));
        if (msg.content.toLowerCase().indexOf("hello") != -1 || msg.content.toLowerCase().indexOf("hi ") != -1 || msg.content.toLowerCase().indexOf("welcome") != -1) { //Greetings.
            var response = ["Hello to you, ", "Greetings, ", "Hi there, ", "Hiya, ", "Howdy, ", "*Yoshi-yosh*, "];
            msg.channel.sendMessage(response[choice] + msg.author + "!");
        }
        else if (msg.content.toLowerCase().indexOf("thank you") != -1 || msg.content.toLowerCase().indexOf("thanks") != -1 || msg.content.toLowerCase().indexOf("thank") != -1 || msg.content.toLowerCase().indexOf("thx") != -1 || msg.content.toLowerCase().indexOf("thank u") != -1) { //Gratitude
            var response = ["my pleasure!", "you're absolutely welcome.", "no problem, buddy!", "anytime!", "glad to help!", "it was nothing!"];
            msg.reply(response[choice]);
        }
        else if (msg.content.length === 21) { //Only a mention.
            if (choice === 1 || choice === 2) {
                msg.reply("may I help you? Use \"!help\" to learn about my commands.");
            }
            else if (choice === 3 || choice === 4) {
                msg.reply("what can I do for you? Use \"!help\" if you aren't aware of my options.");
            }
            else if (choice === 5 || choice === 6) {
                msg.reply("you called? Try \"!help\" to see what you could ask me to do.");
            }
        }
        else { //Anything else.
            var response = ["no u", "Y- Yoshi..?", "isokay.", "Ian, my creator, is a ~~dirty furfag~~ nice guy.", "you must have called me here for a reason... right?", "fun fact: Ian only gave me 6 options in my random language responses."];
            msg.reply(response[choice]);
        }
    }
});
