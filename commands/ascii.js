var ascii = require("figlet");

function makeAsciiArt(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(String(trip) == "undefined") return;
	if(trip.length > 5 && bot.data.ascii.indexOf(trip) == -1)
	{
		session.sendMessage("@" + nick + " Due to spam, you need special permission to use the " + bot.data.prefix + cmd + " command.");
		return;
	}
	var text = args.join(" ");
	if(text.length > 16)
	{
		session.sendMessage("Ugh! Your text was too big. Try again with a smaller text.")
		return;
	}
	ascii(text, function(err, data)
	{
		if(err)
		{
			session.sendMessage("@" + nick + " an unexpected error occurred! Unable to make ascii art :(");
			return;
		}
		session.sendMessage(data);
	});
}

module.exports = {
	ascii: ["fun", makeAsciiArt, "Syntax is ascii <text>. Turns <text> into ascii art. Needs special permission; one can be added with the permadd command."]
};
