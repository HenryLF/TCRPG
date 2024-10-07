class Blocker extends Unit {
  className = "blocker unit";
  img = "./assets/cards/minions/ShitGobblin.png";
  async death() {
    let parent = await super.death();
    console.log(parent);
    let grave = new BlockerGrave();
    parent.appendChild(grave.div);
  }
}

class Hero extends Unit {
  className = "hero unit";
  name = "Percival";
  img = "./assets/scrap/fire emblem/14096.png";
  async attack(target) {
    await firstStrikeAttack(this, target);
  }
}

class Monster extends Unit {
  className = "monster unit";
  name = "Monster";
  img = "./assets/monsters/spider.png";
}
