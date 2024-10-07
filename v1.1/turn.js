let Monsters;
let Cards;
let Minions;
function initTurn() {
  Monsters = Array.from(document.querySelectorAll("#MonsterField button"));
  Minions = Array.from(document.querySelectorAll(".FieldMinion"));
  Cards = Array.from(document.querySelectorAll("#hand button"));
}
function disable(arr) {
  arr.forEach((e) => {
    e.disabled = true;
  });
}

function enable(arr) {
  arr.forEach((e) => {
    e.disabled = false;
  });
}

let MonsterMap = new Map();
function initLevel(n) {
  Level[n].forEach((e) => {
    e.render();
    MonsterMap.set(n,e)
  });
  Hero.render();
  playerDraw();
  initTurn();
  disable(Minions);
  disable(Monsters);
}

initLevel(0);
takeTurn();
