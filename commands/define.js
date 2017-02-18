var dict = require('define-word');
var fs = require('fs');
var wordListPath = require('word-list');
var EnglishWords = fs.readFileSync(wordListPath, 'utf8').split('\n');

function Define(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(!args[0])
	{
		session.sendMessage(bot.data.man[cmd]);
		return;
	}
	args[0] = args[0].toLowerCase();
	if(EnglishWords.indexOf(args[0]) == -1)
	{
		session.sendMessage("It looks like your word doesn't exist.");
		return;
	}
	var definit = dict.define(args[0]);
	var output = bot.capitalize(args[0]) + " (" + definit.type + "):\n" + definit.definitions[0].substr(0, 500);
	session.sendMessage(output);
}

module.exports = {
	define: ["general", Define, "Syntax is define <word>; returns the dictionary definition of the <word> given."]
};