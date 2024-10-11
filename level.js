function LevelGenerator(n) {
  for (let i = 0; i < n; i++) {
    let m = new Monster(5, 4, 0);
    monster_div.appendChild(m.div);
  }
}

async function getLevelReward(n) {
  nextLevelOverlay.style.display = "flex";
  await WaitForUserAugment(n);
  nextLevelOverlay.style.display = "none";
}

function WaitForUserAugment(n) {
  return new Promise((r) => {
    cardRewardButton.onclick = async (e) => {
      await getRandomcard(n);
      cardRewardButton.onclick = undefined;
      r();
    };
    statRewardButton.onclick = (e) => {
      playerLevelUp(n);
      statRewardButton.onclick = undefined;
      r();
    };
    levelRewardButton.onclick = async (e) => {
      await upGradeCard();
      levelRewardButton.onclick = undefined;
      r();
    };
  });
}
async function getRandomcard(n) {
  return new Promise((r) => {
    let c = cardDrop(n);
    console.log(c)
    let div = c.render();
    div.className += " CardLookup";
    nextLevelOverlay.appendChild(div);
    CardsInDeck.push(c);
    div.onclick = (e) => {
      div.onclick = undefined;
      r();
    };
  });
}
function playerLevelUp() {
  player.HP_MAX += 1;
  player.heal(100);
  player.ATK += 1;
  player.SHIELD += 1;
}
async function upGradeCard() {
  initDeck();
  playerDeckOverlay.style.display = "flex";
  await new Promise((r) => {
    for (let card of playerDeck.childNodes) {
      card.onclick = (e) => {
        card.object.levelUp();
        playerDeckOverlay.style.display = "none";
        r();
      };
    }
  });
  for (let card of playerDeck.childNodes) {
    card.onclick = "none";
  }
}

const cardRewardTable = [
  [
    new ArmoredBlockerCard(1),
    new SpikyBlockerCard(1),
    new ExplosiveBlockerCard(1),
    new SoulBlessing(1),
    new SoulStorm(1),
  ],
  [
    new ArmoredBlockerCard(1),
    new SpikyBlockerCard(1),
    new ExplosiveBlockerCard(1),
    new FireRitual(1),
    new SoulBlessing(1),
    new SoulStorm(2),
  ],
];
function cardDrop(n) {
  let drop_lvl = Math.min(Math.floor(n / 5),cardRewardTable.length);
  let drop_index = Math.floor(Math.random()*cardRewardTable[drop_lvl].length);
  console.log(drop_index,drop_lvl)
  return cardRewardTable[drop_lvl][drop_index]
}
