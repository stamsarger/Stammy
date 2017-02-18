function pie(session, bot, cmd, args, nick, text, time, isadmin, trip)
{
	if(args[0])
	{
		session.sendMessage("@" + nick + " throws pie right at @" + args[0] + "'s face! Ouch!");
	}
	else
	{
		session.sendMessage("@" + nick + " fills his face with PIE!");
	}
}


module.exports = {
	pie: ["fun", pie, "Syntax is pie <user> or just pie. Just fun with pies. ;)"]
};
