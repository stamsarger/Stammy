module.exports = {
	dox: ["fun", function(session, bot, cmd, args, nick, text, time, ia, trip)
	{
		if(!args[0])
		{
			args[0] = nick;
		}

		if(Object.keys(bot.data.dox).indexOf(args[0]) == -1)
		{
			session.sendMessage("Didn't find nick '" + args[0] + "' in my database.");
			return;
		}
		var output = "";
		Object.keys(bot.data.dox[args[0]]).forEach(function(key)
		{
			output += key + ": " + bot.data.dox[args[0]][key] + "\n";
		});
		session.sendMessage(output);
	}, "Syntax is dox <hack.chat user> or just dox. Supposedly \"doxes\" the user."]
};