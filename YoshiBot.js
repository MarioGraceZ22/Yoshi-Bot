try {
    var Discord = require("discord.js");
}
catch (e) {
    console.log(e.stack);
    console.log(process.version);
    console.log("Please run npm install and ensure it passes with no errors!");
    process.exit();
}

var LOADDIR = "C:/Users/Woof/Music/";

var simpleGit = require('simple-git');

const exec = require('child_process').exec;

var auth = require("./auth.json");

try {
    var request = require("request");
}
catch (e) {
    console.log("Missing 'request' from dependencies.")
}
var qs = require("querystring");
var password = "";

var bot = new Discord.Client();

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
    bot.sendMessage("168188374023274496", "Hiya, everyone!")
    bot.setPlayingGame("with " + bot.users.length + " users!");
});

bot.on("serverNewMember", function (server, user) {
    bot.sendMessage("136609300700332032", "Welcome, " + user + ", to our little piece of Discord: Shitpost Central - Live. We're really glad to have ya and we hope that you will enjoy your time here to the fullest. We encourage you to head on to <#169511435347558400> to ensure you know all the rules and become informed in the extents of each channel. If you have any questions, feel free to ask the admin or the mods, they'll be happy to answer. Cya around!");
});

bot.on("message", function (msg) {
    //check if message is a command
    if (msg.author.id != bot.user.id && (msg.content[0] === '!')) {
        if (msg.channel.server.id === "136609300700332032" && (msg.channel.id != "168188374023274496" && msg.channel.id != "137676980387577857")) {
            bot.sendMessage(msg.channel, "Use #bots_channel, please.");
        }
        else {
            console.log("treating " + msg.content + " from " + msg.author + " as command");
            var msgcmd = msg.content.substring(0, 5);

            switch (msgcmd.toLowerCase()) {
                case "!e621": //Returns image from e621
                    if (msg.content.indexOf("murder") === -1 && msg.content.indexOf("suicidal") === -1 && msg.content.indexOf("suicide") === -1 && msg.content.indexOf("dead") === -1 && msg.content.indexOf("retard") === -1 && msg.content.indexOf("gore") === -1 && msg.content.indexOf("retarded") === -1 && msg.content.indexOf("cancer") === -1 && msg.content.indexOf("cancerous") === -1 && msg.content.indexOf("scat") === -1 && msg.content.indexOf("shit") === -1 && msg.content.indexOf("crap") === -1 && msg.content.indexOf("poo") === -1 && msg.content.indexOf("pee") == -1 && msg.content.indexOf("feces") === -1 && msg.content.indexOf("urin") == -1 && msg.content.indexOf("piss") == -1 && msg.content.indexOf("diaper") == -1 && msg.content.indexOf("baby") == -1 && msg.content.indexOf("babies") == -1 && msg.content.indexOf("defecation") === -1 && msg.content.indexOf("child") === -1 && msg.content.indexOf("kid") === -1 && msg.content.indexOf("tod") === -1 && msg.content.indexOf("toddler") === -1 && msg.content.indexOf("cake_farts") == -1 && msg.content.indexOf("diarrhea") == -1 && msg.content.indexOf("soiled") == -1) {
                        var tagesto = "";
                        var tagestosplit = msg.content.substring((msg.content.indexOf(',') + 1), msg.content.length).split(",");
                        if (msg.content.indexOf(',') != -1) {
                            tagesto = (msg.content.substring(6, msg.content.indexOf(',')) + "+");
                            for (var i = 0; i < tagestosplit.length; i++) {
                                if (i === (tagestosplit.length - 1)) {
                                    tagesto += tagestosplit[i].substring(1, tagestosplit[i].length);
                                }
                                else {
                                    tagesto += tagestosplit[i].substring(1, tagestosplit[i].length) + "+";
                                }
                            }
                        }
                        else {
                            tagesto = msg.content.substring(6, msg.content.length);
                        }

                        if (msg.channel.isPrivate === true || msg.channel.name.indexOf("art") != -1 || msg.channel.name.indexOf("furry") != -1 || msg.channel.name.indexOf("2am") != -1) {
                            console.log("Safe to post NSFW content.");
                        }
                        else {
                            tagesto += "+rating:safe";
                            if ((tagesto.indexOf("rating:explicit") != -1) || (tagesto.indexOf("penis") != -1) || (tagesto.indexOf("pussy") != -1) || (tagesto.indexOf("anus") != -1) || (tagesto.indexOf("dick") != -1) || tagesto.indexOf("rating:questionable") != -1 || tagesto.indexOf("genitalia") != -1 || tagesto.indexOf("genitals") != -1 || tagesto.indexOf("genital") != -1 || tagesto.indexOf("vagina") != -1 || tagesto.indexOf("cunt") != -1 || tagesto.indexOf("vaginal") != -1 || tagesto.indexOf("vaginal_penetration") != -1 || tagesto.indexOf("sex") != -1 || tagesto.indexOf("fuck") != -1 || tagesto.indexOf("intercourse") != -1 || tagesto.indexOf("cock") != -1) {
                                bot.sendMessage(msg.channel, "[](/twiglare) That content isn't appropiate for this channel. Go be naughty elsewhere.");
                                break;
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
                    break;

                case "!mlfw": //Returns image from MLFW.
                    var tagmlfw = "";
                    if (msg.content.indexOf(',') != -1) {
                        tagmlfw = ("\"" + msg.content.substring(6, msg.content.indexOf(',')) + "\"" + ",");
                        var tagmlfwsplit = msg.content.substring((msg.content.indexOf(',') + 1), msg.content.length).split(",");
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
                        tagmlfw = "\"" + msg.content.substring(6, msg.content.length) + "\"";
                    }
                    console.log("http://mylittlefacewhen.com/api/v2/face/?search=[" + tagmlfw + "]&order_by=random&format=json");
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
                    break;

                case "!ping": //Checks if bot is alive.
                    bot.sendMessage(msg.channel, "Poooooong!");
                    break;

                case "!help": //Displays help message.
                    if (msg.content === "!help " + bot.user.mention()) {
                        bot.sendMessage(msg.channel, "```These are the commands I can use: \n!ping - I'll respond with a \"pong.\" Useful for checking if I'm alive.\n!pong - Similar to !ping. Kind of.\n!join - I'll attempt to join the server you invite me to.\n!server - List of servers I am in.\n!mlfw - Returns a pony reaction image based on tags (separated by a comma and a space) given. (Ex. !mlfw happy, twilight sparkle)\n!e621 - It returns an image (rating based on channel) from e621 based on tags (separated by a comma and a space) given. (Ex. !e621 anthro, canine)\n!avie - Returns the avatar image of the specified user. If no user is specified, returns the avatar image of the author.\n!pick - Will randomly pick from the number of options given by the user, separated by commas and spaces. (Ex. !pick option1, option2, option3)\n!subr - Will return a random post from the \"hot\" section of the user given subreddit. (Ex. !subr wheredidthesodago)\n!woof - Returns a random woof image.\n!meow - Returns a random meow image.```")
                    }
                    break;

                case "!pong":
                    bot.sendMessage(msg.channel, "Yoshi!");
                    bot.sendMessage(msg.channel, "Were you expecting 'Ping!'? That's too bad.");
                    break;

                case "!bye": //Shut down bot.
                    if (msg.author.id === "110932722322505728") {
                        bot.sendMessage(msg.channel, "Goodbye, everyone!");
                        bot.logout();
                    }
                    else {
                        bot.reply(msg, "I can't really take that order from you. Sorry. :c");
                    }
                    break;

                case "!leav": //Bot leaves server.
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
                    break;

                case "!serv": //Displays servers bot is on.
                    bot.sendMessage(msg.channel, "I am currently serving in " + bot.servers);
                    break;

                case "!join": //Joins server.
                    bot.joinServer(msg.content.substring(6, msg.content.length), function (error, server) {
                        if (error) {
                            bot.sendMessage(msg.channel, "Does that server even exist? " + error);
                        }
                        else {
                            bot.sendMessage(msg.channel, "I am now part of " + server);
                        }
                    });
                    break;

                case "!avie": //Returns the avatar of author.

                    if (msg.content.length > 5) {
                        var avget = msg.content.substring(6, msg.content.length);
                        if (bot.users.get("username", avget) != null) {
                            bot.sendMessage(msg.channel, "https://discordapp.com/api/users/" + bot.users.get("username", avget).id + "/avatars/" + bot.users.get("username", avget).avatar + ".jpg");
                        }
                        else {
                            var regst = /^[^\s]+/;
                            var regend = /[^\s]+$/;
                            var match = true;
                            for (var i = 0; i < bot.users.length ; i++) {
                                if (regst.exec(bot.users[i].username)[0] === avget) {
                                    match = true;
                                    bot.sendMessage(msg.channel, "https://discordapp.com/api/users/" + bot.users[i].id + "/avatars/" + bot.users[i].avatar + ".jpg");
                                    break;
                                }
                                else if (regend.exec(bot.users[i].username)[0] === avget) {
                                    match = true;
                                    bot.sendMessage(msg.channel, "https://discordapp.com/api/users/" + bot.users[i].id + "/avatars/" + bot.users[i].avatar + ".jpg");
                                    break;
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
                    break;

                case "!pick":
                    var options = msg.content.substring(5, msg.content.length).split(",");
                    var randomChoice = Math.floor(Math.random() * options.length);
                    bot.sendMessage(msg.channel, "You must go with" + options[randomChoice] + ", " + msg.author + ".");
                    break;

                case "!subr":
                    var subr = msg.content.substring(6);
                    request("https://www.reddit.com/r/" + subr + "/hot/.json", function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var srThing = JSON.parse(body);
                            var randPost = Math.floor(Math.random() * srThing.data.children.length);
                            if (typeof (srThing.data.children) != "null") {
                                bot.sendMessage(msg.channel, srThing.data.children[randPost].data.url);
                            }
                            else {
                                bot.sendMessage(msg.channel, "I don't believe that's a subreddit. ~~Either that or it's banned, you sicko.~~");
                            }
                        }
                        else {
                            console.log(error);
                            bot.sendMessage(msg.channel, "I don't believe that's a subreddit. ~~Either that or it's banned, you sicko.~~");
                        }
                    });
                    break;
                case "!woof":
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
                    })
                    break;
                case "!meow":
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
                    })
                    break;
                case "!play":
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
                        if (msg.content.length > 5) {
                            if (bot.internal.voiceConnection) {
                                var songName = msg.content.substring(6, msg.content.length);
                                var connection = bot.internal.voiceConnection;
                                var filePath = LOADDIR + songName;
                                bot.sendMessage(msg.channel, "Playing that for you in a sec...");
                                connection.playFile(filePath);
                            }
                        }
                        else {
                            bot.sendMessage(msg.channel, "I'm already in the voice channel. Give me something to play.");
                        }
                    }
                    break;

                case "!dbgt":
                    bot.sendMessage(msg.channel, "Stream Time: " + bot.internal.voiceConnection.streamTime);
                    bot.sendMessage(msg.channel, "Is playing? " + bot.internal.voiceConnection.playing);
                    bot.sendMessage(msg.channel, "Playing Intent: " + bot.internal.voiceConnection.playingIntent);
                    break;

                case "!updt":            	
                	if (msg.author.id === "110932722322505728"){
                		if(bot.internal.voiceConnection){
                			bot.internal.voiceConnection.destroy();
                		}
                		/*bot.sendMessage(msg.channel, "Updating in just a second!");
                		exec('node YoshiBot.js', (error, stdout, stderr) => {
  							if (error) {
    							console.error(`exec error: ${error}`);
    							return;
  								}
  							console.log(`stdout: ${stdout}`);
  							console.log(`stderr: ${stderr}`);
							});
                		bot.sendMessage(msg.channel, "Be right back!");
                		bot.logout();*/
                		bot.sendMessage(msg.channel, "Checking for updates...");
                		simpleGit().pull(function(error, update) {
            				if(update && update.summary.changes) {
            					bot.sendMessage(msg.channel, "Be right back!");
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
            					bot.sendMessage(msg.channel, "Already up to date.");
            					console.log(error);
            				}
         				});
                	}
                	else{
                		bot.reply(msg, "I can't really take that order from you. Sorry. :c");
                	}
                	break;

                	case "!kms":
                		bot.sendMessage(msg.channel, "You're dead, kiddo. ᕕ[•̀͜ʖ•́]︻̷┻̿═━一 ---");
                		break;
            }
        }
    }
    else if (msg.content.indexOf(bot.user.mention()) != -1 && msg.content[0] != '!') { //Customized language responses.
        var choice = Math.floor((Math.random() * 6) + 1);
        if (msg.content.toLowerCase().indexOf("hello") != -1 || msg.content.toLowerCase().indexOf("hi ") != -1 || msg.content.toLowerCase().indexOf("welcome") != -1) { //Greetings.
            if (choice === 1) {
                bot.sendMessage(msg.channel, "Hello to you, " + msg.author + "!");
            }
            else if (choice === 2) {
                bot.sendMessage(msg.channel, "Greetings, " + msg.author + "!");
            }
            else if (choice === 3) {
                bot.sendMessage(msg.channel, "Hi there, " + msg.author + "!");
            }
            else if (choice === 4) {
                bot.sendMessage(msg.channel, "Hiya, " + msg.author + "!");
            }
            else if (choice === 5) {
                bot.sendMessage(msg.channel, "Howdy, " + msg.author + "!");
            }
            else if (choice === 6) {
                bot.sendMessage(msg.channel, "*Yoshi-yosh*, " + msg.author + "!");
            }
        }
        else if (msg.content.toLowerCase().indexOf("thank you") != -1 || msg.content.toLowerCase().indexOf("thanks") != -1 || msg.content.toLowerCase().indexOf("thank") != -1 || msg.content.toLowerCase().indexOf("thx") != -1 || msg.content.toLowerCase().indexOf("thank u") != -1) { //Gratitude
            if (choice === 1) {
                bot.reply(msg, "my pleasure!");
            }
            else if (choice === 2) {
                bot.reply(msg, "you're absolutely welcome.");
            }
            else if (choice === 3) {
                bot.reply(msg, "no problem, buddy!");
            }
            else if (choice === 4) {
                bot.reply(msg, "anytime!");
            }
            else if (choice === 5) {
                bot.reply(msg, "glad to help!");
            }
            else if (choice === 6) {
                bot.reply(msg, "it was nothing!");
            }
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
            if (choice === 1) {
                bot.reply(msg, "no u");
            }
            if (choice === 2) {
                bot.reply(msg, "Y- Yoshi..?");
            }
            if (choice === 3) {
                bot.reply(msg, "isokay.");
            }
            if (choice === 4) {
                bot.reply(msg, "Ian, my creator, is a ~~dirty furfag~~ nice guy.");
            }
            if (choice === 5) {
                bot.reply(msg, "you must have called me here for a reason... right?");
            }
            if (choice === 6) {
                bot.reply(msg, "fun fact: Ian only gave me 6 options in my random language responses.");
            }
        }
    }
});
