class Card {
  name = "card";
  constructor() {}
}

class BlockerCard extends Card {
  name = "Goblin";
  img = "assets/cards/minions/ShitGobblin.png";
  className = "blocker card";
  effectIcon = [];
  constructor(HP, ATK, img = undefined) {
    super();
    this.HP = HP;
    this.ATK = ATK;
    if (img) {
      this.img = img;
    }
  }
  resolveHandler(){
    new Blocker(this.HP, this.ATK, this.img);
  }
  resolve() {
    if (BlockerMap.size < 5) {
      this.resolveHandler()
      PlayerHand.delete(this.handID)
      return true;
    }
    return false;
  }
  render() {
    let div = document.createElement("div");
    div.className = this.className;
    let p = document.createElement("p");
    p.innerText = this.name;
    p.className = "name";
    div.appendChild(p);

    let img = document.createElement("img");
    img.src = this.img;
    div.appendChild(img);

    let stat = document.createElement("div");
    stat.appendChild(HP_img.cloneNode());
    stat.className = "stat";
    p = document.createElement("p");
    p.innerText = ` : ${this.HP}`;
    stat.appendChild(p);
    stat.appendChild(ATK_img.cloneNode());
    p = document.createElement("p");
    p.innerText = ` : ${this.ATK}`;
    stat.appendChild(p);
    div.appendChild(stat);

    let effect = document.createElement("div");
    effect.className = "effect";
    this.effectIcon.forEach((element) => {
      effect.appendChild(element.cloneNode());
    });
    div.appendChild(effect);

    return div;
  }
}

class SpellCard extends Card {
  name = "spell";
  img = "./assets/placeholder.png";
  className = "spell card";
  spellDescription = "A spell that have an effect";
  resolveHandler(){
    window.alert('Spell Effect')
    return true
  }


  resolve() {
    let k = this.resolveHandler()
    if (k){
      PlayerHand.delete(this.handID)
      return true;
    }
    return false
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

    p = document.createElement("p");
    p.className = "s";
    p.innerText = this.spellDescription;
    div.appendChild(p);
    return div;
  }
}

