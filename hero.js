class Hero extends Unit {
  img = "assets/player.png";
  name = "Percival";
  className = "hero unit";
  uncleansableEffectIcon = [firstStrikeEffectIcon];
  attack(target) {
    firstStrikeAttack(this, target);
  }
  death() {
    super.death();
    window.alert("GAME OVER");
  }
}

let PlayerDeck = [
  new BlockerCard(3, 2),
  new BlockerCard(3, 2),
  new BlockerCard(3, 2),
  new WindRitual(),
];
//  [
//   new BlockerCard(3, 2),
//   new BlockerCard(3, 2),
//   new BlockerCard(3, 2),
//   new SoulessBotCard(3, 3),
//   new SoulessBotCard(3, 3),
//   new ExplosiveGuyCard(2, 0),
//   new ExplosiveGuyCard(2, 0),
//   new ExplosiveGuyCard(2, 0),
//   new BlockerCard(3, 2),
//   new BlockerCard(3, 2),
//   new SoulShield(),
//   new SoulShield(),
//   new SoulStorm(),
//   new SoulStorm(),
//   new SoulSummon(),
// ];

let DiscardPile = new Array();

function shuffleDeck() {
  for (var i = PlayerDeck.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = PlayerDeck[i];
    PlayerDeck[i] = PlayerDeck[j];
    PlayerDeck[j] = temp;
  }
}

let PlayerHand = new Map();
function PlayerDraw() {
  for (let i = 0; i < 5; i++) {
    if (PlayerHand.has(i)) {
      continue;
    }
    card = PlayerDeck.pop();
    if (!card) {
      if (DiscardPile.length) {
        PlayerDeck = DiscardPile;
        shuffleDeck();
        DiscardPile = new Array();
        card = PlayerDeck.pop();
      } else {
        continue;
      }
    }
    card.handID = i;
    PlayerHand.set(i, card);
  }
}
