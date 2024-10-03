let BlockerMap = new Map();
let BlockerID = 0;
class Blocker extends Unit {
  img = "./assets/cards/minions/ShitGobblin.png";
  className = "blocker unit";
  name = "Goblin";
  constructor(HP_MAX, ATK) {
    super(HP_MAX, ATK);
    this.id = BlockerID;
    BlockerMap.set(BlockerID, this);
    BlockerID += 1;
  }
  death() {
    super.death();
    BlockerMap.set(this.id, new BlockerGrave(this.id));
  }
}

class BlockerGrave {
  img = "./assets/gravestone.png";
  className = "grave unit";
  constructor(id) {
    this.id = id;
  }
  release() {
    BlockerMap.delete(this.id);
  }
  render() {
    let div = document.createElement("div");
    div.className = this.className;
    let img = document.createElement("img");
    img.src = this.img;
    div.appendChild(img);
    return div;
  }
}




//Blocker




const soulessEffectIcon = document.createElement("img");
soulessEffectIcon.src = "./assets/souless.png";
soulessEffectIcon.className = "effect icons";

class SoulessBotCard extends BlockerCard {
  name = "SoulessBot";
  img = "./assets/cards/minions/SoulessBot.png";
  resolveHandler() {
    let k = new SoulessBot(this.HP, this.ATK);
    k.SHIELD = 1;
  }
}
class SoulessBot extends Blocker {
  name = "Souless Bot";
  img = "./assets/cards/minions/SoulessBot.png";
  effectIcon = [soulessEffectIcon];
  death() {
    BlockerMap.delete(this.id);
  }
}

class ExplosiveGuyCard extends BlockerCard {
  name = "SoulessBot";
  img = "assets/cards/minions/bomb-with-skull-outline.png";
  resolveHandler() {
    new ExplosiveGuy(this.HP, this.ATK);
  }
}
class ExplosiveGuy extends Blocker {
  name = "ExplosiveGuy";
  img = "assets/cards/minions/bomb-with-skull-outline.png";
  onDeathEffect = [monsterAOEEffect(1)];
}

class SoulGuardian extends Blocker {
    name = "Soul Guardian";
    img = "./assets/scrap/fire emblem/14129.png";
  }
