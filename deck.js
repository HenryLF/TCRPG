const CardsInDeck = [
  new BlockerCard(1),
  new BlockerCard(1),
  new SpikyBlockerCard(1),
  new ArmoredBlockerCard(1),
  new SpikyBlockerCard(1),
  new SpikyBlockerCard(1),
  new FireRitual(1),
  new FireRitual(1),
  new FireRitual(1),
  new FireRitual(1),
  new FireRitual(1),
  new SoulStorm(1),
  new SoulStorm(1),
  new SoulStorm(1),
  new SoulStorm(1),
];

function initDeck() {
  for (let card of CardsInDeck) {
    playerDeck.append(card.div);
  }

  cardsInDiscardSpan.innerText = playerDiscard.childElementCount;
  cardsInDeckSpan.innerText = playerDeck.childElementCount;
}
initDeck();
function playerDraw() {
  return new Promise((r) => {
    while (cardInHand() < 5) {
      if (playerDeck.childElementCount == 0) {
        if (playerDiscard.childElementCount > 0) {
          resetDeck();
          continue;
        } else {
          break;
        }
      }
      let i = Math.floor(Math.random() * playerDeck.childElementCount);
      let card = playerDeck.children[i];
      // playerDeck.removeChild(card);
      hand_div.appendChild(card);
    }
    cardsInDiscardSpan.innerText = playerDiscard.childElementCount;
    cardsInDeckSpan.innerText = playerDeck.childElementCount;
    r();
  });
}
function resetDeck() {
  cardsInDiscardSpan.innerText = playerDiscard.childElementCount;
  cardsInDeckSpan.innerText = playerDeck.childElementCount;
  for (let card of playerDiscard.children) {
    playerDeck.appendChild(card);
  }
}
