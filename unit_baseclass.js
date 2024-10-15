class Unit {
  img = "./assets/placeholder.png";
  name = "unit";
  className = "unit";
  preDamageEffect = [];
  onDamageEffect = [];
  onDeathEffect = [];
  effectIcons = [];
  HP_UI = new Object();
  ATK_UI = new Object();
  SHIELD_UI = new Object();

  constructor(HP_MAX, ATK, SHIELD = 0, LVL = 1) {
    this.HP_MAX = HP_MAX;
    this._HP = HP_MAX;
    this._ATK = ATK;
    this._SHIELD = SHIELD;
    this.LVL = LVL;
  }
  set HP(hp) {
    this._HP = Math.min(hp, this.HP_MAX);
    this._HP = Math.max(this._HP, 0);
    if (hp == 0) {
      this.death();
    }
    this.HP_UI.innerText = `: ${this._HP}`;
  }
  get HP() {
    return this._HP;
  }
  set ATK(x) {
    this._ATK = x;
    this.ATK_UI.innerText = `: ${this._ATK}`;
  }
  get ATK() {
    return this._ATK;
  }
  set SHIELD(x) {
    this._SHIELD = Math.max(x, 0);
    this.SHIELD_UI.innerText = `: ${this._SHIELD}`;
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

    let imgdiv = document.createElement("div");
    imgdiv.className = "divIMG";
    let img = document.createElement("img");
    img.className = "IMG";
    img.src = this.img;
    imgdiv.appendChild(img);
    div.appendChild(imgdiv);

    let stat = document.createElement("div");
    stat.className = "Stat";
    stat.appendChild(createEffectIcon(HP_img));
    p = document.createElement("p");
    p.innerText = `: ${this.HP}`;
    this.HP_UI = p;
    stat.appendChild(p);
    stat.appendChild(createEffectIcon(ATK_img));
    p = document.createElement("p");
    p.innerText = `: ${this.ATK}`;
    this.ATK_UI = p;
    stat.appendChild(p);
    stat.appendChild(createEffectIcon(SHIELD_img));
    p = document.createElement("p");
    p.innerText = `: ${this.SHIELD}`;
    stat.appendChild(p);
    this.SHIELD_UI = p;

    div.appendChild(stat);

    let icons = document.createElement("div");
    icons.className = "EffectIcons";
    for (let icon of this.effectIcons) {
      let clone = createEffectIcon(icon);
      icons.appendChild(clone);
    }
    div.appendChild(icons);

    return div;
  }
  get div() {
    if (this._div) {
      return this._div;
    }
    this._div = this.render();
    return this._div;
  }
  reRender() {
    let parent = this._div.parentNode;
    parent.removeChild(this._div);
    this._div = this.render();
    parent.appendChild(this._div);
  }

  async takeDamage(attacker) {
    return new Promise(async (r) => {
      let reduce_dmg = attacker.ATK - this.SHIELD;
      this.SHIELD = this.SHIELD - attacker.ATK;
      for (let effect of this.preDamageEffect) {
        reduce_dmg = effect(reduce_dmg);
      }
      if (reduce_dmg > 0) {
        for (let effect of this.onDamageEffect) {
          await effect(this, attacker);
        }
        this.HP = Math.max(this.HP - reduce_dmg, 0);
        await this.takeDamageAnimation();
      }
      r();
    });
  }
  async heal(hl) {
    if (hl > 0) {
      this.HP += hl;
      await this.healAnimation();
    }
    return;
  }

  async death() {
    for (let effect of this.onDeathEffect) {
      await effect(this);
    }
    await this.deathAnimation();
    let parent = this.div.parentNode;
    parent.removeChild(this.div);
    return parent;
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
  healAnimation() {
    return new Promise((r) => {
      this.div.className += " healed";
      setTimeout(() => {
        this.div.className = this.className;
        r(arguments);
      }, 1000);
    });
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

  async action() {}
}

class BlockerGrave {
  render() {
    let div = document.createElement("div");
    div.className = "grave";
    div.object = this;

    let img = document.createElement("img");
    img.className = "IMG";
    img.src = "./assets/BlockerSoul.gif";
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
