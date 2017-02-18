var request = require('request');

function chuckNorrisJoke(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	request("http://api.icndb.com/jokes/random", function(err, res, body)
	{
		if(err)
		{
			session.sendMessage("@" + nick + " an error occurred! " + err.toString());
			return;
		}
		var data = JSON.parse(body);
		if(data.type != "success")
		{
			session.sendMessage("Couldn't fetch chuck norris joke!");
			return;
		}
		session.sendMessage(data.value.joke);
	});
}

module.exports = {
	chucknorris: ["fun", chuckNorrisJoke, "No args; sends a chuck norris joke."]
};