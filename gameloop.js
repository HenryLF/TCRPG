let turnCounter = 0;

let PlayerDeck = [
  new BlockerCard(3, 2),
  new BlockerCard(3, 2),
  new BlockerCard(3, 2),
  new SoulessBotCard(3, 3),
  new SoulessBotCard(3, 3),
  new ExplosiveGuyCard(2, 0),
  new ExplosiveGuyCard(2, 0),
  new ExplosiveGuyCard(2, 0),
  new BlockerCard(3, 2),
  new BlockerCard(3, 2),
  new SoulShield(),
  new SoulShield(),
  new SoulStorm(),
  new SoulStorm(),
  new SoulSummon(),
];
function shuffleDeck() {
  for (var i = PlayerDeck.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = PlayerDeck[i];
    PlayerDeck[i] = PlayerDeck[j];
    PlayerDeck[j] = temp;
  }
}

shuffleDeck();

let PlayerHand = new Map();
function PlayerDraw() {
  for (let i = 0; i < 5; i++) {
    if (PlayerHand.has(i)) {
      continue;
    }
    card = PlayerDeck.pop();
    card.handID = i;
    PlayerHand.set(i, card);
  }
}

async function firstPhase() {
  initFirstPhase();
  WaitForUserInput().then(
    (Atc) => {
      if (Atc instanceof Card) {
        Atc.resolve();
        firstPhase();
      } else if (Atc instanceof Hero) {
        player.className = "hero unit attack";
        render();
        WaitForUserInput().then((Tgt) => {
          if (Tgt instanceof Monster) {
            player.attack(Tgt);
            secondPhase();
          } else {
            firstPhase();
          }
        }, firstPhase);
      }
    },
    (r) => {
      r ? secondPhase() : firstPhase();
    }

  );
}
function initTurn() {
  turnCounter++;
  PlayerDraw();
  turnCounterSpan.innerText = turnCounter;
  firstPhase();
}

function initFirstPhase() {
  player.className = "hero unit";
  hand.style.pointerEvents = "auto";
  monster_div.pointerEvents = "auto";
  BlockerUI.forEach((e) => {
    e.className = "blocker unit";
  });
  phaseID.innerText = "player";
  phaseDescriptionP.innerHTML = Phase1;
  render();
}

async function secondPhase() {
  initSecondPhase();
  BlockerUI.forEach((e) => {
    e.className = "blocker unit waiting";
  });
  for ([id, monster] of [...MonsterMap.entries()]) {
    MonsterUI.get(id).className = "monster unit attack";
    await WaitForUserSelection([Blocker, Hero], defaultBlocker).then(
      (blocker) => {
        monster.attack(blocker);
        MonsterUI.get(id).className = "monster unit";
        render();
      }
    );
  }

  initTurn();
}

function initSecondPhase() {
  hand.style.pointerEvents = "none";
  monster_div.pointerEvents = "none";
  player.className = "hero unit";
  phaseID.innerText = "enemy";
  phaseDescriptionP.innerHTML = Phase2;
  render();
}

async function resolvePromiseSeq(job_arr) {
  let rtn = [];
  for (job of job_arr) {
    rtn.push(await job());
  }
  return rtn;
}

player = new Hero(8, 3);

new GeneralArmor(8, 3);
new Monster(3, 3);
new GeneralArmor(4, 5);

// HeroAttack
render();

initTurn();
