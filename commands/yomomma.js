var request = require('request');

function yoMommaJoke(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	request("http://api.yomomma.info/", function(err, res, body)
	{
		if(err)
		{
			session.sendMessage("@" + nick + " an error occurred! " + err.toString());
		}
		var data = JSON.parse(body);
		session.sendMessage(data.joke);
	});
}

module.exports = {
	yomama: ["fun", yoMommaJoke, "No args; sends a yomama joke."]
};