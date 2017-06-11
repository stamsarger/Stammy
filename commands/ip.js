var whois = require("whois");
var Pastebin = require("pastebin-js");
var pastebin = new Pastebin({
	"api_dev_key": "YOUR DEV KEY",
	"api_user_name": "YOUR USERNAME",
	"api_user_password": "YOUR PASSWORD"
});

function validateDomain(str)
{
	var result = str;
	if(str.indexOf("http://") == 0)
	{
		result = str.substr(7)
	}
	else if(str.indexOf("https://") == 0)
	{
		result = str.substr(8);
	}
	if(result.indexOf(".") != -1)
	{
		return result;
	}
	return false;
}

function main(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
	if(!args[0])
	{
		session.sendMessage(bot.data.man[cmd]);
		return;
	}
	args[0] = validateDomain(args[0]);
	if(!args[0])
	{
		session.sendMessage(bot.data.man[cmd]);
		return;
	}
	var a = args[0].split(".");
	var supportedTLDs = ["com", 'net'];
	if(supportedTLDs.indexOf(a[a.length - 1]) == -1)
	{
		session.sendMessage("Unsupported TLD. For now, we only support ." + supportedTLDs.join(", ."));
		return;
	}
	whois.lookup(args[0], function(err, result)
	{
		if(err)
		{
			session.sendMessage(err.toString());
			return;
		}
		result = result.substring(0, result.lastIndexOf("URL of the ICANN WHOIS Data Problem Reporting System:"));
		pastebin.createPaste({
			text: result,
			title: args[0] + " whois",
			format: null,
			privacy: 3,
			expiration: "N"
		}).then(function(data)
		{
			session.sendMessage("Analytic WHOIS of " + args[0] + " can be found on: " + data);
		}).fail(function(err)
		{
			console.log(err);
		});
	});
}

module.exports = {
	whois: [["general", "programming"], main, "Syntax is whois <domain>. Returns a pastebin link to the whois data of <domain>."]
};
