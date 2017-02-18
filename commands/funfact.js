function GenerateRandomFact(session, bot, cmd, args, nick, text)
{
	var funfacts = ["While Idi Amin was the leader of Uganda, hundreds of thousands of people died or had their lives destroyed just because their leader was paranoid. Idi Amin, after the tanzanian invasion, escaped to Libya and died in Saudi Arabia by heart attack in 2003. No one ever punished him.",
  "The effects of crippling depression can include a persistent but overwhelming pain in the chest and the urge to kill oneself.",
  "In 1986, a single man was stranded on an island when the container ship he was captaining sunk. While alone, he became so depressed that he tied rocks to his feet and jumped into the ocean to drown himself. ", "In concentration camps, Jews were tortured by cutting off their scrotum and jamming it down their throat. This effectively cut off their air supply until they died of suffocation.",
  "Some child workers in Asia work so hard that their fingers are ground down to bloody stumps.",
  "One of the best ways to commit suicide is by train. The train conductor has no control over whether or no you die, but the blame is ultimately placed on him and he has to live the rest of his life in guilt knowing that he killed a man.",
  "During the potato famine in Ireland, people were so hungry that they were forced to eat their own children alive. The children would kick and scream, but in the end their flesh helped their parents live on.",
  "Right now, there are children in Ethiopia who will never eat in the entirety of their short lives. They live with an undying pain in their abdomen from the horrible hunger.",
  "While in the gas cambers, Jews experienced a crippling pain in their chest. This pain could go on for hours. Because of this, many innocent Jews committed suicide before they could be killed by their Nazi rulers.",
  "In the last 5 years, ISIS has killed thousands of innocent, unsuspecting civilians. These poor people are taken from their homes and family and tortured for days on end until their death.",
  "Recently, two 10-year-olds took a baby from its parents with no reason. Thy tortured it badly: They took its penis off, they sticked batteries in its ass and nose and other creepy stuff. In the end, they threw it to the trail rails and it was killed. The one 10-year-old committed suicide and the other one will soon get out of jail.",
  "Recently, in Greece, some Albanian moron choked his 4-year-old daughter, cut her into pieces and cooked them. Then he threw them randomly in different place in Athens. At least he got caught."];
  session.sendMessage(bot.choose(funfacts));
}

module.exports = {
    funfact: ["fun", GenerateRandomFact, "No arguments. Sends a random brutal fun fact."]
};
