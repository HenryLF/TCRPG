let turnCounter = 0;
let levelCounter = 0;

function initLevel() {
  turnCounter = 0;
  Levels[levelCounter]();
}

function initTurn() {
  turnCounter++;
  if (!MonsterMap.size) {
    levelCounter++;
    initLevel();
  }
  shuffleDeck();
  PlayerDraw();
  turnCounterSpan.innerText = turnCounter;
  firstPhase();
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
      } else {
        firstPhase();
      }
    },
    (r) => {
      r ? secondPhase() : firstPhase();
    }
  );
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

// HeroAttack
render();
initLevel();
initTurn();
