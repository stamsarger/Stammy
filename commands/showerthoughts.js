var showerThoughts = require("showerthoughts-cli");

function reqShower(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	session.sendMessage(showerThoughts());
}

var a = ["fun", reqShower, "No args; returns a showerthoughts from /r/showerthoughts."];

/*module.exports = {
	showerthoughts: a,
	st: a
};*/