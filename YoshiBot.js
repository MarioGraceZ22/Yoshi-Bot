try {
    var Discord = require("discord.js");
}
catch (e) {
    console.log(e.stack);
    console.log(process.version);
    console.log("Please run npm install and ensure it passes with no errors!");
    process.exit();
}

var auth = require("./auth.json");


var qs = require("querystring");
var request = require("request");
var password = "";

var bot = new Discord.Client();

bot.login(auth.email, auth.password, function (error, token) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Successfully logged in.")
    }
})
bot.on("ready", function () {
    console.log("Bot is live and ready!");
});

bot.on("message", function (msg) {
    //check if message is a command
    if (msg.author.id != bot.user.id && (msg.content[0] === '!')) {
        console.log("treating " + msg.content + " from " + msg.author + " as command");
        var msgcmd = msg.content.substring(0, 5);

        switch (msgcmd.toLowerCase()) {
            case "!e621": //Returns image from e621
                if (msg.content.indexOf("murder") === -1 && msg.content.indexOf("suicidal") === -1 && msg.content.indexOf("suicide") === -1 && msg.content.indexOf("dead") === -1 && msg.content.indexOf("retard") === -1 && msg.content.indexOf("gore") === -1 && msg.content.indexOf("retarded") === -1 && msg.content.indexOf("cancer") === -1 && msg.content.indexOf("cancerous") === -1 && msg.content.indexOf("scat") === -1 && msg.content.indexOf("shit") === -1 && msg.content.indexOf("crap") === -1 && msg.content.indexOf("poop") === -1 && msg.content.indexOf("feces") === -1 && msg.content.indexOf("defecation") === -1 && msg.content.indexOf("child") === -1 && msg.content.indexOf("kid") === -1 && msg.content.indexOf("tod") === -1 && msg.content.indexOf("toddler") === -1) {
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

                    if (msg.channel.isPrivate === true || msg.channel.name.indexOf("nsfw") != -1 || msg.channel.name.indexOf("furry") != -1 || msg.channel.name.indexOf("2am") != -1) {
                        console.log("Safe to post NSFW content.");
                    }
                    else{
                        tagesto += "+rating:safe";
                        if ((tagesto.indexOf("rating:explicit") != -1) || (tagesto.indexOf("penis") != -1) || (tagesto.indexOf("pussy") != -1) || (tagesto.indexOf("anus") != -1) || (tagesto.indexOf("dick") != -1) || tagesto.indexOf("rating:questionable") != -1 || tagesto.indexOf("genitalia") != -1 || tagesto.indexOf("genitals") != -1 || tagesto.indexOf("genital") != -1 || tagesto.indexOf("vagina") != -1 || tagesto.indexOf("cunt") != -1 || tagesto.indexOf("vaginal") != -1 || tagesto.indexOf("vaginal_penetration") != -1 || tagesto.indexOf("sex") != -1 || tagesto.indexOf("fuck") != -1 || tagesto.indexOf("intercourse") != -1) {
                            bot.sendMessage(msg.channel, "[](/twiglare) That content isn't appropiate for this channel. Go be naughty elsewhere.");
                            break;
                    }
                    }
                    request("https://e621.net/post/index.json?limit=1&tags=order:random+" + tagesto,
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
                bot.sendMessage(msg.channel, "Pong!");
                break;

            case "!help": //Displays help message.
                if (msg.content === "!help " + bot.user.mention()) {
                    bot.sendMessage(msg.channel, "These are the commands I can use: \n!ping - I'll respond with a \"pong.\" Useful for checking if I'm alive.\n!pong - Similar to !ping. Kind of.\n!join - I'll attempt to join the server you invite me to.\n!server - List of servers I am in.\n!mlfw - Returns a pony reaction image based on tags (separated by a comma and a space) given. (Ex. !mlfw happy, twilight sparkle)\n!e621 - It returns an image (rating based on channel) from e621 based on tags (separated by a comma and a space) given. (Ex. !e621 anthro, canine)\n!avie - Returns the avatar image of the specified user. If no user is specified, returns the avatar image of the author.")
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
                    bot.leaveServer(msg.content.substring(7, msg.content.length), function (error) {
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
        }
    }
    else if (msg.content.indexOf(bot.user.mention()) != -1 && msg.content[0] != '!') { //Customized language responses.
        var choice = Math.floor((Math.random() * 3) + 1);
        if (msg.content.toLowerCase().indexOf("hello") != -1 || msg.content.toLowerCase().indexOf("hi") != -1 || msg.content.toLowerCase().indexOf("welcome") != -1) { //Greetings.
            if (choice === 1) {
                bot.reply(msg, "hello to you!");
            }
            if (choice === 2) {
                bot.reply(msg, "greetings!");
            }
            if (choice === 3) {
                bot.reply(msg, "hi there!");
            }
        }
        else if (msg.content.toLowerCase().indexOf("thank you") != -1 || msg.content.toLowerCase().indexOf("thanks") != -1 || msg.content.toLowerCase().indexOf("thank") != -1 || msg.content.toLowerCase().indexOf("thx") != -1 || msg.content.toLowerCase().indexOf("thank u") != -1) { //Gratitude
            if (choice === 1) {
                bot.reply(msg, "my pleasure!");
            }
            if (choice === 2) {
                bot.reply(msg, "you're absolutely welcome.");
            }
            if (choice === 3) {
                bot.reply(msg, "no problem, buddy!");
            }
        }
        else if (msg.content.toLowerCase().indexOf("yo") != -1) {
            bot.reply(msg, "what's up?");
        }
        else { //General.
            if (choice === 1) {
                bot.reply(msg, "may I help you? Use \"!help @Yoshi Bot\" to learn about my commands.");
            }
            if (choice === 2) {
                bot.reply(msg, "what can I do for you? Use \"!help @Yoshi Bot\" if you aren't aware of my options.");
            }
            if (choice === 3) {
                bot.reply(msg, "you called? Try \"!help @Yoshi Bot\" to see what you could ask me to do.");
            }
        }
    }
});
