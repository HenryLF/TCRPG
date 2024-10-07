let hero_div = document.getElementById("hero_container");
let monster_div = document.getElementById("monsters");
let hand = document.getElementById("hand");
const skipButton = document.getElementById("skip");
const cancelButton = document.getElementById("cancel");

const turnCounterSpan = document.getElementById("turn-counter");
const phaseDescriptionP = document.getElementById("phase-description");
const phaseID = document.getElementById("phase-id");

const cardInDiscard = document.getElementById("n-discard");
const cardInDeck = document.getElementById("n-deck");

let MonsterUI;
let BlockerUI;
let CardUI;

function render() {
  monster_div.innerHTML = "";
  MonsterUI = new Map();
  MonsterMap.forEach((unit, id) => {
    let div = unit.render();
    monster_div.appendChild(div);
    MonsterUI.set(id, div);
  });

  BlockerUI = new Map();
  k = 0;
  for ([id, unit] of [...BlockerMap.entries()]) {
    Blocker_div = document.getElementById(`blocker-${k}`);
    Blocker_div.innerHTML = "";
    let div = unit.render();
    Blocker_div.appendChild(div);
    BlockerUI.set(id, div);
    k++;
  }
  while (k < 5) {
    Blocker_div = document.getElementById(`blocker-${k}`);
    Blocker_div.innerHTML = "";
    k++;
  }

  hero_div.replaceChildren(player.render());

  hand.innerHTML = "";
  CardUI = new Map();
  PlayerHand.forEach((card, id) => {
    let div = card.render();
    hand.appendChild(div);
    CardUI.set(id, div);
  });

  cardInDiscard.innerText = DiscardPile.length;
  let rect = cardInDiscard.getBoundingClientRect()
  document.body.style.setProperty("--discard-top",rect.top)
  document.body.style.setProperty("--discard-left",rect.left)
  cardInDeck.innerText = PlayerDeck.length;

}

function WaitForUserInput() {
  return new Promise((resolve, reject) => {
    hero_div.addEventListener("click", () => {
      resolve(player);
    });
    BlockerUI.forEach((el, id) => {
      el.addEventListener("click", () => {
        resolve(BlockerMap.get(id));
      });
    });
    MonsterUI.forEach((el, id) => {
      el.addEventListener("click", () => {
        resolve(MonsterMap.get(id));
      });
    });
    CardUI.forEach((el, id) => {
      el.addEventListener("click", () => {
        resolve(PlayerHand.get(id));
      });
    });
    skipButton.addEventListener("click", () => {
      reject(true);
    });
    cancelButton.addEventListener("click", () => {
      reject(false);
    });
  });
}

function WaitForUserBlocker() {
  return WaitForUserInput().then(
    (block) => {
      if (block instanceof Blocker || block instanceof Hero) {
        return block;
      } else {
        return WaitForUserBlocker();
      }
    },
    (r) => {
      return r ? defaultBlocker() : WaitForUserBlocker();
    }
  );
}

function WaitForUserSelection(AcceptedResult, SkipHandle, CancelHandle) {
  return WaitForUserInput().then(
    (UserInput) => {
      let valid = AcceptedResult.map((e) => UserInput instanceof e).some(
        (e) => e
      );
      if (valid) {
        return UserInput;
      } else {
        return WaitForUserSelection(AcceptedResult, SkipHandle, CancelHandle);
      }
    },
    (r) => {
      return r && SkipHandle
        ? SkipHandle()
        : CancelHandle
        ? CancelHandle()
        : WaitForUserSelection(AcceptedResult, SkipHandle, CancelHandle);
    }
  );
}
function defaultBlocker() {
  return [...BlockerMap.values()]
    .filter((m) => {
      return m.HP > 0;
    })
    .concat([player])[0];
}

let Phase1 =
  "You can play as many card as you want, this phase end with the hero attacking or the SKIP button being pressed.";

let Phase2 =
  "The monsters are attacking, select an unit (a blocker or the hero) that will take the attack.";
