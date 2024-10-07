function WaitForUserInput() {
  let Inputs = Array.from(document.querySelectorAll("#input"));
  return new Promise((resolve, reject) => {
    for (let input of Inputs) {
      input.onclick = (e) => {
        let rtn = e.target;
        while (rtn.id != "input") {
          rtn = rtn.parentNode;
        }
        resolve(rtn);
        input.onclick = undefined;
      };
      skipButton.onclick = (e) => {
        reject(true);
      };
      cancelButton.onclick = (e) => {
        reject(false);
      };
    }
  });
}

function WaitForUserSelection() {
  return WaitForUserInput().then(
    (userInput) => {
      let valid = Array.from(arguments)
        .map((e) => Array.from(userInput.classList).includes(e))
        .includes(true);
      if (valid) {
        return userInput;
      }
      return WaitForUserSelection(arguments);
    },
    (r) => {
      return r;
    }
  );
}

async function initTurn() {
  await playerDraw();
  playerPhase();
}

function initPlayerPhase() {
  phaseID.innerText = "player";
  return new Promise((resolve) => {
    setTimeout(() => {}, 100);
    resolve();
  });
}
async function playerPhase() {
  await initPlayerPhase();
  let userAction = await WaitForUserSelection("card", "hero");
  if (userAction === true) {
    enemyPhase();
    return;
  } else if (userAction.object instanceof Card) {
    await userAction.object.resolveHandle();
    playerPhase();
    return;
  } else {
    player.div.className = player.className + " attacking";
    let userTarget = await WaitForUserSelection("monster");
    player.div.className = player.className;
    if (userTarget === true || userTarget == false) {
      playerPhase();
      return;
    }
    await player.attack(userTarget.object);
    enemyPhase();
    return;
  }
}

function initEnemyPhase() {
  phaseID.innerText = "enemy";
  return new Promise((resolve) => {
    setTimeout(() => {}, 1000);
    resolve();
  });
}
async function enemyPhase() {
  await initEnemyPhase();
  for (monster of monstersOnFieldIterator()) {
    console.log(monster);
    monster.className = monster.object.className + " attacking";
    let userBlocker = await WaitForUserSelection("blocker", "hero").then(
      (userBlocker) => {
        if (userBlocker === true || userBlocker === false) {
          return defaultBlocker();
        }
        return userBlocker;
      }
    );
    monster.className = monster.object.className;
    await monster.object.attack(userBlocker.object);
  }
  initTurn();
  return;
}

let player = new Hero(8, 3, 2);
hero_div.appendChild(player.div);

for (let i = 0; i < 2; i++) {
  let m = new Monster(3, 5, 0);
  monster_div.appendChild(m.div);
}

playerDraw();
initTurn();
