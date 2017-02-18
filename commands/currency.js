var request = require("request");


function currencyConverter(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{

	if(!args[2])
	{
		session.sendMessage(bot.data.man[cmd]);
		return;
	}
	args[0] = args[0].split(",").join("");
	if(String(Number(args[0])) == "NaN")
	{
		session.sendMessage("Invalid number");
		return;
	}
	args[0] = Number(args[0]);
	args[1] = args[1].toUpperCase();
	args[2] = args[2].toUpperCase();
	if(args[1].length != 3 || args[2].length != 3)
	{
		session.sendMessage("Invalid currency");
		return;
	}

	request("http://api.fixer.io/latest?base=" + args[1], function(error, response, code)
	{
		if(!error && response.statusCode == 200)
		{
			code = JSON.parse(code);
			if(code.rates.hasOwnProperty(args[2]))
			{
				var convertedSum = args[0] * code.rates[args[2]];
				var output = "As of " + code.date + ", " + args[0] + " " + args[1] + " = " + convertedSum + " " + args[2] + ".";
				session.sendMessage(output);
			}
			else
			{
				session.sendMessage("An unexpected error occurred; your currency may not be supported.")
			}
		}
		else
		{
			session.sendMessage("An error occurred!");
			return;
		}
	});
}

module.exports = {
	currency: ["general", currencyConverter, "Syntax is currency <number> <currency1> <currency2>. Converts a <number> of <currency1> to <currency2>. Both currencies must be in form USD, EUR, GBP etc."]
};