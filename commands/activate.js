function deactivate(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(!trip) return;
	if(bot.requirePerm(trip))
	{
		if(!args[0] || (args[0] && (args[0] != "/" && args[0] != "//")))
		{
			bot.data.activated = false;
			session.sendMessage("@" + nick + " the bot is temporarily deactivated for not verified users until you activate it.");
			bot.dataupdate();
		}
		else if(args[0] && args[0] == "/")
		{
			bot.data.activated = 0;
			session.sendMessage("@" + nick + " the bot is temporarily deactivated for everyone except admins.");
			bot.dataupdate();
		}
		else if(args[0] && args[0] == "//")
		{
			if(trip == bot.data.trips.stamsarger)
			{
				bot.data.activated = "";
				session.sendMessage("@" + nick + " the bot is temporarily deactivated for everyone besides the creator.");
				bot.dataupdate();
			}
			return;
		}
	}
}

function activate(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(!trip) return;
	if(bot.data.activated !== '')
	{
		if(bot.requirePerm(trip))
		{
			bot.data.activated = true;
			session.sendMessage("@" + nick + " the bot is activated for everyone!");
			bot.dataupdate();
		}
	}
	else
	{
		if(trip == bot.data.trips.stamsarger)
		{
			bot.data.activated = true;
			session.sendMessage("@" + nick + " the bot is activated for everyone!");
			bot.dataupdate();
		}
		return;
	}
}

module.exports = {
	activate: ["admin", activate, "No arguments. Admin command: activates the bot if deactivated."],
	deactivate: ["admin", deactivate, "No arguments. Admin command: deactivates the bot if activated. Only verified users will be able to use it."]
};
