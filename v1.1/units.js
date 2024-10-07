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
  uncleansableEffectIcon = [];
  SHIELD = 0;
  IMPULSE = 0;
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
    if (this.IMPULSE) {
      p.innerText += `(+${this.IMPULSE})`;
    }
    stat.appendChild(p);
    if (this.SHIELD) {
      stat.appendChild(SHIELD_img.cloneNode());
      p = document.createElement("p");
      p.innerText = ` : ${this.SHIELD}`;
      stat.appendChild(p);
    }

    div.appendChild(stat);

    let effect = document.createElement("div");
    effect.className = "effect-div";
    this.uncleansableEffectIcon.forEach((element) => {
      effect.appendChild(element.cloneNode());
    });
    this.effectIcon.forEach((element) => {
      effect.appendChild(element.cloneNode());
    });
    div.appendChild(effect);

    return div;
  }
  preAttackEffect = [];
  onDamageEffect = [];
  postAttackEffect = [];
  preAttackedEffect = [];
  postAttackedEffect = [];
  onKillEffect = [];
  onDeathEffect = [];
  cleanse() {
    this.preAttackEffect = [];
    this.onDamageEffect = [];
    this.postAttackEffect = [];
    this.preAttackedEffect = [];
    this.postAttackedEffect = [];
    this.onKillEffect = [];
    this.onDeathEffect = [];
    this.effectIcon = [];
  }
  takeDamage(atk) {
    let dmg = Math.max(atk.ATK + atk.IMPULSE - this.SHIELD, 0);
    atk.IMPULSE = 0;
    this.SHIELD = Math.max(this.SHIELD - atk.ATK, 0);
    this.HP = this.HP - dmg;
    if (dmg) {
      this.onDamageEffect.map((f) => {
        f(this, atk);
      });
    }
    if (this.HP <= 0) {
      this.death(atk);
      atk.onKillEffect.map((f) => {
        f(atk, this);
      });
    } else {
      this.animationDamage();
    }
  }
  takeEffectDamage(dmg) {
    this.HP = this.HP + this.SHIELD - dmg;
    this.SHIELD = Math.max(this.SHIELD - dmg, 0);

    this.onDamageEffect.map((f) => {
      f(this, effectDamagePlaceholder);
    });

    if (this.HP <= 0) {
      this.death(effectDamagePlaceholder);
    } else {
      this.animationDamage();
    }
  }
  heal(hl) {
    this.HP = Math.min(this.HP + hl, this.HP_MAX);
  }
  death(atk) {
    this.onDeathEffect.map((f) => {
      f(this, atk);
    });
    this.animationDeath();
  }
  animationDamage() {
    this.className += " damaged";
    setTimeout(() => {
      this.className = this.className.replace(" damaged", "");
    }, 1000);
  }
  animationDeath() {
    this.className += " death";
    setTimeout(() => {
      this.className = this.className.replace(" death", "");
    }, 1000);
  }
}

// Attacks
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

const firstStrikeEffectIcon = document.createElement("img");
firstStrikeEffectIcon.src = "./assets/firstStrike.png";
firstStrikeEffectIcon.className = "effect icons";

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

function* getAllUnits() {
  let units = [...MonsterMap.values(), ...BlockerMap.values(), player].filter(
    (e) => e instanceof Unit
  );
  for (let unit of units) {
    yield unit;
  }
}
