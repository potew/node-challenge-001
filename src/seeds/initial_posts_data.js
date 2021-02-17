exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('articles').del()
    .then(() =>
      // Inserts seed entries
      knex('articles').insert([
        {
          id: 1,
          author_id: '3',
          category: 'Finance',
          title: 'What is Anchoring?',
          summary: 'Explains what is Anchoring',
          first_paragraph: 'Example: people are asked to think of their social security number and then estimate the height of a tree. People with higher social security numbers are more likely to pick higher estimates for the height of a tree.',
          body: `Anchoring is a psychological effect whereby people's estimates of numbers or values are affected by previous but unrelated numbers or values. In other words, their guess of a number is "anchored" to the previous number.
          Anchoring also plays a big role in investing.
          Avalanche was at $5 a few weeks ago. A common fallacy is that it has already done a 10x, therefore it can't rise much more. Rather than thinking fundamentally what avalanche is worth, people are anchored to the fact that it was $5 a few weeks ago.
          If Avalanche was trading at $20 for most of 2020 instead of $5, then these same people would be happy to buy avalanche, because its only done 2.5x, surely it can do more.
          This is irrational thinking. Instead, we should look at avalanche's fundamentals and compare it to similar projects.
          Firstly, what is avalanche? Broadly, it's an eth competitor. Similar to say Polkadot or Cardano. They all have, or aim to have smart contracts, programmable money, fast transactions etc.
          Ok, so how does Avalanche compare to Cardano or Polkadot?`,
        },
        {
          id: 2,
          author_id: '1',
          category: 'MemeCoins',
          title: 'Chainlink is magic',
          summary: 'I\'m here to remind you that magic is real and that chainlink is the proof.',
          first_paragraph: 'Link',
          body: `>Legend of Zelda: ORACLE of seasons
          >4chan logo
          >chainlink logo
          >mayan 3-5-3 literally explains how chainlink works
          >star of ishtar, look up Klaus Schwab weird suit
          >twitter announcement of main net + GBC release date
          >main net release date + 3DS release date`,
        },
        {
          id: 3,
          author_id: '2',
          category: 'Technology',
          title: 'Monitor company shills are pissed off at CRT fans. They’re seething every time CRT is mentioned.',
          summary: 'Ever notice how lately the anti-CRT spam has reached a fever pitch? And it\'s just irrationally vitriolic. I get how some person might not want a CRT themselves, but what\'s the motivation for a person to get ANGRY at CRT users?',
          first_paragraph: 'Shills are pissed off that CRTs are now seen as a premium option and go for a premium price. They’re probably also angry third worlders who realize that they will never be able to afford a high end CRT.',
          body: `They both are subject to age.
          From personal experience, almost all the CRT TVs and monitors I've had needed a repair after 5 to 7 years:
          >Grundig 80s TV: failed 1996 
          hewlett packard 1994 OEM monitor: started having color issues around 2002, probable tube problems. Had a shitload of use.
          >LG 2005 CRT: Hasn't failed yet but had a weird problem with the original PC it was connected to, can no longer get signal from that particular machine. Every other PC/Monitor combo works.
          >Phillips 2005 flat screen CRT: 2009.
          They had several repairs because they kept failing after that.`,
        },
      ]));
};
