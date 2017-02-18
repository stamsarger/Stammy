function lmgtfy(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(!args[0])
	{
		session.sendMessage(bot.data.man[cmd]);
		return;
	}
	args = args.join('+');
	var output = "Here's a useful link! https://lmgtfy.com/?q=" + args;
	session.sendMessage(output);
}

module.exports = {
	lmgtfy: [['fun', 'programming', 'general'], lmgtfy, "Syntax is lmgtfy <query>."]
}