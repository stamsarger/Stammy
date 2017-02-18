function botBan(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(!bot.requirePerm(trip) || args.join(" ").trim() == "")
	{
		session.sendMessage("@" + nick + " you don't have the right to use this command");
		return;
	}
	if(typeof args[0] == "undefined")
	{
		session.sendMessage("@" + nick + " pick someone to ban");
		return;
	}
	for(var i = 0; i < args.length; i++)
	{
		bot.data.banned.push(args[i]);
		
	}
	session.sendMessage("@" + nick + " user(s) " + args.join(" ") + " just got banned from using this bot.");
	bot.dataupdate();
}
function botUnban(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(!bot.requirePerm(trip) || args.join(" ").trim() == '')
	{
		session.sendMessage("@" + nick + " you don't have the right to use this command");
		return;
	}
	if(typeof args[0] == "undefined")
	{
		session.sendMessage("@" + nick + " pick someone to unban");
		return;
	}
	for(var i = 0; i < args.length; i++)
	{
		bot.ardel(bot.data.banned, args[i]);
	}
	bot.dataupdate();
	session.sendMessage("@" + nick + " user(s) " + args.join(" ") + " can use this bot again!");
}
module.exports = {
	botban: ["admin", botBan, "Syntax is botban <user>. Admin command: bans a user from using the bot."],
	botunban: ["admin", botUnban, "Syntax is botunban <user>. Admin command: unbans a user from using the bot."]
};
