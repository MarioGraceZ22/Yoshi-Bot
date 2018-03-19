try {
    var Discord = require("discord.js");
}
catch (e) {
    console.log(e.stack);
    console.log(process.version);
    console.log("I think there is a complete lack of everything here... I mean, do you even want to start? There is no 'discord.js.'");
    process.exit();
}

try {
    var fs = require("fs"); 
}
catch(e) {
    console.log("Well, no reading files, then. 'fs' is kinda necessary for that.");
    process.exit()
}

try{
    var simpleGit = require('simple-git');
}
catch(e){
    console.log("You're missing 'simple-git' from your dependencies! Surely you want this bot to update, right?");
}

try{
    var exec = require('child_process').exec;
}
catch(e){
    console.log("Now now, if you don't have 'child_process', Yoshi won't be able to restart.");
}

try{
    var moment = require('moment');
}
catch(e){
    console.log("You must get 'moment' in a TIMEly manner... just get the module.");
}

try{
    var auth = require("./auth.json");
}
catch(e){
    console.log("You aren't getting very far without an 'auth.json'... just sayin'.");
    process.exit();
}

try{
    var YouTube = require('youtube-node');
    var yt = new YouTube();

    yt.setKey(auth.yt);
    yt.addParam('type', 'video');
}
catch(e){
    console.log("There is no 'youtube-node' here... I guess you don't want YouTube videos.");
}

try{
	var ytdl = require('ytdl-core');
}
catch(e){
	console.log("You know, streaming audio isn't too important... but if you care, we need ytdl-core.");
}

try {
    var request = require("request");
}
catch (e) {
    console.log("I'm REQUESTing you to get 'request.' I need it for pretty much everything.")
}

try {
    var cleverbot = require("cleverbot.io");
    var CleverBot = new cleverbot('qnZi4MTKo6zwwFkh','fM2qdIkZeGiC66ADn9ylCz9nZopCAfuN');
    CleverBot.setNick("Yoshi-Bot");
    CleverBot.create(function (err, session) {
    });
}
catch(e) {
    console.log("Oh, I see. You don't want to talk to me... you don't even have 'cleverbot.io'");
}

let userInfo = JSON.parse(fs.readFileSync('./data/info.json', 'utf8'));

var confusResponses = [
	"You... what, now?",
	"Pardon me?",
	"Hah, yeah... what?",
	"Sorry, I have no idea what that means.",
	"Come again?",
	"Maybe you should try something else there, buddy.",
	"Um, Y-Yoshi..?",
	"I tried to understand, trust me, but I just cannot.",
	"Nope, dunno what you need, pal."
]

var estoBanList = [
    "murder",
    "suicidal",
    "suicide",
    "dead",
    "retard",
    "gore",
    "retarded",
    "cancer",
    "cancerous",
    "scat",
    "shit",
    "crap",
    "poo",
    "pee",
    "feces",
    "urin",
    "piss",
    "diaper",
    "baby",
    "babies",
    "defecation",
    "child",
    "kid",
    "tod",
    "toddler",
    "cake_farts",
    "diarrhea",
    "soiled",
    "vore",
    "snuff",
    "watersports",
    "unbirthing",
    "hyper",
    "expansion",
    "inflation",
    "guro",
    "nightmare_fuel"
]

var infoCategories = {
    games: {alias: "Games", value: ""},
    fursona: {alias: "Fursona", value: ""},
    furaffinity: {alias: "FurAffinity", value: ""},
    twitter: {alias: "Twitter", value: ""},
    youtube: {alias: "YouTube", value: ""},
    steam: {alias: "Steam", value: ""},
    nnid: {alias: "NNID", value: ""},
    note: {alias: "Note", value: ""},
    image: {alias: "Image", value: ""},
    updatedAt: ""
}

var songQueue = {
	
}


