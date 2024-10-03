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
      DiscardPile.push(this)
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
