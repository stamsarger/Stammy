function Game(session, bot, cmd, args, nick, text, time, isadmin, trip)
{
    var rps = {
        rock: ["Rock. It's a tie!", "Scissors. Rock wins!", "Paper. Paper wins!"],
        paper: ["Rock. Paper wins!", "Scissors. Scissors wins!", "Paper. It's a tie!"],
        scissors: ["Rock. Rock wins!", "Scissors. It's a tie!", "Paper. Scissors wins!"]
    };
    session.sendMessage(bot.choose(rps[cmd]));
}

var a = ["fun", Game, "Just plays the game."];
module.exports = {
	rock: a,
	paper: a,
	scissors: a
};
