function turnRainbow(session, bot, cmd, args, nick, text, time, isAdmin, trip)
{
    var output = "$ ";
    var color = 0;
    var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
    for(var i = cmd.length + 2; i < text.length; i++)
    {
        if(text[i] == " ")
        {
        	output += " \\ ";
        	continue;
        }
        else
        {
        	output += " \\color{" + colors[color] + "}{" + text[i] + " } ";
        	color++;
        }
        if(color >= colors.length)
        {
        	color = 0;
        }
    }
    session.sendMessage(output + " $");
}
module.exports = {
	rainbow: ["fun", turnRainbow, "Syntax is rainbow <text>. Gives every character of <text> a rainbow color, using LaTeX; LaTeX must be on to view the result."]
};
