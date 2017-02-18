function learnToGetTripcode(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(!args[0])
	{
		args[0] = nick;
	}
	session.sendMessage("@" + args[0] + " In order to get yourself a tripcode, you must refresh the page and change your nick to:\n" +
		'"' + args[0] + '#a_unique_password_goes_here"\n' +
		"Don't forget the hashtag! And remember, make the password unique.");
}

module.exports = {
	gettrip: ["general", learnToGetTripcode, "Syntax is gettrip <user> or just #gettrip. Explains how to get a tripcode."]
};
