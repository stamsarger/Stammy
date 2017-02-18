var request = require('request');

function requestImdb(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(!args[0])
	{
		session.sendMessage(bot.data.man[cmd]);
		return;
	}
	args = args.join('+');
	request("http://www.omdbapi.com/?t=" + args, function(err, res, body)
	{
		if(err)
		{
			session.sendMessage('Error.');
			return;
		}
		var data = JSON.parse(body);
		if(data.Response != "True")
		{
			session.sendMessage("Sorry, I couldn't find your movie.");
			return;
		}
		var output = "Title: " + data.Title + "\nYear: " + data.Year + "\nDuration: " + data.Runtime + "\nGenre: " + data.Genre + "\nStarring: " + data.Actors;
		output += "\nPlot: " + data.Plot + "\nRating: " + data.imdbRating + "\nLink: http://www.imdb.com/title/" + data.imdbID; 
		session.sendMessage(output);
	});
}

module.exports = {
	imdb: ['general', requestImdb, "Syntax is imdb <movie>; scrapes <movie>'s data from imdb."]
};