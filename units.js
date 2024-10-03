const HP_img = document.createElement("img");
HP_img.src = "./assets/heart.png";
HP_img.className = "icons";
const ATK_img = document.createElement("img");
ATK_img.src = "./assets/sword.png";
ATK_img.className = "icons";
const SHIELD_img = document.createElement("img");
SHIELD_img.src = "./assets/shield.png";
SHIELD_img.className = "effect icons";


class Unit {
  name = "unit";
  img = "./assets/placeholder.png";
  className = "unit";
  effectIcon = [];
  SHIELD = 0;
  constructor(HP_MAX, ATK) {
    this.HP_MAX = HP_MAX;
    this.HP = HP_MAX;
    this.ATK = ATK;
  }

  render() {
    let div = document.createElement("div");
    div.className = this.className;
    let p = document.createElement("p");
    p.className = "name";
    p.innerText = this.name;
    div.appendChild(p);

    let img = document.createElement("img");
    img.src = this.img;
    div.appendChild(img);

    let stat = document.createElement("div");
    stat.className = "stat";
    stat.appendChild(HP_img.cloneNode());
    p = document.createElement("p");
    p.innerText = ` : ${this.HP}`;
    stat.appendChild(p);
    stat.appendChild(ATK_img.cloneNode());
    p = document.createElement("p");
    p.innerText = ` : ${this.ATK}`;
    stat.appendChild(p);
    if(this.SHIELD){
      stat.appendChild(SHIELD_img.cloneNode());
      p = document.createElement("p");
      p.innerText = ` : ${this.SHIELD}`;
      stat.appendChild(p)
    }

    div.appendChild(stat);

    let effect = document.createElement("div");
    effect.className = "effect-div";
    this.effectIcon.forEach((element) => {
      effect.appendChild(element.cloneNode());
    });
    div.appendChild(effect);

    return div;
  }
  preAttackEffect = [];
  takeDamageEffect = [];
  postAttackEffect = [];
  preAttackedEffect = [];
  postAttackedEffect = [];
  onKillEffect = [];
  onDeathEffect = [];
  takeDamage(atk) {
    let dmg = Math.max(atk.ATK - this.SHIELD, 0);
    this.SHIELD = Math.max(this.SHIELD - atk.ATK, 0);
    this.HP = Math.max(this.HP - dmg, 0);
    if (dmg) {
      this.takeDamageEffect.map((f) => {
        f(this, atk);
      });
    }
    if (this.HP <= 0) {
      this.death(atk);
      atk.onKillEffect.map((f) => {
        f(atk, this);
      });
    }
  }
  death(atk) {
    this.onDeathEffect.map((f) => {
      f(this, atk);
    });
  }
}

let MonsterMap = new Map();
let MonsterID = 0;
class Monster extends Unit {
  name = "AHSAMAMA !!"
  img = "assets/monsters/spider.png";
  className = "monster unit";
  constructor(HP_MAX, ATK) {
    super(HP_MAX, ATK);
    this.id = MonsterID;
    MonsterMap.set(MonsterID, this);
    MonsterID += 1;
  }
  attack(target) {
    normalAttack(this, target);
  }
  death() {
    super.death();
    MonsterMap.delete(this.id);
  }
}
class Hero extends Unit {
  img = "assets/player.png";
  name = "Percival";
  className = "hero unit";
  effectIcon = [firstStrikeEffectIcon];
  attack(target) {
    firstStrikeAttack(this, target);
  }
  death() {
    super.death();
    window.alert("GAME OVER");
  }
}
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

// Attacks
function normalAttack(atk, tgt) {
  atk.pre_attack.map((f) => f(atk));
  tgt.HP -= atk.ATK;
  tgt.takeDamage.map((f) => {
    f(tgt);
  });
  if (tgt.HP <= 0) {
    tgt.death();
    atk.kill.map((f) => f(atk));
  }
  atk.HP -= atk.ATK;
  if (atk.HP <= 0) {
    atk.death();
  } else {
    atk.takeDamage.map((f) => f(atk));

    atk.post_attack.map((f) => f(atk));
  }
}
function normalAttack(atk, tgt) {
  atk.preAttackEffect.map((f) => {
    f(atk, tgt);
  });
  tgt.preAttackedEffect.map((f) => {
    f(tgt, atk);
  });
  tgt.takeDamage(atk);
  atk.takeDamage(tgt);
  atk.postAttackEffect.map((f) => {
    f(atk, tgt);
  });
  tgt.postAttackedEffect.map((f) => {
    f(tgt, atk);
  });
}
function firstStrikeAttack(atk, tgt) {
  atk.preAttackEffect.map((f) => {
    f(atk, tgt);
  });
  tgt.preAttackedEffect.map((f) => {
    f(tgt, atk);
  });
  tgt.takeDamage(atk);
  if (tgt.HP > 0) {
    atk.takeDamage(tgt);
  }
  atk.postAttackEffect.map((f) => {
    f(atk, tgt);
  });
  tgt.postAttackedEffect.map((f) => {
    f(tgt, atk);
  });
}

//Effect

const armorEffectIcon = document.createElement("img");
armorEffectIcon.src = "./assets/armor.png";
armorEffectIcon.className = "effect icons";

const firstStrikeEffectIcon = document.createElement("img");
firstStrikeEffectIcon.src = "./assets/firstStrike.png";
firstStrikeEffectIcon.className = "effect icons";

const soulessEffectIcon = document.createElement("img");
soulessEffectIcon.src = "./assets/souless.png";
soulessEffectIcon.className = "effect icons";
