let player;
function WaitForUserInput() {
  let Inputs = Array.from(
    document.querySelectorAll(".field #input, #hand #input")
  );
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

async function WaitForUserSelection(cssSelector) {
  let validInput = document.querySelectorAll(cssSelector);
  for (let input of validInput) {
    input.className += " validInput";
  }
  let userInput = await WaitForUserInput().catch((r) => r);
  for (let input of validInput) {
    input.className = input.object.className;
  }
  if (userInput === true || userInput === false) {
    return userInput;
  } else if (userInput.matches(cssSelector)) {
    return userInput;
  } else {
    return await WaitForUserSelection(cssSelector);
  }
}

let turnCounter = 0;
let levelCounter = 0;
function initLevel() {
  levelCountSpan.innerText = levelCounter;
  LevelGenerator(levelCounter);
  turnCounter = 0;
}
async function initTurn() {
  if (monsterOnField() == 0) {
    levelCounter++;
    initLevel();
  }
  turnCounter++;
  turnCountSpan.innerText = turnCounter;
  await playerDraw();
  playerPhase();
}

function initPlayerPhase() {
  phaseIDSpan.innerText = "player";
  return new Promise((resolve) => {
    setTimeout(() => {}, 100);
    resolve();
  });
}
async function playerPhase() {
  await initPlayerPhase();
  let userAction = await WaitForUserSelection(".card, .hero");
  //Play a card
  if (userAction.object instanceof Card) {
    await userAction.object.resolveHandle();
    playerPhase();
    return;
  }
  //Hero Action
  else if (userAction.object instanceof Hero) {
    let action = await player.action();
    if (action) {
      enemyPhase();
      return;
    } else {
      playerPhase();
      return;
    }
  }
  //SkipButton
  else if (userAction === true) {
    enemyPhase();
    return;
  }
  //Wrong Input/Cancel
  else {
    playerPhase();
    return;
  }
}

function initEnemyPhase() {
  phaseIDSpan.innerText = "enemy";
  return new Promise((resolve) => {
    setTimeout(() => {}, 1000);
    resolve();
  });
}
async function enemyPhase() {
  await initEnemyPhase();
  for (monster of monstersOnFieldIterator()) {
    await monster.object.action();
  }
  initTurn();
  return;
}
