function reverseArgs(session, bot, cmd, args, nick, text, time, isadmin, trip)
{
	var reversed = args.join(" ").split("").reverse().join("");
	session.sendMessage(reversed);
}


module.exports = {
	reverse: ["fun", reverseArgs, "Syntax is reverse <text>. Reverses the text and sends the reversed output."]
};
