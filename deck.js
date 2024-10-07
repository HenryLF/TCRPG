const CardsInDeck = [
  new BlockerCard(3, 3, 2),
  new BlockerCard(3, 3, 2),
  new BlockerCard(3, 3, 2),
  new BlockerCard(3, 3, 2),
  new BlockerCard(3, 3, 2),
  new BlockerCard(3, 3, 2),
  //   new BlockerCard(3, 3, 2),
  //   new BlockerCard(3, 3, 2),
  //   new BlockerCard(3, 3, 2),
  //   new BlockerCard(3, 3, 2),
  //   new BlockerCard(3, 3, 2),
  //   new BlockerCard(3, 3, 2),
  //   new BlockerCard(3, 3, 2),
  //   new BlockerCard(3, 3, 2),
  //   new BlockerCard(3, 3, 2),
  //   new BlockerCard(3, 3, 2),
];

function initDeck() {
  for (let card of CardsInDeck) {
    playerDeck.append(card.div);
  }

  cardsInDiscard.innerText = playerDiscard.childElementCount;
  cardsInDeck.innerText = playerDeck.childElementCount;
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
      playerDeck.removeChild(card);
      hand_div.appendChild(card);
    }
    cardsInDiscard.innerText = playerDiscard.childElementCount;
    cardsInDeck.innerText = playerDeck.childElementCount;
    r();
  });
}
function resetDeck() {
  cardsInDiscard.innerText = playerDiscard.childElementCount;
  cardsInDeck.innerText = playerDeck.childElementCount;
}
