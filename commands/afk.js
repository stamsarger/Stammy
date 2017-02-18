function afk(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(bot.data.afks.hasOwnProperty(nick))
	{
		bot.data.afks[nick].reason = args.join(" ");
		return;
	}
	bot.data.afks[nick] = {
		reason: args.join(" "),
		who: []
	};
	if(trip.length > 5)
	{
		bot.data.afks[nick].trip = trip;
	}
	bot.dataupdate();
	session.sendMessage("@" + nick + " is now AFK " + bot.data.afks[nick].reason);
}

module.exports = {
	afk: ["general", afk, "Syntax is afk <reason> or just afk. A user who uses the command is considered to be AFK (away from keyboard); so the bot warns everyone that adresses the AFK user."]
};
