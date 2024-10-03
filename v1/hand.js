let playerHand = new Array();

function playerDraw() {
  playerHand = new Array();
  hand.innerHTML = "";
  for (let i = 0; i < maxHandSize; i++) {
    let c;
    if (Math.random() > 0.5) {
      c = new Spell();
    } else {
      c = new ShitGobblin();
    }
    c.render();
    playerHand.push(c);
    hand.appendChild(c.btn);
  }
}
