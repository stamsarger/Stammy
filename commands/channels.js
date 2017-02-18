function leaveChannel(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(trip != bot.data.trips.stamsarger)
	{
		return;
	}
	if(!args[0])
	{
		return;
	}
	bot.leave(bot.connections[args[0]]);
}

function joinChannel(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(!bot.requirePerm(trip))
	{
		return;
	}
	if(!args[0])
	{
		return;
	}
	bot.join(args[0]);
}

function showSessions(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(!bot.requirePerm(trip))
	{
		return;
	}
	session.sendMessage(Object.keys(bot.connections).join(', '));
}

module.exports = {
	leave: ["admin", leaveChannel, ""],
	join: ['admin', joinChannel, ''],
	showsessions: ['admin', showSessions, '']
};