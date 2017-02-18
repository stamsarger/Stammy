function GenerateRandomQuote(session, bot, cmd, args, nick, text, time, isadmin, trip)
{
	if(!args[0])
	{
		var keys = Object.keys(bot.messages);
		var index = Math.round(Math.random() * (keys.length - 1));
		var randomKey = keys[index];
		session.sendMessage(bot.choose(bot.messages[randomKey]));
	}
	else
	{
		if(bot.messages.hasOwnProperty(args[0]))
		{
			session.sendMessage(bot.choose(bot.messages[args[0]]));
			return;
		}
		else
		{
			session.sendMessage("User @" + args[0] + " has not sent a message since I joined.");
			return;
		}
	}
}

module.exports = {
	quote: ["fun", GenerateRandomQuote, "Syntax is quote <person> or just quote; it resends a random message originally sent by <person> on the chat; if <person> is omitted, the message can be anyone's."]
};
