function verifyTrip(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
    var output = "";
    if(args.join(' ').trim() == "")
    {
    	args[0] = trip;
    }
    for(var i in bot.data.trips)
    {
    	if(bot.data.trips[i] == args[0])
    	{
    		var output = "Trip valid for user @" + i + "!";
    		break;
    	}
    }
    if(output.length > 0)
    {
        session.sendMessage(output);
    }
    else
    {
        session.sendMessage("Trip " + args[0] + " is not registered!");
    }
}


function addTrip(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
    if(!bot.requirePerm(trip))
    {
        session.sendMessage("You have no permission to add trips");
        return;
    }
    if(args.join(" ").trim() != "" && typeof args[1] != "undefined")
    {
        bot.data.trips[args[0]] = args[1];
        bot.dataupdate();
        session.sendMessage("@" + nick + " user @" + args[0] + " was added with trip " + args[1] + ".");
    }
}


function remTrip(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
    if(!bot.requirePerm(trip))
    {
        session.sendMessage("You have no permission to remove trips");
        return;
    }
    if(args.join(" ").trim() != "" && typeof args[1] != "undefined")
    {
        delete bot.data.trips[args[0]];
        bot.dataupdate();
        session.sendMessage("@" + args[0] + "'s trip was successfully removed.");
    }
}

module.exports = {
	verify: ["general", verifyTrip, "Syntax is verify <tripcode> or simply verify. Checks if a tripcode is registered; if not, the user who is using it is not legit."],
	tripver: ["general", verifyTrip, "Syntax is tripver <tripcode> or simply tripver. Checks if a tripcode is registered; if not, the user who is using it is not legit."],
    add: ["admin", addTrip, "Syntax is add <user> <tripcode>. Admin command: Registers a trip to the bot, so the verify or tripver commands can use it."],
    rem: ["admin", remTrip, "Syntax is rem <user>. Admin command: Removes a registered user from the list, so the verify or tripver commands cannot use it."]
};
