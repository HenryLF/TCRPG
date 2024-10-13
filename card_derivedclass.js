class BlockerCard extends Card {
  className = "blocker card";
  BlockerClass = Blocker;
  effectIcons = [];
  name = "ShitGobblin";
  img = "./assets/cards/minions/blocker.gif";
  HP_UI = new Object();
  ATK_UI = new Object();
  SHIELD_UI = new Object();
  constructor(lvl) {
    super(lvl);
  }
  get HP() {
    return this.LVL * this.BlockerClass.levelScaling[0];
  }
  get ATK() {
    return this.LVL * this.BlockerClass.levelScaling[1];
  }
  get SHIELD() {
    return this.LVL * this.BlockerClass.levelScaling[2];
  }
  levelUp() {
    super.levelUp();
    this.HP_UI.innerText = this.HP;
    this.ATK_UI.innerText = this.ATK;
    this.SHIELD_UI.innerText = this.SHIELD;

    this.LVL_UI.innerText = this.LVL;
  }
  render() {
    let div = super.render();

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
    let p = document.createElement("p");
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

    this.SHIELD_UI = p;
    stat.appendChild(p);

    div.appendChild(stat);

    let icons = document.createElement("div");
    icons.className = "EffectIcons";
    for (let icon of this.effectIcons) {
      icons.appendChild(createEffectIcon(icon));
    }
    div.appendChild(icons);
    return div;
  }
  resolve() {
    let slot = emptyBlockerSlot();
    if (slot) {
      let blocker = new this.BlockerClass(
        this.HP,
        this.ATK,
        this.SHIELD,
        this.LVL
      );
      slot.appendChild(blocker.div);
      return true;
    }
    return false;
  }
}

class SpellCard extends Card {
  className = "spell card";
  desc_UI = new Object();
  get spellDescription() {
    return "A spell with an effect";
  }
  constructor(LVL) {
    super(LVL);
  }
  render() {
    let div = super.render();

    let p = document.createElement("p");
    p.className = "SpellDescription";
    p.innerText = this.spellDescription;
    this.desc_UI = p;
    div.append(p);

    return div;
  }
  async resolve() {
    let graveCount = graveOnField();
    if (graveCount) {
      let res = await this.spellEffect(graveCount);
      if (res) {
        for (let grave of gravesOnFieldIterator()) {
          grave.parentNode.removeChild(grave);
        }
        return true;
      }
    }
    return false;
  }
  async spellEffect() {}
  levelUp() {
    super.levelUp();
    this.desc_UI.innerText = this.spellDescription;
  }
}

class SoulSpellCard extends SpellCard {
  className = "soulspell card";
  async resolve() {
    let graveCount = graveOnField();
    if (graveCount) {
      await this.spellEffect(graveCount);
      for (let grave of gravesOnFieldIterator()) {
        grave.parentNode.removeChild(grave);
      }
      return true;
    }
    return false;
  }
  async spellEffect() {}
}

class RitualCard extends SpellCard {
  className = "ritual card";
  async resolveHandle() {
    return new Promise(async (r) => {
      this.div.className = this.className + " select";
      let res = await this.resolve();
      if (res) {
        this.div.className = this.className + " played";
        setTimeout(() => {
          hand_div.removeChild(this.div);
          this.div.className = this.className;
          r();
        }, 1000);
      } else {
        this.div.className = this.className;
        r();
      }
    });
  }
  async resolve() {
    if (blockerOnField()) {
      let sacrifice = await WaitForUserSelection(".blocker.unit");
      if (sacrifice === false || sacrifice === true || sacrifice == undefined) {
        return false;
      }
      await this.spellEffect(sacrifice.object);
      sacrifice.object.death();
      return true;
    }
    return false;
  }

  async spellEffect(sacrifice) {}
}
