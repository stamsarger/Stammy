var obj = {};
function create(name, sends, type)
{
	obj[name] = [type, function (session, bot, cmd, args, nick, text, time, isAdmin, trip)
	{
		session.sendMessage(sends);
	}, "Own command: just sends a specific string."];
}
create("rules", "Bannable content:\n- Useless content for more than 60 seconds\n" +
"- Spamming other websites or services\n" + "- Links to illegal content in USA\n" +
"- Mod impersonation\n- Identity exposure\n" + 
"Non-bannable content:\n" + 
"- Off-topic discussions\n" +
"- Unpopular opinions, unless they are illegal in the US", "general");
create("gtfo", "  _____ _____ ___  _\n / ___|_   _|  __|/ _ \\| |\n| |  _  | | | |_ | | | | |\n| |_| | | | |  _|| |_| |_|\n \\____| |_| |_|   \\___/(_)", "fun");
create("chat", "In this chat, we talk about:\nporn, programming, music, lesbians, shia labeouf, science, school, history, astrophysics, boobs, " +
            "philosophy, geography, opinions, stamsarger's sexuality, geopolitics, Greece's debt, hookers, computer science, " + 
            "web development, food, hack.chat Urban Legend/Creepypasta, whether hack.chat == 4Chan 2.0, and other stuff.", ["general", "fun"]);
create("about", "Hack.chat bot by stamsarger. Mods: stamsarger, Moses, bacon", "general");
create("greek", "αβγδεζηθικλμνξοπρστυφχψω\nΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ\nάέήίόύώ\nΆΈΉΊΌΎΏ", ["general", "fun"]);
create("admin", "Hack.chat admin: vortico\nHack.chat mods: bacon, M4GNV5, Shrooms, ToastyStoemp\nBot admins: stamsarger, Moses, bacon", 'general');
create("source", "https://github.com/stamsarger/Stammy/", "general");
create("prefixes", "As far as I know, here is which bot uses which prefix:\nSpammy: /\nElixirBot: *\nTBot: !\nPHPBot: :\nHatBot: `\nModbot: .\n_0x17: %\nWwbot: #\nCoderRank: -\nJBot: +", "general");
module.exports = obj;
