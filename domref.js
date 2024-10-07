const skipButton = document.getElementsByClassName("skip")[0];
const cancelButton = document.getElementsByClassName("cancel")[0];

const hand_div = document.getElementById("hand");
const hero_div = document.getElementById("hero-container");
const monster_div = document.getElementById("monster-container");
const blocker_div = Array.from(document.querySelectorAll(".blocker-container"));

const phaseID = document.getElementById("phase-id");

const playerDeck = document.getElementById("deck-div");
const playerDiscard = document.getElementById("discard-div");

const cardsInDeck = document.getElementById("n-deck");
const cardsInDiscard = document.getElementById("n-discard");

function cardInHand() {
  return hand_div.childElementCount;
}

function* cardsInHandIterator() {
  let CARDS = Array.from(hand_div.children);
  for (let card of CARDS) {
    yield card;
  }
}

function monsterOnField() {
  return monster_div.children.length;
}
function* monstersOnFieldIterator() {
  let MONSTERS = Array.from(monster_div.children);
  for (let monster of MONSTERS) {
    yield monster;
  }
}

function* blockersOnFieldIterator() {
  for (let blocker_slot of blocker_div) {
    if (blocker_slot.childElementCount) {
      let blocker = blocker_slot.children[0];
      if (blocker.object instanceof Blocker) {
        yield blocker;
      }
    }
  }
}
function blockerOnField() {
  return [...blockersOnFieldIterator()].length;
}

function* gravesOnFieldIterator() {
  for (let blocker_slot of blocker_div) {
    if (blocker_slot.childElementCount) {
      let blocker = blocker_slot.children[0];
      if (blocker.object instanceof BlockerGrave) {
        yield blocker;
      }
    }
  }
}
function graveOnField() {
  return [...gravesOnFieldIterator()].length;
}

function defaultBlocker() {
  return [...blockersOnFieldIterator()].concat([...hero_div.children])[0];
}


//Icons
const HP_img = document.createElement("img");
HP_img.src = "./assets/heart.png";
HP_img.className = "Icons";

const ATK_img = document.createElement("img");
ATK_img.src = "./assets/sword.png";
ATK_img.className = "Icons";
const SHIELD_img = document.createElement("img");
SHIELD_img.src = "./assets/shield.png";
SHIELD_img.className = "Icons";