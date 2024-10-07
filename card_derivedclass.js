class BlockerCard extends Card {
  className = "blocker card";
  BlockerClass = Blocker;
  img = "./assets/cards/minions/ShitGobblin.png";
  constructor(HP, ATK, SHIELD = 0) {
    super();
    this.HP = HP;
    this.ATK = ATK;
    this.SHIELD = SHIELD;
  }
  render() {
    let div = super.render();
    let stat = document.createElement("div");
    stat.className = "Stat";
    stat.appendChild(HP_img.cloneNode());
    let p = document.createElement("p");
    p.innerText = `: ${this.HP}`;
    stat.appendChild(p);
    stat.appendChild(ATK_img.cloneNode());
    p = document.createElement("p");
    p.innerText = `: ${this.ATK}`;
    stat.appendChild(p);
    if (this.SHIELD) {
      stat.appendChild(SHIELD_img.cloneNode());
      p = document.createElement("p");
      p.innerText = `: ${this.SHIELD}`;
      stat.appendChild(p);
    }

    div.appendChild(stat);
    return div;
  }
  resolve() {
    if (blockerOnField() < 5) {
      let blocker = new this.BlockerClass(this.HP, this.ATK, this.SHIELD);
      for (let slot of blocker_div) {
        if (slot.childElementCount == 0) {
          slot.appendChild(blocker.div);
          return true;
        }
      }
    }
    return false;
  }
}

class SoulSpellCard extends Card {
  constructor(STRENGHT = 1) {
    super();
    this.STRENGHT = STRENGHT;
  }
  async resolve() {
    let graveCount = graveOnField();
    if(graveCount){
        await this.spellEffect(graveCount)
        return true
    }
    return false
  }
  async spellEffect(){
    
  }
}
