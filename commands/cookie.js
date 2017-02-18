function cookie(session, bot, cmd, args, nick, text, time, isadmin, trip)
{
	if(args.join(" ").trim() != '')
	{
		session.sendMessage("@" + nick + " mercifully hands some cookiez to @" + args[0]);
	}
	else
	{
		session.sendMessage("@" + nick + ' EATS COOKIEZ! OM NOM NOM NOM NOM');
	}
}

module.exports = {
	cookie: ["fun", cookie, "Syntax is #ookie <user> or just cookie. Fun with cookies. ;)"]
};
