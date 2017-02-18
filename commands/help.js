function displayHelp(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(args[1] && bot.commands.all.hasOwnProperty(args[1]) && bot.commands[args[0]].indexOf(args[1]) != -1)
	{
		bot.commands.all[args[1]](session, bot, session, args[1], bot.substr(args, 2), nick, text, time, isAdmin, trip);
		return;
	}
	var j = ", " + bot.data.prefix;
	args[0] = args[0].toLowerCase();
	if(!args[0] || Object.keys(bot.commands).indexOf(args[0]) == -1)
	{
		args[0] = "all";
	}
	if(args[0] == "all")
	{
		session.sendMessage("All commands: " + bot.data.prefix + Object.keys(bot.commands.all).sort().join(j));
	}
	else
	{
		session.sendMessage(bot.capitalize(args[0]) + " commands: " + bot.data.prefix + bot.commands[args[0]].sort().join(j));
	}
}

var a = ["general", displayHelp, "Syntax is help, help <section>, or help <section> <command> <command's args>. The last syntax actually executes the command. The first one sends a message with all the bot's commands, and the second one limits the commands to sections."];
module.exports = {
	help: a,
	h: a,
	commands: a
};
