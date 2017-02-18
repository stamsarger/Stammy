module.exports = {
	send: ["general", function(session, bot, cmd, args, nick, text, time, ia, trip)
	{
		if(!bot.requirePerm(trip))
		{
			return;
		}

		if(!args[0])
		{
			session.sendMessage(bot.data.man[cmd]);
			return;
		}

		if(args[0][0] == "@")
		{
			var targetChannel = args[0].substr(1, args[0].length);
			args = bot.substr(args, 1);
		}
		args = args.join(' ');
		if(String(targetChannel) === "undefined")
		{
			targetChannel = session.channel;
		}
		bot.connections[targetChannel].sendMessage(args);
	}, "Admin command; syntax: send @[channel] <message>."]
};