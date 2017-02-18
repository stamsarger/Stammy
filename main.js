var HackChat = require("./hackchat.js");
var chat = new HackChat();

var inviteTimer = 0;

var fs = require("fs");
var path = require("path");
var readline = require('readline-sync');

var bot = {};

bot.channelName = readline.question("Channel: ");
bot.botName = readline.question("Name: ");
bot.botTrip = readline.question("Trip: ");
var channel = bot.botTrip !== "" ? chat.join(bot.channelName, bot.botName, bot.botTrip) : chat.join(bot.channelName, bot.botName);
bot.joins = {};
bot.connections = {};
bot.connections[bot.channelName] = channel;
bot.commands = {
	all: {},
	general: [],
	programming: [],
	hacking: [],
	fun: [],
	admin: []
};
bot.data = require("./data.json");
setInterval(function()
{
    bot.data = JSON.parse(fs.readFileSync("data.json", {encoding: "utf8", flag: "r"}));
}, 30000);
bot.messages = [];
bot.leave = function(session) {
    if(session.channel == bot.channelName) 
    {
        return;
    }
    console.log('left ' + session.channel);
    session.leave();
}
bot.join = function(ch) {
    if(ch[0] == '?')
    {
        ch = ch.substr(1, ch.length);
    }

    if(!bot.connections[ch]) 
    {
        bot.connections[ch] = chat.join(ch, bot.botName, bot.botTrip);
        console.log("joined " + ch);
    }
}
bot.capitalize = function(a)
{
	return a[0].toUpperCase() + a.substr(1);
}
bot.dataupdate = function()
{
	fs.writeFileSync("data.json", JSON.stringify(bot.data, undefined, 4));
}
bot.choose = function(arr)
{
	return arr[Math.round(Math.random() * (arr.length - 1))];
}
bot.ardel = function(ar, del) 
{
	var a = ar.indexOf(del);
	ar = ar.splice(a, 1);
}
bot.substr = function(arr, radix)
{
	var result = [];
	for(var i = radix; i < arr.length; i++)
	{
		result.push(arr[i]);
	}
	return result;
}
bot.getValues = function(obj)
{
    var result = [];
    for(var i in obj)
    {
        result.push(obj[i]);
    }
    return result;
}
bot.requirePerm = function(trip)
{
    if(bot.data.mods.indexOf(trip) != -1)
    {
    	return true;
    }
    return false;
}
fs.readdir("./commands", function(err, files)
{
	if(err)
	{
		throw err;
	}

	for(var i = 0; i < files.length; i++)
	{
		if(path.extname(files[i]) == ".js")
		{
			var cmds = require("./commands/" + files[i]);
			if(typeof cmds != "object")
			{
				throw "Invalid command " + files[i];
			}
			for(var k in cmds)
			{
				if(typeof cmds[k] != "object")
				{
					throw "Invalid command " + files[i];
				}
				if(typeof cmds[k][0] == 'object')
				{
					for(var j in cmds[k][0])
					{
						bot.commands[cmds[k][0][j]].push(k);
					}
				}
				else
				{
					bot.commands[cmds[k][0]].push(k);
				}
				bot.commands.all[k] = cmds[k][1];
				bot.data.man[k] = cmds[k][2];
			}
		}
	}
	bot.dataupdate();
    function parseCmd(session, nick, text, time, isAdmin, trip)
    {
        if(nick == "bNiceBot")
        {
            session.sendMessage("YOU WON'T TELL THEM WHAT TO DO, ASSHOLE!");
        }
    	var msg = nick + ": " + text;
    	console.log(msg);
    	if(bot.data.activated)
    	{
    		var capacity = true;
    	}
    	else if(bot.data.activated === false)
    	{
    		if(trip.length < 6)
    		{
    			var capacity = false;
    		}
    		else
    		{
    			if(bot.getValues(bot.data.trips).indexOf(trip) == -1)
                {
                    var capacity = false;
                }
                else
                {
                    var capacity = true;
                }
    		}
    	}
        else if(bot.data.activated === 0)
        {
            if(trip.length < 6)
            {
                var capacity = false;
            }
            else
            {
                if(bot.data.mods.indexOf(trip) == -1)
                {
                    var capacity = false;
                }
                else
                {
                    var capacity = true;
                }
            }
        }
        else if(bot.data.activated === '')
        {
            if(!trip)
            {
                var capacity = false;
            }
            else if(trip != bot.data.trips.stamsarger)
            {
                var capacity = false;
            }
            else
            {
                var capacity = true;
            }
        }
    	if(nick != bot.botName)
    	{
    		if(bot.messages.hasOwnProperty(nick))
            {
                bot.messages[nick].push(nick + ": " + text);
            }
            else
            {
                bot.messages[nick] = [nick + ": " + text];
            }
    	}
    	if(nick != bot.botName && nick.toLowerCase().indexOf("bot") === -1 && bot.data.banned.indexOf(nick) == -1 && capacity)
    	{
            var pos = text.indexOf('$', 1);
            if(pos>1 && text.indexOf('\\llap') !== false)
            {
                text = text.substr(pos+1);
            }
    		if(bot.data.afks.hasOwnProperty(nick) && text.indexOf(bot.data.prefix) !== 0)
    		{
    			if(!bot.data.afks[nick].hasOwnProperty("trip") || bot.data.afks[nick].trip == trip)
    			{
    				if(bot.data.afks[nick].who.length > 0)
    				{
    					session.sendMessage("@" + nick + " is back! @" + nick + ", you got these messages while AFK:\n" + bot.data.afks[nick].who.join("\n"));
    				}
    				else
    				{
    				    session.sendMessage("@" + nick + " is back!");
    				}
    				delete bot.data.afks[nick];
    				bot.dataupdate();
    			}
    			
    		}
            if(bot.data.messages.hasOwnProperty(nick))
            {
                session.sendMessage("@" + nick + " You got these messages:\n" + bot.data.messages[nick].join("\n"));
                delete bot.data.messages[nick];
                bot.dataupdate();
            }
    		if(text.indexOf("@") != -1)
    		{
    			for(var i in bot.data.afks)
    			{
    				if((text.indexOf(i) == (text.indexOf("@") + 1)) && nick != i)
    				{
    					session.sendMessage("@" + nick + " @" + i + " is AFK!");
    					bot.data.afks[i].who.push(msg);
    					bot.dataupdate();
    				}
    			}
    		}
    		if(text.indexOf("hasOwnProperty") != -1)
    		{
    			return;
    		}
            if(text.indexOf("@" + bot.botName) == 0)
            {
                var args = text.substr(1).split(" ").slice(1).join(" ").trim().split(" ");
                bot.commands.all.ai(session, bot, "ai", args, nick, text, time, isAdmin, trip);
            }
    		if(text[0] == bot.data.prefix)
    		{
    			var args = text.substr(1).split(" ");
    			var cmd = args[0].toLowerCase();
    			var args = args.slice(1).join(" ").trim().split(" ");
    			for(var i = 0; i < args.length; i++)
    			{
    				args[i] = cmd == "send" ? args[i] : args[i].split("@").join("");
    			}
    			if(typeof bot.commands.all[cmd] == "function" && bot.commands.all.hasOwnProperty(cmd))
    			{
    				try
    				{
    					bot.commands.all[cmd](session, bot, cmd, args, nick, text, time, isAdmin, trip);
    				}
    				catch(err)
    				{
    					console.log(err.toString());
    					var errm = "Command " + bot.data.prefix + cmd + " crashed! Error is available in my console; fix it ASAP @stamsarger!";
    					session.sendMessage(errm);
    					bot.data.afks.stamsarger = {
    						who: [
    							bot.botName + ": " + errm
    						],
    						trip: bot.data.trips.stamsarger,
    						reason: ""
    					}
    				}
    			}
                else
                {
                    try
                    {
                        var testArgs = [cmd];
                        bot.commands.all.dox(session, bot, cmd, testArgs, nick, text, time, isAdmin, trip);
                    }
                    catch(err)
                    {
                        console.log(err.toString());
                        var errm = "Command " + bot.data.prefix + cmd + " crashed! Error is available in my console; fix it ASAP @stamsarger!";
                        session.sendMessage(errm);
                        bot.data.afks.stamsarger = {
                            who: [
                                bot.botName + ": " + errm
                            ],
                            trip: bot.data.trips.stamsarger,
                            reason: ""
                        }
                    }
                }
    		}
    	}
    }

    chat.on("onlineSet", function(session, users, time)
    {
        if(session.channel != bot.channelName)
            return;
    	for(var i = 0; i < users.length; i++)
    	{
    		bot.joins[users[i]] = {
    			joined: time,
    			left: undefined,
    			been: true
    		}
    	}
        var abc = "Users online in ?" + bot.channelName + ": " + users.join(", ");
    	console.log(abc);
    });
    chat.on("chat", function(session, nick, text, time, isAdmin, trip)
    {
        
    	parseCmd(session, nick, text, time, isAdmin, trip);
        if(session.channel != bot.channelName)
            return;
    });
    chat.on("info", function(session, text, time)
    {
        if(session.channel != bot.channelName)
            return;
    	var not = "*** " + text + " ***";
 	    console.log(not);
    });
    chat.on("onlineAdd", function(session, nick, time)
    {
        if(session.channel != bot.channelName)
            return;
    	var not = "*** " + nick + " joined ***";
    	console.log(not);
    	if(nick == "hasOwnProperty")
    	{
    		return;
    	}
        if(bot.data.messages.hasOwnProperty(nick))
        {
            channel.sendMessage("@" + nick + " You got these messages:\n" + bot.data.messages[nick].join("\n"));
            delete bot.data.messages[nick];
            bot.dataupdate();
        }
    	bot.joins[nick] = {
    		joined: time,
    		left: undefined,
    		been: false
    	};
    });
    chat.on('onlineRemove', function(session, nick, time)
    {
        if(session.channel != bot.channelName)
            return;
    	var not = "*** " + nick + " left ***";
    	console.log(not);
    	if(nick == "hasOwnProperty")
    	{
    		return;
    	}
    	bot.joins[nick].left = time;
    });
    chat.on("nicknameTaken", function()
    {
        console.log("Nickname taken");
    });
    chat.on('invitation', function(session, nick, chan, time)
    {
        if(inviteTimer > 21 || inviteTimer == 0)
        {
            bot.join(chan);
            inviteTimer = 1;
            setInterval(function() {
                inviteTimer++;
            }, 1000);
        }
        else
        {
            session.sendMessage("@" + nick + " Sorry, I can't join right now. Try again later.")
        }
        
    });
    setInterval(function()
    {
        console.log(Object.keys(bot.connections).join(', '));
    }, 60000);
});
