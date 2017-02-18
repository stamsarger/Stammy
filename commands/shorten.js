var shorturl = require('shorturl');

function shorten(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(!args[0])
	{
		session.sendMessage(bot.data.man[cmd]);
		return;
	}
	shorturl(args[0], "bit.ly", {
		login: "stamsarger",
		apiKey: "R_5fcff2bf8c374db79e9ff0f522fcb83b"
	}, function(result)
	{
		session.sendMessage("Shortened link: " + result);
	});
}

module.exports = {
	shorten: ["general", shorten, "Syntax is shorten <url>; shortens the <url> with bit.ly"]
};