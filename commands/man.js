function Manual(session, bot, cmd, args, nick, text, time, ia, trip)
{
	if(!args[0])
	{
		session.sendMessage("@" + nick + " " + bot.data.man[cmd]);
		return;
	}
	var a = bot.data.man[args[0]];
	if(a)
	{
		session.sendMessage(a);
	}
	else
	{
		session.sendMessage("@" + nick + " No command " + bot.data.prefix + args[0] + ".");
	}
}

module.exports = {
	man: ["general", Manual, "Syntax is man <cmd>. Sends the manual of the command given."]
};