exports.commands = {
    "mod": {
        description: "All commands useful for moderation and debugging of the bot.",
        help: "!help mod",
        commands: {
            "ping": {
                usage: "!ping",
                description: "I'll respond with a \"pong.\" Useful for checking if I'm alive.",
                process: function(bot, msg, params, choice){
                    msg.channel.send("Pong!").then(m => m.edit(`Pong! | Took ${m.createdTimestamp - msg.createdTimestamp}ms`)) //This will show how fast the bot is responding
                }
            },

            "bye": {
                usage: "!bye",
                description: "Shuts down the bot.",
                process: function(bot, msg, params, choice){
                    if (msg.author.id === "110932722322505728") {
                        msg.channel.send("Goodbye, everyone!").then(message => {
                            bot.destroy();
                        });
                    }
                    else {
                        msg.reply("I can't really take that order from you. Sorry. :c");
                    }
                }
            },

            "update": {
                usage: "!update",
                description: "Will check if there is a new updated available. If update is found, will attempt to restart with the new code.",
                process: function(bot, msg, params, choice){
                    if (msg.author.id === "110932722322505728"){
                        if(bot.voiceConnection){
                            bot.voiceConnection.destroy();
                        }
                        msg.channel.send("Checking for updates...");
                        simpleGit().pull(function(error, update) {
                            if(update && update.summary.changes) {
                                msg.channel.send("Be right back!").then(message => {
                                    exec('node YoshiBot.js', (error, stdout, stderr) => {
                                        if (error) {
                                            console.error(`exec error: ${error}`);
                                            return;
                                        }
                                        console.log(`stdout: ${stdout}`);
                                        console.log(`stderr: ${stderr}`);
                                    });
                                    bot.destroy();
                                }).catch(console.log);
                            }
                            else{
                                msg.channel.send("Already up to date.");
                                console.log(error);
                            }
                        });
                    }
                    else{
                        msg.reply("I can't really take that order from you. Sorry. :c");
                    }
                }
            },

            "restart": {
                usage: "!restart",
                description: "Forces Yoshi-Bot to restart without needing to update.",
                process: function(bot, msg, params, choice){
                    if (msg.author.id === "110932722322505728"){
                        if(bot.voiceConnection){
                            bot.voiceConnection.destroy();
                        }
                        msg.channel.send("Be right back!").then(message => {
                            exec('node YoshiBot.js', (error, stdout, stderr) => {
                                if (error) {
                                    console.error(`exec error: ${error}`);
                                    return;
                                }
                                console.log(`stdout: ${stdout}`);
                                console.log(`stderr: ${stderr}`);
                            });
                            bot.destroy();
                        }).catch(console.log);
                    }
                }
            },

            "clean": {
                usage: "<number of messages to delete> (Ex. !clean 5)",
                description: "Deletes the amount of given messages (as a number) in the channel.",
                process: function(bot, msg, params, choice){
                    if (msg.member.hasPermission('MANAGE_MESSAGES')){
                        if(params){
                            if(!isNaN(params)){
                                msg.channel.fetchMessages({before: msg.id, limit: params}).then(messages => {
                                    msg.channel.bulkDelete(messages);
                                    msg.channel.send(params + " messages successfully deleted!");
                                }).catch(console.log);
                            }
                            else{
                                    msg.channel.send("That's not a number, silly.");
                            }
                        }
                        else{
                            msg.channel.send("I need to know how many messages to delete, buddy.");
                        }
                    }
                    else{
                        msg.reply("I can't really take that order from you. Sorry. :c");
                    }
                }
            },

            "role": {
                usage: "<give or take> <user> <role name> (Ex. !role give @Ian#4208 Moderator)",
                description: "Gives or takes a role from a user, depending on specified action.",
                process: function(bot, msg, params, choice){
                    if (msg.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')){
                        var options = params.split(" ");
                        if(options.length < 3){
                            msg.channel.send("The amount of parameters you gave me is incorrect. Usage: `!role <give or take> <user> <role name>`");
                            return;
                        }

                        var roleString = "";
                        for(var i = 2; i < options.length; i++){
                            roleString += options[i] + " ";
                        }

                        var user = msg.guild.members.get(options[1].replace(/[^\w\s]/gi, ''));
                        var role = msg.guild.roles.find('name', roleString.trim());
                        if(user != null){
                            if(role !== null){
                                if(options[0] == "give"){
                                    user.addRole(role.id).then(member => {
                                        msg.channel.send("User " + user + " now has the role **" + roleString.trim() + "**.");
                                    }).catch(console.error);
                                }
                                else if(options[0] == "take"){
                                    user.removeRole(role.id).then(member => {
                                        msg.channel.send("User " + user + " no longer has the role **" + roleString.trim() + "**.");
                                    }).catch(console.error);
                                }
                                else{
                                    msg.channel.send(confusResponses[choice]);
                                }
                            }
                            else{
                                msg.channel.send("\"" + roleString.trim() + "\" might not be a role in this server.");
                            }
                        }
                        else{
                            msg.channel.send("Sorry, I am unable to find the user \"" + options[1] + "\".");
                        }
                    }
                    else{
                        msg.reply("I can't really take that order from you. Sorry. :c");
                    }
                }
            },

            "kick": {
                usage: "<user> (Ex. !kick @Ian#4208)",
                description: "Kicks the specified user from the server.",
                process: function(bot, msg, params, choice){
                    if (msg.member.hasPermission("KICK_MEMBERS")){
                        var user = msg.guild.members.get(params.replace(/[^\w\s]/gi, ''));
                        if(user != null){
                            user.kick().then(member => {
                                msg.channel.send("User " + user + " has been kicked from the server.");
                            }).catch(console.error);
                        }
                        else{
                            msg.channel.send("Sorry, I am unable to find the user \"" + params + "\".");
                        }
                    }
                    else{
                        msg.reply("I can't really take that order from you. Sorry. :c");
                    }
                }
            },

            "ban": {
                usage: "<user> (Ex. !ban @Ian#4208)",
                description: "Bans the specified user from the server.",
                process: function(bot, msg, params, choice){
                    if (msg.member.hasPermission("BAN_MEMBERS")){
                        var user = msg.guild.members.get(params.replace(/[^\w\s]/gi, ''));
                        if(user != null){
                            user.ban(7).then(member => {
                                msg.channel.send("User " + user + " has been banned from the server.");
                            }).catch(console.error);
                        }
                        else{
                            msg.channel.send("Sorry, I am unable to find the user \"" + params + "\".");
                        }
                    }
                    else{
                        msg.reply("I can't really take that order from you. Sorry. :c");
                    }
                }
            },

            "config": {
                usage: "<setting to configure> <parameter> (Ex. !config prefix ^)",
                description: "Allows you to configure different settings about the bot for your server, such as a prefix for commands, logging, and welcome messages.",
                process: function(bot, msg, params, choice){
                	if(msg.channel.type == "dm"){
                		msg.channel.send("You cannot change the settings for these Direct Messages (for now).");
                		return;
                	}
                	let serversInfo = JSON.parse(fs.readFileSync('./data/servers.json', 'utf8'));
                    if(msg.member.roles.find('name', ">> Bot Privs <<")){
                        params += " ";
                        var firstOption = params.substring(0, params.indexOf(" ")); 
                        if(firstOption == "help"){
                            var helpString = "Here's how you can configure the bot for your server:\n";
                            helpString += "`!config prefix <special character>`: Customizes the prefix to use for commands in your server. Cannot be a number or a letter.\n";
                            helpString += "`!config logging <(enable|disable)/channel> [channel link]`: Enables logging (deleted/edited messages) or sets the logging channel. A logging channel must be set to enable.\n";
                            helpString += "`!config welcome <(enable|disable)/channel/message> [channel link/message]`: Enables welcome messages for new users, sets the channel to say welcomes in, or sets the welcome message.\n";
                            msg.channel.send(helpString);
                        }
                        else if(firstOption == "prefix"){
                            prefix = params.substring(params.indexOf(" ") + 1).trim();
                            if(prefix.length > 2){
                                msg.channel.send("Okay, buddy, I don't think having a prefix that long would be a good idea. Just saying.");
                                return;
                            }
                            var regex = /^[^\w\s]+$/;
                            if(regex.exec(prefix) != null){
                                serversInfo[msg.guild.id].prefix = prefix;
                                fs.writeFile('./data/servers.json', JSON.stringify(serversInfo), (err) => {
                                if (err) throw err;
                                  console.log('It\'s saved!');
                                });
                                msg.channel.send("The prefix for this server has been successfully updated to `" + prefix + "`.");
                            }
                            else{
                            	msg.channel.send("Remember, you can only use special characters for the server prefix. Examples: `!`,`$`,`^`,`.`,`,`,`!!`,`!%`, etc.");
                            }
                        }
                        else if(firstOption == "logging"){
                            otherOptions = params.substring(params.indexOf(" ") + 1).trim();
                            otherOptions = otherOptions.split(" ");
                            if(otherOptions[0] == "enable"){
                            	if(serversInfo[msg.guild.id].log_channel != null){
                            		serversInfo[msg.guild.id].logging_enabled = true;
                            		fs.writeFile('./data/servers.json', JSON.stringify(serversInfo), (err) => {
	                                if (err) throw err;
	                                  console.log('It\'s saved!');
	                                });
	                                msg.channel.send("Message logging has been **enabled** in this server.");
	                                return;
                            	}
                            	msg.channel.send("To enable message logging, first **set a logging channel** with `!config logging channel <channel link>`.")
                            }
                            else if(otherOptions[0] == "disable"){
                            	serversInfo[msg.guild.id].logging_enabled = false;
                        		fs.writeFile('./data/servers.json', JSON.stringify(serversInfo), (err) => {
                                if (err) throw err;
                                  console.log('It\'s saved!');
                                });
                            	msg.channel.send("Message logging has been **disabled** in this server.");
                            }
                            else if(otherOptions[0] == "channel"){
                            	var channelRegex = /^<#[0-9]+>$/;
                            	if(channelRegex.exec(otherOptions[1]) != null){
                            		serversInfo[msg.guild.id].log_channel = otherOptions[1].replace(/[^\w\s]/gi, '');
                            		fs.writeFile('./data/servers.json', JSON.stringify(serversInfo), (err) => {
	                                if (err) throw err;
	                                  console.log('It\'s saved!');
	                                });
	                                msg.channel.send("The logging channel for this server has been successfully updated to " + otherOptions[1] + ".");
	                                return;
                            	}
                            	msg.channel.send("I couldn't parse that as a channel link. Remember, a channel link looks like `#channel_name`.");
                            }
                            else{
                            	msg.channel.send(confusResponses[choice]);
                            }
                        }
                        else if(firstOption == "welcome"){
                            otherOptions = params.substring(params.indexOf(" ") + 1).trim();
                            otherOptions = otherOptions.split(" ");
                            if(otherOptions[0] == "enable"){
                                if(serversInfo[msg.guild.id].welcome_channel != null && serversInfo[msg.guild.id].welcome_channel != null){
                                	serversInfo[msg.guild.id].welcome_enabled = true;
                            		fs.writeFile('./data/servers.json', JSON.stringify(serversInfo), (err) => {
	                                if (err) throw err;
	                                  console.log('It\'s saved!');
	                                });
	                                msg.channel.send("New member welcomes have been **enabled** in this server.");
	                                return;
                                }
                                msg.channel.send("To enable new member welcomes, first **set a welcome channel** with `!config welcome channel <channel link>` **and then set a welcome message** with `!config welcome message <message>`.");
                            }
                            else if(otherOptions[0] == "disable"){
                            	serversInfo[msg.guild.id].welcome_enabled = false;
                        		fs.writeFile('./data/servers.json', JSON.stringify(serversInfo), (err) => {
                                if (err) throw err;
                                  console.log('It\'s saved!');
                                });
                            	msg.channel.send("New member welcomes have been **disabled** in this server.");
                            }
                            else if(otherOptions[0] == "channel"){
                            	var channelRegex = /^<#[0-9]+>$/;
                            	if(channelRegex.exec(otherOptions[1]) != null){
                            		serversInfo[msg.guild.id].welcome_channel = otherOptions[1].replace(/[^\w\s]/gi, '');
                            		fs.writeFile('./data/servers.json', JSON.stringify(serversInfo), (err) => {
	                                if (err) throw err;
	                                  console.log('It\'s saved!');
	                                });
	                                msg.channel.send("The welcoming channel for this server has been successfully updated to " + otherOptions[1] + ".");
	                                return;
                            	}
                            	msg.channel.send("I couldn't parse that as a channel link. Remember, a channel link looks like `#channel_name`.");
                            }
                            else if(otherOptions[0] == "message"){
                            	otherOptions[0] = "";
                            	var welcomeMessage = otherOptions.join(" ");

                            	serversInfo[msg.guild.id].welcome_message = welcomeMessage.substring(1);
                            	fs.writeFile('./data/servers.json', JSON.stringify(serversInfo), (err) => {
                                if (err) throw err;
                                  console.log('It\'s saved!');
                                });
                                msg.channel.send("The welcome message for this server has been successfully updated to: \n```" + welcomeMessage.substring(1) + "```");
                                return;
                            }
                            else{
                            	msg.channel.send(confusResponses[choice]);
                            }
                        }
                        else{
                            msg.channel.send("Oh, let me give you a hand with that! Get started with `!config help` to learn about it! :3");
                        }
                    }
                    else{
                        msg.reply("I can't really take that order from you. You need a role by the name `>> Bot Privs <<`. Sorry. :c");
                    }
                }
            },

            "test": {
                usage: "lel",
                description: "This is a testing space. It will change periodically as I need to test new things.",
                process: function(bot, msg, params, choice){
                    msg.channel.send("Currently, I do not have a function for this command.");
                }
            }
        }
    },

    "images": {
        description: "All commands pertaining to image-hosting sites and image boards.",
        help: "!help images",
        commands: {
            "e621": {
                usage: "<tags> (Ex. !e621 canine, anthro, blue eyes)",
                description: "It returns an image (rating based on channel) from e621 based on tags (separated by a comma and a space) given.",
                process: function(bot, msg, params, choice){
                    var tagesto = "";
                    var tagestosplit = params.split(",");
                    for (var i = 0; i < tagestosplit.length; i++) {
                        tagestosplit[i] = tagestosplit[i].trim();
                        tagestosplit[i] = tagestosplit[i].replace(/\s/g, "_");
                        if(estoBanList.indexOf(tagestosplit[i]) != -1){
                            msg.channel.send("No. Stop it.");
                            return;
                        }
                    }

                    tagesto = tagestosplit.join("+");

                    if (msg.channel.type === "dm" || msg.channel.name.indexOf("the_art_gallery") != -1 || msg.channel.name.indexOf("furry") != -1 || msg.channel.name.indexOf("2am") != -1 || msg.channel.name.indexOf("nsfw") != -1) {
                        console.log("Safe to post NSFW content.");
                    }
                    else {
                        tagesto += "+rating:safe";
                        if ((tagesto.indexOf("rating:explicit") != -1) || (tagesto.indexOf("penis") != -1) || (tagesto.indexOf("pussy") != -1) || (tagesto.indexOf("anus") != -1) || (tagesto.indexOf("dick") != -1) || tagesto.indexOf("rating:questionable") != -1 || tagesto.indexOf("genitalia") != -1 || tagesto.indexOf("genitals") != -1 || tagesto.indexOf("genital") != -1 || tagesto.indexOf("vagina") != -1 || tagesto.indexOf("cunt") != -1 || tagesto.indexOf("vaginal") != -1 || tagesto.indexOf("vaginal_penetration") != -1 || tagesto.indexOf("sex") != -1 || tagesto.indexOf("fuck") != -1 || tagesto.indexOf("intercourse") != -1 || tagesto.indexOf("cock") != -1) {
                            msg.channel.send("That content isn't appropiate for this channel. Go be naughty elsewhere.", {files:[{attachment: __dirname + bruh.jpg}]});
                            return;
                        }
                    }
                    var estoHeader = {
                        url: 'https://e621.net/post/index.json?tags=order:random+' + tagesto,
                        headers: {
                            'User-Agent': 'Yoshi-Bot/${process.version} (by NeoNinetales on e621)'
                        }
                    }

                    request(estoHeader,
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var estoThing = JSON.parse(body);
                            if (typeof (estoThing[0]) != "undefined") {
                                msg.channel.send(estoThing[0].file_url.toString());
                                msg.channel.send("https://e621.net/post/show/" + estoThing[0].id.toString());
                            }
                            else {
                                msg.channel.send("No images found. Try different tags.")
                            }
                        }
                        else {
                            console.log(error);
                            msg.channel.send("The API isn't working and this is why I'm crashing.");
                            msg.channel.send(error);
                        }
                    });
                }
            },

            "mlfw": {
                usage: "<tags> (Ex. !mlfw twilight sparkle, happy)",
                description: "Returns a pony reaction image based on tags (separated by a comma and a space) given.",
                process: function(bot, msg, params, choice){
                    var tagmlfw = "";
                    if (params.indexOf(',') != -1) {
                        tagmlfw = ("\"" + params.substring(0, params.indexOf(',')) + "\"" + ",");
                        var tagmlfwsplit = params.substring((params.indexOf(',') + 1),params.length).split(",");
                        for (var i = 0; i < tagmlfwsplit.length; i++) {
                            if (i === (tagmlfwsplit.length - 1)) {
                                tagmlfw += "\"" + tagmlfwsplit[i].substring(1, tagmlfwsplit[i].length) + "\"";
                            }
                            else {
                                tagmlfw += "\"" + tagmlfwsplit[i].substring(1, tagmlfwsplit[i].length) + "\","
                            }
                        }
                    }
                    else {
                        tagmlfw = "\"" + params + "\"";
                    }
                    request("http://mylittlefacewhen.com/api/v2/face/?search=[" + tagmlfw + "]&order_by=random&format=json",
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var mlfwThing = JSON.parse(body);
                            if (typeof (mlfwThing.objects[0]) != "undefined") {
                                msg.channel.send("http://mylittlefacewhen.com/" + mlfwThing.objects[0].image.toString());
                            }
                            else {
                                msg.channel.send("No images found. Try different tags.")
                            }
                        }
                        else {
                            console.log(error);
                            msg.channel.send(error);
                        }
                    });
                }
            },

            "subr": {
                usage: "<subreddit name> (Ex. !subr wheredidthesodago)",
                description: "Will return a random post from the user given subreddit using reddit's own \"random.\"",
                process: function(bot, msg, params, choice){
                    request("https://www.reddit.com/r/" + params + "/random/.json", function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var srThing = JSON.parse(body);
                            if(typeof (srThing.data) !== "undefined"){
                                msg.channel.send("I don't believe that's a subreddit. ~~Either that or it's banned, you sicko.~~");
                            }
                            else {
                                if (typeof(srThing[0].data.children[0].data.url) !== "undefined") {
                                    msg.channel.send(srThing[0].data.children[0].data.url);
                                }
                            }
                        }
                        else {
                            console.log(error);
                            msg.channel.send("I don't believe that's a subreddit. ~~Either that or it's banned, you sicko.~~");
                        }
                    });
                }
            },

            "woof": {
                usage: "!woof",
                description: "Returns a random woof image.",
                process: function(bot, msg, params, choice){
                    request("http://random.dog/woof", function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            if (typeof (body) != "undefined") {
                                msg.channel.send("http://random.dog/" + body);
                            }
                            else {
                                msg.channel.send("Things are going wrong all over.");
                            }
                        }
                    });
                }
            },

            "meow": {
                usage: "!meow",
                description: "Returns a random meow image.",
                process: function(bot, msg, params, choice){
                    request("http://random.cat/meow", function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var meowThing = JSON.parse(body);
                            if (typeof (meowThing.file) != "undefined") {
                                msg.channel.send(meowThing.file);
                            }
                            else {
                                msg.channel.send("Things are going wrong all over.");
                            }
                        }
                    });
                }
            }
        }
    },

    "fun": {
        description: "All miscellaneous, recreational commands.",
        help: "!help fun",
        commands: {
            "servers": {
                usage: "!servers",
                description: "List of servers I am in.",
                process: function(bot, msg, params, choice){
                    msg.channel.send("**I am currently serving in:** \n```\n" + bot.guilds.map(g=>g.name).join("\n") + "\n```");
                }
            },

            "avie": {
                usage: "[Optional] <name or name portion> (Ex. '!avie Ian' or '!avie')",
                description: "Returns the avatar image of the specified user. If no user is specified, returns the avatar image of the author.",
                process: function(bot, msg, params, choice){
                    if (params) {
                        if (bot.users.find("username", params) != null) {
                            msg.channel.send(bot.users.find("username", params).avatarURL);
                        }
                        else {
                            var regst = /^[^\s]+/;
                            var regend = /[^\s]+$/;
                            var match = true;
                            var users = bot.users.array();
                            var members = msg.guild.members.array();
                            for (var i = 0; i < users.length ; i++) {
                                if (regst.exec(users[i].username)[0] === params) {
                                    match = true;
                                    msg.channel.send(users[i].avatarURL);
                                    return;
                                }
                                else if (regend.exec(users[i].username)[0] === params) {
                                    match = true;
                                    msg.channel.send(users[i].avatarURL);
                                    return;
                                }
                                else {
                                    match = false;
                                }
                            }

                            for (var i = members.length - 1; i >= 0; i--) {
                            	if (members[i].nickname != null && regst.exec(members[i].nickname)[0] === params) {
                                    match = true;
                                    msg.channel.send(members[i].user.avatarURL);
                                    return;
                                }
                                else if (members[i].nickname != null && regend.exec(members[i].nickname)[0] === params) {
                                    match = true;
                                    msg.channel.send(members[i].user.avatarURL);
                                    return;
                                }
                                else {
                                    match = false;
                                }
                            }
                            if (match === false) {
                                msg.channel.send("I couldn't find the user you requested.");
                            }
                        }
                    }
                    else {
                        msg.channel.send(msg.author.avatarURL);
                    }
                }
            },

            "pick": {
                usage: "<options to pick from> (Ex. !pick option1, option2, option3)",
                description: "Will randomly pick from the number of options given by the user, separated by commas and spaces.",
                process: function(bot, msg, params, choice){
                    var options = params.split(",");
                    var randomChoice = Math.floor(Math.random() * options.length);
                    options[0] = " " + options[0];

                    msg.channel.send("You must go with" + options[randomChoice] + ", " + msg.author + ".");
                }
            },

            "kms": {
                usage: "!kms",
                description: "You asked for death.",
                process: function(bot, msg, params, choice){
                    msg.channel.send("You're dead, kiddo. ᕕ[•̀͜ʖ•́]︻̷┻̿═━一 ---", {tts: true});
                }
            },

            "info": {
                usage: "[Optional] <user tag or `add`> (Ex. '!info @Ian#4208' or '!info')",
                description: "Will give information about the requested user or the author of the message, if a profile is set up. Otherwise, set up a profile.",
                process: function(bot, msg, params, choice){
                    var options = params.split(" ");
                    var regMention = /^<[@\w]+>$/;
                    if(params == ""){
                        if(!userInfo[msg.author.id]){
                            msg.channel.send("It appears to me that you don't have a profile set up yet! Get started with `!info help` c:");
                            return
                        }

                        var infoEmbed = new Discord.RichEmbed();

                        var toAuthor = msg.member.nickname != null ? msg.member.nickname : msg.author.username;

                        infoEmbed.setAuthor(toAuthor + "'s Profile", msg.author.avatarURL);
                        infoEmbed.setColor(16181338);
                        infoEmbed.setTimestamp(userInfo[msg.author.id]["updatedAt"]);
                        if(userInfo[msg.author.id]["image"].value != ""){
                            infoEmbed.setThumbnail(userInfo[msg.author.id]["image"].value);
                        }
                        
                        for(category in userInfo[msg.author.id]){
                            if(userInfo[msg.author.id][category].value != "" && category != "image" && category != "updatedAt"){
                                infoEmbed.addField(userInfo[msg.author.id][category].alias, userInfo[msg.author.id][category].value, true);
                            }
                        }

                        msg.channel.sendEmbed(infoEmbed);
                        return;
                    }
                    else if(options[0] == "help"){
                        help = "To use this command, you can do one of the following:\n`!info add <category>` will allow you to add to a certain category.\n**Available categories:** `"
                        for(category in infoCategories){
                            if(category != "updatedAt"){
                                help += category + ", ";
                            }
                        }
                        help = help.substring(0, help.length - 2) + "`";
                        msg.channel.send(help);
                    }
                    else if(regMention.exec(options[0]) != null){
                        user = msg.guild.members.get(options[0].replace(/[^\w\s]/gi, ''));
                        if(!userInfo[user.id]){
                            msg.channel.send("It appears to me that this user does not have a profile set up yet.");
                            return;
                        }

                        var infoEmbed = new Discord.RichEmbed();

                        var toAuthor = user.nickname != null ? user.nickname : user.user.username;

                        infoEmbed.setAuthor(toAuthor + "'s Profile", user.user.avatarURL);
                        infoEmbed.setColor(16181338);
                        infoEmbed.setTimestamp(userInfo[user.id]["updatedAt"]);
                        if(userInfo[user.id]["image"].value != ""){
                            infoEmbed.setThumbnail(userInfo[user.id]["image"].value);
                        }

                        for(category in userInfo[user.id]){
                            if(userInfo[user.id][category].value != "" && category != "image" && category != "updatedAt"){
                                infoEmbed.addField(userInfo[user.id][category].alias, userInfo[user.id][category].value, true);
                            }
                        }

                        msg.channel.sendEmbed(infoEmbed);
                        return;
                        /*var infoString = user.nickname != null ? "```css\n" + user.nickname : "```css\n" + user.user.username;
                        infoString += "'s Profile:\n";
                        for(category in userInfo[user.id]){
                            if(userInfo[user.id][category].value != ""){
                                infoString += userInfo[user.id][category].alias + userInfo[user.id][category].value + "\n";
                            }
                        }

                        infoString += "```";

                        msg.channel.send(infoString);*/
                    }
                    else if(options[0] == "add"){
                        category = options[1].toLowerCase();
                        if(!infoCategories[category]){
                            msg.channel.send("Silly, I don't think '" + category + "' is a category.");
                            return;
                        }

                        var elementsString = "";
                        for(var i = 2; i < options.length; i++){
                            elementsString += options[i] + " ";
                        }
                        var elementsArray = elementsString.split(",");

                        elementsString = "";
                        for (var i = 0; i < elementsArray.length; i++){
                            elementsString += elementsArray[i].trim() + ", ";
                        }

                        elementsString = elementsString.substring(0, elementsString.length - 2);

                        if(elementsString == ""){
                        	msg.channel.send("You gave me no information here. Adding an empty field won't do much, don't you think?");
                        	return;
                        }

                        if(!userInfo[msg.author.id]){
                            userInfo[msg.author.id] = infoCategories;
                        }

                        userInfo[msg.author.id][category].value = elementsString;
                        userInfo[msg.author.id]["updatedAt"] = new Date(Date.now());
                        fs.writeFile('./data/info.json', JSON.stringify(userInfo), (err) => {
                          if (err) throw err;
                          console.log('It\'s saved!');
                        });
                        msg.channel.send("The category `" + category + "` has been updated successfully.");
                    }
                    else if(options[0] == "remove"){
                    	return;
                    }
                    else{
                    	msg.channel.send(confusResponses[choice]);
                    }
                }
            },

            "8ball": {
                usage: "<question> (Ex. !8ball Will Ian ever get a life?)",
                description: "Will briefly turn into the Magical 8 Ball and respond to whatever question you pose.",
                process: function(bot, msg, params, choice){
                    if(params){
                        request('https://8ball.delegator.com/magic/JSON/' + params, function(error, response, body){
                            if (!error && response.statusCode == 200){
                                answer = JSON.parse(body);
                                botResponse = "*The Magical 8 Ball answers...*\n";
                                botResponse += "`Question:` **" + params + "**\n";
                                botResponse += "`Answer:` **" + answer.magic.answer + "**";
                                msg.channel.send(botResponse);
                            }
                            else{
                                msg.channel.send("Whoops, I couldn't turn into an 8 Ball: " + error);
                            }
                        });
                    }
                }
            },

            "chat": {
                usage: "<text> (Ex. !chat Hello, how are you?)",
                description: "Allows you to chat with Yoshi-Bot! Aren't you itching to talk to someone? Here's your chance.",
                process: function(bot, msg, params, choice){
                    CleverBot.ask(params, function (err, response) {
                        msg.channel.send(msg.author + ": " + response);
                    });
                }
            }
        }
    },

    "media": {
        help: "!help media",
        description: "All commands pertaining to music streaming and videos.",
        commands: {
            "voice": {
                usage: "!voice",
                description: "Joins the voice channel the author of the command is in.",
                process: function(bot, msg, params, choice){
                    var voiceConnections = bot.voiceConnections.array();
                    if (voiceConnections.length == 0) {
                        if(msg.member.voiceChannel == null){
                            msg.channel.send("You have to be in a voice channel before I can join it.");
                        }
                        else{
                            msg.member.voiceChannel.join();
                            msg.channel.send("Voice channel joined.");
                        }
                    }
                    else {
                        var flag = 0;
                        console.log(voiceConnections[0].channel.guild.id);
                        for(connection = 0; connection < voiceConnections.length; connection++){
                            if(msg.guild.id == voiceConnections[connection].channel.guild.id){
                                msg.channel.send("I'm already in a voice channel.");
                                flag = 1;
                            }
                        }
                        if(flag == 0){
                            msg.member.voiceChannel.join();
                            msg.channel.send("Voice channel joined.");
                        }
                    }
                }
            },

            "play": {
                usage: "<YouTube link> (Ex. !play https://www.youtube.com/watch?v=vc6vs-l5dkc)",
                description: "Queues or plays (if nothing in queue) the requested song. CURRENTLY DOES NOT QUEUE. ONLY PLAYS SONG.",
                process: function(bot, msg, params, choice){
                    var voiceConnections = bot.voiceConnections.array();
                    var flag = false;
                    for (var i = voiceConnections.length - 1; i >= 0; i--) {
                        if(msg.guild.id == voiceConnections[i].channel.guild.id){
                            flag = true;
                            connection = voiceConnections[i];
                        }
                    }
                    if(flag){
                        var youTubeRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
                        if(youTubeRegex.exec(params) == null){
                            msg.channel.send("I cannot parse that as a YouTube link, sorry. Try with a different one.");
                            return;
                        }
                        try{
                        	msg.channel.send("Playing that for you in just a sec...");
	                    	stream = ytdl(params, {filter : 'audioonly'});
	                    	connection.playStream(stream, { seek: 0, volume: 0.75});
                        }
                        catch(err){
                        	msg.channel.send("Error: ```" + err + "```");
                        }
                    }
                    else{
                    	msg.channel.send("I'm not in a voice channel in this server. Join one and use !voice before you can use !play.")
                    }
                    /*if (msg.content.length > 5) {
                            if (bot.internal.voiceConnection) {
                                var songName = msg.content.substring(6, msg.content.length);
                                var connection = bot.internal.voiceConnection;
                                var filePath = "https://api.soundcloud.com/tracks/194566340/stream";
                                msg.channel.send("Playing that for you in a sec...");
                                connection.playRawStream(filePath, {volume: 0.3});
                            }
                        }
                        else {
                            msg.channel.send("I'm already in the voice channel. Give me something to play.");
                        }*/
                }
            },

            "volume": {
            	usage: "<decimal between 0.25 to 1.0> (Ex. !volume 0.75)",
            	description: "If the bot is currently playing something, it will change its volume.",
            	process: function(bot, msg, params, choice){
            		var voiceConnections = bot.voiceConnections.array();
            		params = parseFloat(params);
            		console.log(params);
            		if(params == NaN){
            			msg.channel.send("That's not a number, silly.");
            		}
            		for(connection = 0; connection < voiceConnections.length; connection++){
                        if(msg.guild.id == voiceConnections[connection].channel.guild.id){
                            flag = true;
                            serverConnection = voiceConnections[connection];
                        }
                    }

                    if(flag){
                    	flag = serverConnection.player.dispatcher ? true : false;
                    	if(flag){
                    		if(params <= 1.0 && params >= 0.25){
                    			serverConnection.player.dispatcher.setVolume(params);
                    			msg.channel.send("Volume was set to: **" + params + "**");
                    			return;
                    		}
                    		msg.channel.send("Make sure the volume value you're sending is between 0.25 and 1.0");
                    		return;
                    	}
                    }

                    msg.channel.send("I don't think anything is playing right now. I can't really change the volume of nothingness.");
            	}
            },

            "yt": {
                usage: "<search terms> (Ex. !yt PFUDOR)",
                description: "Returns the first YouTube video in a search based on the input query.",
                process: function(bot, msg, params, choice){
                    if(params){
                        yt.search(params, 5, function(error, result) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                for(item in result.items){
                                    var searchResult = new Discord.RichEmbed();
                                    searchResult.setColor("#E9003A");
                                    searchResult.setTitle(result.items[item].snippet.title);
                                    searchResult.setAuthor(result.items[item].snippet.channelTitle);
                                    searchResult.setURL("https://www.youtube.com/watch?v=" + result.items[item].id.videoId);
                                    searchResult.setTimestamp(result.items[item].snippet.publishedAt);
                                    searchResult.setDescription(result.items[item].snippet.description);
                                    searchResult.setThumbnail(result.items[item].snippet.thumbnails.default.url);
                                    msg.channel.sendEmbed(searchResult);
                                }
                            }
                        });
                    }
                    else{
                        msg.channel.send("Give me some search terms to look for, silly.");
                    }
                }
            }
        }
    }
}
