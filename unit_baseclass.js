class Unit {
  img = "./assets/placeholder.png";
  name = "unit";
  className = "unit";
  onDamageEffect = [];
  onDeathEffect = [];
  HP_UI = new Object();
  ATK_UI = new Object();
  SHIELD_UI = new Object();
  constructor(HP_MAX, ATK, SHIELD = 0) {
    this.HP_MAX = HP_MAX;
    this._HP = HP_MAX;
    this._ATK = ATK;
    this._SHIELD = SHIELD;
  }
  set HP(hp) {
    this._HP = hp;
    if (hp == 0) {
      this.death();
    }
    this.HP_UI.innerText = `: ${hp}`;
  }
  get HP() {
    return this._HP;
  }
  set ATK(x) {
    this.ATK = x;
    this.ATK_UI.innerText = `: ${x}`;
  }
  get ATK() {
    return this._ATK;
  }
  set SHIELD(x) {
    this._SHIELD = x;
    this.SHIELD_UI.innerText = `: ${x}`;
  }
  get SHIELD() {
    return this._SHIELD;
  }
  render() {
    let div = document.createElement("div");
    div.className = this.className;
    div.id = "input";
    div.object = this;

    let p = document.createElement("p");
    p.className = "Name";
    p.innerText = this.name;
    div.appendChild(p);

    let img = document.createElement("img");
    img.className = "IMG";
    img.src = this.img;
    div.appendChild(img);

    let stat = document.createElement("div");
    stat.className = "Stat";
    stat.appendChild(HP_img.cloneNode());
    p = document.createElement("p");
    p.innerText = `: ${this.HP}`;
    this.HP_UI = p;
    stat.appendChild(p);
    stat.appendChild(ATK_img.cloneNode());
    p = document.createElement("p");
    p.innerText = `: ${this.ATK}`;
    this.ATK_UI = p;
    stat.appendChild(p);
    stat.appendChild(SHIELD_img.cloneNode());
    p = document.createElement("p");
    p.innerText = `: ${this.SHIELD}`;
    stat.appendChild(p);
    this.SHIELD_UI = p;

    div.appendChild(stat);
    return div;
  }
  get div() {
    if (this._div) {
      return this._div;
    }
    this._div = this.render();
    return this._div;
  }
  takeDamageAnimation() {
    return new Promise((r) => {
      this.div.className += " damaged";
      setTimeout(() => {
        this.div.className = this.className;
        r(arguments);
      }, 1000);
    });
  }
  async takeDamage(attacker) {
    return new Promise(async (r) => {
      let reduce_dmg = attacker.ATK - this.SHIELD;
      this.SHIELD = Math.max(this.SHIELD - attacker.ATK, 0);
      if (reduce_dmg > 0) {
        this.HP = Math.max(this.HP - reduce_dmg, 0);
        await this.takeDamageAnimation();
        for (effect of this.onDamageEffect) {
          await effect(this, attacker);
        }
      }
      r();
    });
  }
  async death() {
    for (effect of this.onDeathEffect) {
      await effect(this);
    }
    await this.deathAnimation();
    let parent = this.div.parentNode;
    parent.removeChild(this.div);
    return parent;
  }

  deathAnimation() {
    return new Promise((r) => {
      this.div.className += " death";
      setTimeout(() => {
        this.div.className = this.className;
        r(arguments);
      }, 500);
    });
  }

  async attack(target) {
    await normalAttack(this, target);
  }
}

class BlockerGrave {
  render() {
    let div = document.createElement("div");
    div.className = "grave";
    div.object = this

    let img = document.createElement("img");
    img.className = "IMG";
    img.src = "./assets/gravestone.png";
    div.appendChild(img);
    return div;
  }
  get div() {
    if (this._div) {
      return this._div;
    }
    this._div = this.render();
    return this._div;
  }
}

function normalAttack(atk, tgt) {
  return new Promise(async (r) => {
    await tgt.takeDamage(atk);
    await atk.takeDamage(tgt);
    r();
  });
}
function firstStrikeAttack(atk, tgt) {
  return new Promise(async (r) => {
    await tgt.takeDamage(atk);
    console.log(tgt, tgt.HP, tgt.HP <= 0);
    if (tgt.HP <= 0) {
    } else {
      await atk.takeDamage(tgt);
    }
    r();
  });
}
