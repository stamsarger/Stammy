function lmsg(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(args[0].indexOf("\n") != -1)
	{
		args = args.join(" ").split("\n").join(" ").split(" ");
	}
	var msg = bot.substr(args, 1).join(" ");
	if(String(trip) == "undefined")
		trip = 'unknown';
	if(!args[0] || !msg)
	{
		session.sendMessage(bot.data.man[cmd]);
		return;
	}

	if(bot.data.messages.hasOwnProperty(args[0]))
	{
		bot.data.messages[args[0]].push(nick + "[" + trip + "]: " + msg);
		bot.dataupdate();
		session.sendMessage("@" + nick + " left a message for @" + args[0]);
	}
	else
	{
		bot.data.messages[args[0]] = [nick + "[" + trip + "]: " + msg];
		bot.dataupdate();
		session.sendMessage("@" + nick + " left a message for @" + args[0]);
	}
}

module.exports = {
	msg: ["general", lmsg, "Syntax is msg <user> <text>. When <user> sends a message or joins the chat, they will be notified about your <text>."]
};
