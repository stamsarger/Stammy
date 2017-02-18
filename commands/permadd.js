function addAsciiPermision(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(!bot.requirePerm(trip))
	{
		session.sendMessage("@" + nick + " Only bot mods can use this command.");
		return;
	}
	session.sendMessage("@" + nick + " Tripcode " + args[0] + " is allowed to use the #ascii command.");
	bot.data.ascii.push(args[0]);
	bot.dataupdate();
}

module.exports = {
	permadd: ["admin", addAsciiPermision, "Syntax is permadd <tripcode>. Admin command. Registers a tripcode, whose holder can now use the ascii command."]
};
