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
    var simpleGit = require('simple-git');
}
catch(e){
    console.log("You're missing 'simple-git' from your dependencies! Surely you want this bot to update, right?");
}

try{
    const exec = require('child_process').exec;
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
    var YouTube = require('youtube-node');
}
catch(e){
    console.log("There is no 'youtube-node' here... I guess you don't want YouTube videos.");
}

try{
    var auth = require("./auth.json");
}
catch(e){
    console.log("You aren't getting very far without an 'auth.json'... just sayin'.");
}

var yt = new YouTube();

yt.setKey(auth.yt);
yt.addParam('type', 'video');

try {
    var request = require("request");
}
catch (e) {
    console.log("I'm REQUESTing you to get 'request.' I need it for pretty much everything.")
}
var qs = require("querystring");

exports.commands = {
    "e621": {
        usage: "<tags> (Ex. !e621 canine, anthro, blue eyes)",
        description: "It returns an image (rating based on channel) from e621 based on tags (separated by a comma and a space) given.",
        process: function(bot, msg, params){
            if (params.indexOf("murder") === -1 && params.indexOf("suicidal") === -1 && params.indexOf("suicide") === -1 && params.indexOf("dead") === -1 && params.indexOf("retard") === -1 && params.indexOf("gore") === -1 && params.indexOf("retarded") === -1 && params.indexOf("cancer") === -1 && params.indexOf("cancerous") === -1 && params.indexOf("scat") === -1 && params.indexOf("shit") === -1 && params.indexOf("crap") === -1 && params.indexOf("poo") === -1 && params.indexOf("pee") == -1 && params.indexOf("feces") === -1 && params.indexOf("urin") == -1 && params.indexOf("piss") == -1 && params.indexOf("diaper") == -1 && params.indexOf("baby") == -1 && params.indexOf("babies") == -1 && params.indexOf("defecation") === -1 && params.indexOf("child") === -1 && params.indexOf("kid") === -1 && params.indexOf("tod") === -1 && params.indexOf("toddler") === -1 && params.indexOf("cake_farts") == -1 && params.indexOf("diarrhea") == -1 && params.indexOf("soiled") == -1) {
                var tagesto = "";
                var tagestosplit = params.substring((params.indexOf(',') + 1), params.length).split(",");
                if (params.indexOf(',') != -1) {
                    tagesto = (params.substring(0, params.indexOf(',')).replace(/\s/g, "_") + "+");
                    for (var i = 0; i < tagestosplit.length; i++) {
                        if (i === (tagestosplit.length - 1)) {
                            tagestosplit[i] = tagestosplit[i].substring(1, tagestosplit[i].length).replace(/\s/g, "_");
                            tagesto += tagestosplit[i];
                        }
                        else {
                            tagestosplit[i] = tagestosplit[i].substring(1, tagestosplit[i].length).replace(/\s/g, "_");
                            tagesto += tagestosplit[i] + "+";
                        }
                    }
                }
                else {
                    tagesto = params.replace(/\s/g, "_");
                }

                if (msg.channel.isPrivate === true || msg.channel.name.indexOf("art") != -1 || msg.channel.name.indexOf("furry") != -1 || msg.channel.name.indexOf("2am") != -1) {
                    console.log("Safe to post NSFW content.");
                }
                else {
                    tagesto += "+rating:safe";
                    if ((tagesto.indexOf("rating:explicit") != -1) || (tagesto.indexOf("penis") != -1) || (tagesto.indexOf("pussy") != -1) || (tagesto.indexOf("anus") != -1) || (tagesto.indexOf("dick") != -1) || tagesto.indexOf("rating:questionable") != -1 || tagesto.indexOf("genitalia") != -1 || tagesto.indexOf("genitals") != -1 || tagesto.indexOf("genital") != -1 || tagesto.indexOf("vagina") != -1 || tagesto.indexOf("cunt") != -1 || tagesto.indexOf("vaginal") != -1 || tagesto.indexOf("vaginal_penetration") != -1 || tagesto.indexOf("sex") != -1 || tagesto.indexOf("fuck") != -1 || tagesto.indexOf("intercourse") != -1 || tagesto.indexOf("cock") != -1) {
                        bot.sendMessage(msg.channel, "[](/twiglare) That content isn't appropiate for this channel. Go be naughty elsewhere.");
                        return;
                    }
                }
                var estoHeader = {
                    url: 'https://e621.net/post/index.json?tags=order:random+' + tagesto,
                    headers: {
                        'User-Agent': 'Yoshi-Bot/1.0 (by NeoNinetales on e621)'
                    }
                }

                request(estoHeader,
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var estoThing = JSON.parse(body);
                        if (typeof (estoThing[0]) != "undefined") {
                            bot.sendMessage(msg.channel, estoThing[0].file_url.toString());
                            bot.sendMessage(msg.channel, "https://e621.net/post/show/" + estoThing[0].id.toString());
                        }
                        else {
                            bot.sendMessage(msg.channel, "[](/derpshrug) No images found. Try different tags.")
                        }
                    }
                    else {
                        console.log(error);
                        bot.sendMessage(msg.channel, "The API isn't working and this is why I'm crashing.");
                        bot.sendMessage(msg.channel, error);
                    }
                });
            }
            else {
                bot.sendMessage(msg.channel, "No. Stop it.");
            }
        }
    },

	"mlfw": {
		usage: "<tags> (Ex. !mlfw twilight sparkle, happy)",
		description: "Returns a pony reaction image based on tags (separated by a comma and a space) given.",
		process: function(bot, msg, params){
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
                        bot.sendMessage(msg.channel, "http://mylittlefacewhen.com/" + mlfwThing.objects[0].image.toString());
                    }
                    else {
                        bot.sendMessage(msg.channel, "[](/derpshrug) No images found. Try different tags.")
                    }
                }
                else {
                    console.log(error);
                    bot.sendMessage(msg.channel, error);
                }
            });
		}
	},

	"ping": {
		usage: "!ping",
		description: "I'll respond with a \"pong.\" Useful for checking if I'm alive.",
		process: function(bot, msg, params){
			bot.sendMessage(msg.channel, "Pong!");
		}
	},

	"bye": {
		usage: "!bye",
		description: "Shuts down the bot.",
		process: function(bot, msg, params){
			if (msg.author.id === "110932722322505728") {
                bot.sendMessage(msg.channel, "Goodbye, everyone!", function(error, message){
                    if(message){
                        bot.logout();
                    }
                    else{
                        console.log("I couldn't send the message before logging off.");
                    }
                });
            }
            else {
                bot.reply(msg, "I can't really take that order from you. Sorry. :c");
            }
		}
	},

	"leave": {
		usage: "<server ID> (Ex. !leave 120233722422545928)",
		description: "I'll attempt to leave the server you specify.",
		process: function(bot, msg, params){
			if (msg.author.id === "110932722322505728") {
                bot.leaveServer(msg.content.substring(6, msg.content.length), function (error) {
                    if (error) {
                        bot.sendMessage(msg.channel, "Am I even part of that? " + error);
                    }
                    else {
                        bot.sendMessage(msg.channel, "I have left that server.");
                    }
                });
            }
            else {
                bot.reply(msg, "I can't really take that order from you. Sorry. :c");
            }
		}
	},

	"servers": {
		usage: "!servers",
		description: "List of servers I am in.",
		process: function(bot, msg, params){
			bot.sendMessage(msg.channel, "I am currently serving in " + bot.servers);
		}
	},

	"avie": {
		usage: "[Optional] <name or name portion> (Ex. '!avie Ian' or '!avie')",
		description: "Returns the avatar image of the specified user. If no user is specified, returns the avatar image of the author.",
		process: function(bot, msg, params){
			if (params) {
                if (bot.users.get("username", params) != null) {
                    bot.sendMessage(msg.channel, "https://discordapp.com/api/users/" + bot.users.get("username", params).id + "/avatars/" + bot.users.get("username", params).avatar + ".jpg");
                }
                else {
                    var regst = /^[^\s]+/;
                    var regend = /[^\s]+$/;
                    var match = true;
                    for (var i = 0; i < bot.users.length ; i++) {
                        if (regst.exec(bot.users[i].username)[0] === params) {
                            match = true;
                            bot.sendMessage(msg.channel, "https://discordapp.com/api/users/" + bot.users[i].id + "/avatars/" + bot.users[i].avatar + ".jpg");
                            return;
                        }
                        else if (regend.exec(bot.users[i].username)[0] === params) {
                            match = true;
                            bot.sendMessage(msg.channel, "https://discordapp.com/api/users/" + bot.users[i].id + "/avatars/" + bot.users[i].avatar + ".jpg");
                            return;
                        }
                        else {
                            match = false;
                        }
                    }
                    if (match === false) {
                        bot.sendMessage(msg.channel, "I couldn't find the user you requested.");
                    }
                }
            }
            else {
                bot.sendMessage(msg.channel, msg.author.avatarURL);
            }
		}
	},

	"pick": {
		usage: "<options to pick from> (Ex. !pick option1, option2, option3)",
		description: "Will randomly pick from the number of options given by the user, separated by commas and spaces.",
		process: function(bot, msg, params){
			var options = params.split(",");
            var randomChoice = Math.floor(Math.random() * options.length);
            options[0] = " " + options[0];

            bot.sendMessage(msg.channel, "You must go with" + options[randomChoice] + ", " + msg.author + ".");
		}
	},

	"subr": {
		usage: "<subreddit name> (Ex. !subr wheredidthesodago)",
		description: "Will return a random post from the user given subreddit using reddit's own \"random.\"",
		process: function(bot, msg, params){
            request("https://www.reddit.com/r/" + params + "/random/.json", function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var srThing = JSON.parse(body);
                    if(typeof (srThing.data) !== "undefined"){
                        bot.sendMessage(msg.channel, "I don't believe that's a subreddit. ~~Either that or it's banned, you sicko.~~");
                    }
                    else {
                        if (typeof(srThing[0].data.children[0].data.url) !== "undefined") {
                            bot.sendMessage(msg.channel, srThing[0].data.children[0].data.url);
                        }
                    }
                }
                else {
                    console.log(error);
                    bot.sendMessage(msg.channel, "I don't believe that's a subreddit. ~~Either that or it's banned, you sicko.~~");
                }
            });
		}
	},

	"woof": {
		usage: "!woof",
		description: "Returns a random woof image.",
		process: function(bot, msg, params){
			request("http://imgur.com/r/dog/top/year.json", function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var woofThing = JSON.parse(body);
                    var randWoof = Math.floor(Math.random() * woofThing.data.length);
                    if (typeof (woofThing.data[0]) != "undefined") {
                        bot.sendMessage(msg.channel, "http://i.imgur.com/" + woofThing.data[randWoof].hash + woofThing.data[randWoof].ext);
                    }
                    else {
                        bot.sendMessage(msg.channel, "Things are going wrong all over.");
                    }
                }
            });
		}
	},

	"meow": {
		usage: "!meow",
		description: "Returns a random meow image.",
		process: function(bot, msg, params){
			request("http://imgur.com/r/cat/top/year.json", function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var meowThing = JSON.parse(body);
                    var randMeow = Math.floor(Math.random() * meowThing.data.length);
                    if (typeof (meowThing.data[0]) != "undefined") {
                        bot.sendMessage(msg.channel, "http://i.imgur.com/" + meowThing.data[randMeow].hash + meowThing.data[randMeow].ext);
                    }
                    else {
                        bot.sendMessage(msg.channel, "Things are going wrong all over.");
                    }
                }
            });
		}
	},

	"voice": {
		usage: "!voice",
		description: "Joins the voice channel the author of the command is in. THIS COMMAND ISN'T FINISHED.",
		process: function(bot, msg, params){
			if (!bot.internal.voiceConnection) {
                if (msg.channel.server.id === "136609300700332032") {
                    var channelID = "198276772435984384";
                }
                else {
                    var channelID = "198287699461931008";
                }

                bot.joinVoiceChannel(channelID);
                bot.sendMessage(msg.channel, "Voice channel joined.");
            }
            else {
                bot.sendMessage(msg.channel, "I'm already in a voice channel.");
            }
		}
	},

	"play": {
		usage: "<SoundCloud or Youtube link> (Ex. !play https://soundcloud.com/assertivef/silva-hound-hooves-up-high)",
		description: "Queues or plays (if nothing in queue) the requested song. Worthless command.",
		process: function(bot, msg, params){
            bot.sendMessage(msg.channel, "This command is worthless as of now.");
            /*if (msg.content.length > 5) {
                    if (bot.internal.voiceConnection) {
                        var songName = msg.content.substring(6, msg.content.length);
                        var connection = bot.internal.voiceConnection;
                        var filePath = "https://api.soundcloud.com/tracks/194566340/stream";
                        bot.sendMessage(msg.channel, "Playing that for you in a sec...");
                        connection.playRawStream(filePath, {volume: 0.3});
                    }
                }
                else {
                    bot.sendMessage(msg.channel, "I'm already in the voice channel. Give me something to play.");
                }*/
		}
	},

	"update": {
		usage: "!update",
		description: "Will check if there is a new updated available. If update is found, will attempt to restart with the new code.",
		process: function(bot, msg, params){
			if (msg.author.id === "110932722322505728"){
                if(bot.internal.voiceConnection){
                    bot.internal.voiceConnection.destroy();
                }
                bot.sendMessage(msg.channel, "Checking for updates...");
                simpleGit().pull(function(error, update) {
                    if(update && update.summary.changes) {
                        bot.sendMessage(msg.channel, "Be right back!", function(error, message){
                            if(message){
                                exec('node YoshiBot.js', (error, stdout, stderr) => {
                            if (error) {
                                console.error(`exec error: ${error}`);
                                return;
                            }
                            console.log(`stdout: ${stdout}`);
                            console.log(`stderr: ${stderr}`);
                        });
                                bot.logout();
                            }
                            else{
                                console.log("I couldn't send the message before logging off.");
                            }
                        });
                    }
                    else{
                        bot.sendMessage(msg.channel, "Already up to date.");
                        console.log(error);
                    }
                });
            }
            else{
                bot.reply(msg, "I can't really take that order from you. Sorry. :c");
            }
		}
	},

	"kms": {
		usage: "!kms",
		description: "You asked for death.",
		process: function(bot, msg, params){
			bot.sendTTSMessage(msg.channel, "You're dead, kiddo. ᕕ[•̀͜ʖ•́]︻̷┻̿═━一 ---");
		}
	},

	"clean": {
		usage: "<number of messages to delete> (Ex. !clean 5)",
		description: "Deletes the amount of given messages (as a number) in the channel.",
		process: function(bot, msg, params){
            if (msg.author.id === "110932722322505728" || msg.author.id == "137665965096697859" || msg.author.id == "137763223414898688"){
                if(params){
                    if(!isNaN(params)){
                            bot.getChannelLogs(msg.channel, params, {before: msg}, function(error, messages){
                                if(error){
                                        bot.sendMessage(msg.channel, "Oh, whoops. " + error);
                                }
                                else{
                                        bot.deleteMessages(messages);
                                        bot.sendMessage(msg.channel, params + " messages successfully deleted!");
                                }
                            });
                    }
                    else{
                            bot.sendMessage(msg.channel, "That's not a number, silly.");
                    }
                }
                else{
                    bot.sendMessage(msg.channel, "I need to know how many messages to delete, buddy.");
                }
            }
            else{
                bot.reply(msg, "I can't really take that order from you. Sorry. :c");
            }
        }
	},

    "info": {
        usage: "[Optional] <name or name portion> (Ex. '!info Ian' or '!info')",
        description: "Will give information about the requested user and the server the command was issued in. If no user is specified, returns information about the author.",
        process: function(bot, msg, params){
            var infoString = "";
            var user = null;
            if (params) {
                if (bot.users.get("username", params) != null) {
                    user = bot.users.get("username", params);
                }
                else{
                    var regst = /^[^\s]+/;
                    var regend = /[^\s]+$/;
                    var match = true;
                    for (var i = 0; i < bot.users.length ; i++) {
                        if (regst.exec(bot.users[i].username)[0] === params) {
                            match = true;
                            user = bot.users[i];
                        }
                        else if (regend.exec(bot.users[i].username)[0] === params) {
                            match = true;
                            user = bot.users[i];
                        }
                        else {
                            match = false;
                        }
                    }
                    if (match === false) {
                        bot.sendMessage(msg.channel, "I couldn't find the user you requested.");
                        return;
                    }
                }
            }
            else{
                user = msg.author;
            }

            infoString = "Information for user **" + user.name + "#" + user.discriminator + "** and **" + msg.server.name + "**:";
            bot.sendMessage(msg.channel, infoString, function(error, message){
                if(message){
                    bot.sendMessage(msg.channel, "His/Her avatar is: " + user.avatarURL, function(error, message){
                        if(message){
                            bot.sendMessage(msg.channel, "The server's icon is: " + msg.server.iconURL, function(error, message){
                                if(message){
                                    infoString = "- **" + user.name + "'s** ID is **" + user.id + "**.\n- This account was created in **" + user.createdAt + "**.\n";

                                    if(user.bot){
                                        infoString += "- This user is **an official bot** account as per Discord API.\n";
                                    }
                                    else{
                                        infoString += "- This user is **not an official bot** account as per Discord API.\n";
                                    }

                                    var userServerDetails = msg.server.detailsOfUser(user);
                                    infoString += "- This user has the role(s) **" + userServerDetails.roles + "** in this server.\n- **" + user.name + "'s** nickname is **" + userServerDetails.nick + "** in this server.\n- **" + user.name + "#" + user.discriminator + "** joined this server in **";
                                    var t = new Date(userServerDetails.joinedAt);
                                    infoString += t + "**.\n\n- The ID of server **" + msg.server.name + "** is **" + msg.server.id + "**.\n- There are **" + msg.server.members.length + "** users in this server.\n- **" + msg.server.owner.name + "#" + msg.server.owner.discriminator + "** is the owner of **" + msg.server.name + "**.\n- This server was created in **" + msg.server.createdAt + "**.";
                                    bot.sendMessage(msg.channel, infoString);
                                }
                            });
                        }
                    });

                    
                }
            });
        }
    },

    "yt": {
        usage: "<search terms> (Ex. !yt PFUDOR)",
        description: "Returns the first YouTube video in a search based on the input query.",
        process: function(bot, msg, params){
             if(params){
                yt.search(params, 1, function(error, result) {
                  if (error) {
                    console.log(error);
                  }
                  else {
                    bot.sendMessage(msg.channel, "https://www.youtube.com/watch?v=" + result.items[0].id.videoId);
                  }
                });
            }
            else{
                bot.sendMessage(msg.channel, "Give me some search terms to look for, silly.");
            }
        }
    },

    "8ball": {
        usage: "<question> (Ex. !8ball Will Ian ever get a life?)",
        description: "Will briefly turn into the Magical 8 Ball and respond to whatever question you pose.",
        process: function(bot, msg, params){
            if(params){
                request('https://8ball.delegator.com/magic/JSON/' + params, function(error, response, body){
                    if (!error && response.statusCode == 200){
                        answer = JSON.parse(body);
                        botResponse = "*The Magical 8 Ball answers...*\n";
                        botResponse += "`Question:` **" + params + "**\n";
                        botResponse += "`Answer:` **" + answer.magic.answer + "**";
                        bot.sendMessage(msg.channel, botResponse);
                    }
                    else{
                        bot.sendMessage(msg.channel, "Whoops, I couldn't turn into an 8 Ball: " + error);
                    }
                });
            }
        }
    }
}
