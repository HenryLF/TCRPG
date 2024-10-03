class Card {
  name = "Card";
  type = "placeholder";
  img = "./assets/cards/placeholder.png";
  constructor() {
    this.btn = document.createElement("button");
  }
  render() {
    this.btn.addEventListener("click", (e) => {
      this.eventHandler();
    });
    this.btn.className = this.type;

    let div = document.createElement("div");
    div.className = "CardName";
    let name = document.createElement("p");
    name.innerText = this.name;
    div.appendChild(name);
    this.btn.appendChild(div);

    div = document.createElement("div");
    div.className = "CardPicture";
    let img = document.createElement("img");
    img.src = this.img;
    img.className = "CardImg";
    div.appendChild(img);
    this.btn.append(div);
  }
  eventHandler() {
    SelectedButton = this;
    this.btn.className = "UsedCard";
    this.btn.disabled = true;
  }
}

class MinionCard extends Card {
  name = "Minion";
  type = "MinionCard";
  HP = 0;
  ATK = 0;
  render() {
    super.render();
    let div = document.createElement("div");
    div.className = "CardStat";
    let hp = document.createElement("div");
    hp.appendChild(HeartImg);
    hp.className = "HP";
    hp.innerHTML += this.HP;
    div.appendChild(hp);

    let atk = document.createElement("div");
    atk.appendChild(SwordImg);
    atk.innerHTML += this.ATK;
    atk.className = "ATK";
    div.appendChild(atk);

    this.btn.appendChild(div);
  }
  eventHandler() {
    if (MinionMap.has(MinionCount)) {
      window.alert("Too many minions !");
    } else {
      super.eventHandler();
      let m = new Minion(this.HP, this.ATK, this.img);
      MinionMap.set(m.id, m);
      m.render();
    }
  }
}

class ShitGobblin extends MinionCard {
  name = "ShittyGob'";
  img = "assets/cards/minions/ShitGobblin.png";
  HP = 1;
  ATK = 1;
}

class Spell extends Card {
  constructor() {
    super();
    this.btn.className = this.type;
  }
  type = "SpellCard";
  eventHandler() {
    super.eventHandler();
    this.SpellEffect();
  }
  SpellEffect() {
    console.log("spell ");
  }
}
