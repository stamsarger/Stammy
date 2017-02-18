function CelsiusToFahrenheit(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	args[0] = parseFloat(args[0]);
	if(String(args[0]) == "NaN" || String(args[0]) == "undefined")
	{
		session.sendMessage("Could not process");
	}
	else
	{
		session.sendMessage(args[0] + " Celsius are " + (args[0] * 1.8 + 32) + " Fahrenheit.");
	}
}

function fahrenheitToCelsius(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	args[0] = parseFloat(args[0]);
	if(String(args[0]) == "NaN" || String(args[0]) == "undefined")
	{
		session.sendMessage("Could not process");
	}
	else
	{
		session.sendMessage(args[0] + " Fahrenheit are " + ((args[0] - 32) / 1.8) + " Celsius.")
	}
}
module.exports = {
	fahrenheit: ["general", CelsiusToFahrenheit, "Syntax is fahrenheit <number of Celsius>; converts Celsius to Fahrenheit."],
	celsius: ["general", fahrenheitToCelsius, "Syntax is celsius <number of Fahrenheit>; converts Fahrenheit to Celsius."]
};
