const skipButton = document.getElementsByClassName("skip")[0];
const cancelButton = document.getElementsByClassName("cancel")[0];

const hand_div = document.getElementById("hand");
const hero_div = document.getElementById("hero-container");
const monster_div = document.getElementById("monster-container");
const blocker_div = Array.from(document.querySelectorAll(".blocker-container"));

const turnCountSpan = document.getElementById("turn-counter");
const levelCountSpan = document.getElementById("level-counter");
const phaseIDSpan = document.getElementById("phase-id");

const playerDeck = document.getElementById("deck-div");
const playerDeckOverlay = document.getElementById("deck-overlay");

const playerDiscard = document.getElementById("discard-div");
const playerDiscardOverlay = document.getElementById("discard-overlay");
const playerDiscardOverlayCancel = document.getElementById(
  "discard-overlay-cancel"
);

const nextLevelOverlay = document.getElementById("next-level-overlay");
const cardRewardButton = document.getElementById("card-reward");
const levelRewardButton = document.getElementById("level-reward");
const statRewardButton = document.getElementById("stat-reward");
const deckButton = document.getElementById("deck-btn");
deckButton.onclick = (e) => {
  playerDeckOverlay.style.display = "flex";
};

const playerDeckOverlayCancel = document.getElementById("deck-overlay-cancel");
playerDeckOverlayCancel.onclick = (e) => {
  playerDeckOverlay.style.display = "none";
};

const discardButton = document.getElementById("discard-btn");
discardButton.onclick = (e) => {
  playerDiscardOverlay.style.display = "flex";
};
playerDiscardOverlayCancel.onclick = (e) => {
  playerDiscardOverlay.style.display = "none";
};
const cardsInDeckSpan = document.getElementById("n-deck");
const cardsInDiscardSpan = document.getElementById("n-discard");

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
  let Monsters = document.querySelectorAll(".monster");
  for (let monster of Monsters) {
    yield monster;
  }
}

function emptyBlockerSlot() {
  for (let slot of blocker_div) {
    if (slot.childElementCount == 0) {
      return slot;
    }
  }
  return false;
}
function* blockersOnFieldIterator() {
  let Blockers = Array.from(document.querySelectorAll(".field  .blocker.unit"));
  for (let blocker of Blockers) {
    yield blocker;
  }
}
function blockerOnField() {
  return [...blockersOnFieldIterator()].length;
}
function defaultBlocker() {
  return [...blockersOnFieldIterator()].concat([...hero_div.children])[0];
}

function* gravesOnFieldIterator() {
  let Graves = Array.from(document.querySelectorAll(".grave"));
  for (let grave of Graves) {
    yield grave;
  }
}
function graveOnField() {
  return [...gravesOnFieldIterator()].length;
}

//Icons
const HP_img = document.createElement("img");
HP_img.src = "./assets/heart.png";
HP_img.className = "Icons";
HP_img.txt = "HP : I've heard it stands for Health Point";

const ATK_img = document.createElement("img");
ATK_img.src = "./assets/sword.png";
ATK_img.className = "Icons";
ATK_img.txt = "ATK : The size of this unit's small arms.";

const SHIELD_img = document.createElement("img");
SHIELD_img.src = "./assets/shield.png";
SHIELD_img.className = "Icons";
SHIELD_img.txt = "SHIELD : Block X damage once.";

const armorEffectIcon = document.createElement("img");
armorEffectIcon.src = "./assets/armor.png";
armorEffectIcon.className = "Icons";
armorEffectIcon.txt = "ARMOR : Reduce damage taken by 1.";

const firstStrikeEffectIcon = document.createElement("img");
firstStrikeEffectIcon.src = "./assets/firstStrike.png";
firstStrikeEffectIcon.className = "Icons";
firstStrikeEffectIcon.txt =
  "FIRST STRIKE: Will not take damage if the target die";

const spikyEffectIcon = document.createElement("img");
spikyEffectIcon.src = "./assets/cactus.png";
spikyEffectIcon.className = "Icons";
spikyEffectIcon.txt =
  "Spiky: Attacking this guy will for sure result in damage.";

const explosiveEffectIcon = document.createElement("img");
explosiveEffectIcon.src = "./assets/explosive.png";
explosiveEffectIcon.className = "Icons";
explosiveEffectIcon.txt =
  "Explosive: On death will inflict damage to every enemy.";

const inFlameEffectIcon = document.createElement("img");
inFlameEffectIcon.src = "./assets/fire.png";
inFlameEffectIcon.className = "Icons";
inFlameEffectIcon.txt = "On damage: will buff itself by 0/1/1.";

const lunaticEffectIcon = document.createElement("img")
lunaticEffectIcon.src = './assets/human.png'
lunaticEffectIcon.className = 'Icons'
lunaticEffectIcon.txt = 'The longer the combat gets... crazier it becomes...'

const multiAttackEffectIcon = document.createElement("img")
multiAttackEffectIcon.src = './assets/fist.png'
multiAttackEffectIcon.className = 'Icons'
multiAttackEffectIcon.txt = 'Get one more attack.'

const iconTooltip = document.createElement("div");
iconTooltip.id = "tooltip";
document.body.append(iconTooltip);

function createEffectIcon(node) {
  let clone = node.cloneNode();
  clone.addEventListener("mouseover", (e) => {
    iconTooltip.style.visibility = "visible";
    iconTooltip.innerText = node.txt;
    iconTooltip.style.top = e.clientY + "px";
    iconTooltip.style.left = e.clientX + "px";
  });
  clone.addEventListener("mouseout", (e) => {
    iconTooltip.style.visibility = "hidden";
  });
  return clone;
}

const dialogDiv = document.getElementById("dialog-div");
function createDialog(Text) {
  return new Promise((r) => {
    dialogDiv.innerText = Text;
    dialogDiv.style.display = "flex";
    window.addEventListener(
      "click",
      (e) => {
        dialogDiv.style.display = "none";
        r();
      },
      { once: true }
    );
  });
}
