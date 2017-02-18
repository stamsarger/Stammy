var CLEVERBOT = require("cleverbot.io");
var cleverbot = new CLEVERBOT("BiysI8z6jqif2ocT", "i86uzUpx3gXSl7bzF2q4wYealbgmUpLO");

cleverbot.create(function(err, session){});

module.exports = {
	ai: [['general', 'fun'], function(session, bot, cmd, args, nick, text, time, isAdmin, trip)
	{
		if(!args[0])
		{
			if(text.indexOf("@" + bot.botName) != 0)
				session.sendMessage("You need to send a message, you dumbass.");
			return;
		}
		cleverbot.ask(args.join(" "), function(err, response)
		{
			if(err)
				session.sendMessage("@" + nick + " Uh oh. " + err.toString());
			else
				session.sendMessage("@" + nick + " " + response);
	});
	}, "Artificial intelligence, based on Cleverbot."]
};