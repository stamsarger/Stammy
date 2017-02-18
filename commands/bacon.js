function bacon1(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(args.join(" ").trim() == "")
	{
	    session.sendMessage("@" + nick + " is going to eat bacon, but he has run out of it. @" + nick + " weeps quietly.");
	}
	else
	{
		session.sendMessage("@" + nick + " slaps @" + args[0] + " with bacon. Ouch!");
	}
}

module.exports = {
	bacon: ["fun", bacon1, "Syntax is bacon <user> or just bacon. Some fun with bacon. ;)"]
};
