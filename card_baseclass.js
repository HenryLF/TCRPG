let CardMap = new Map();

class Card {
  name = "Card";
  type = "placeholder";
  img = "./assets/cards/placeholder.png";
  desc = "A playable card.";
  className = "card";
  constructor(lvl) {
    this.LVL = lvl;
  }
  render() {
    let div = document.createElement("div");
    div.object = this;
    div.className = this.className;
    div.id = "input";

    let sub_div = document.createElement("div");
    sub_div.className = "NameLevel";

    let lvl = document.createElement("div");
    lvl.className = "Level";
    lvl.innerText = this.LVL;
    this.LVL_UI = lvl;
    sub_div.appendChild(lvl);

    let p = document.createElement("p");
    p.className = "Name";
    p.innerText = this.name;
    sub_div.appendChild(p);

    div.appendChild(sub_div);
    return div;
  }

  get div() {
    if (this._div) {
      return this._div;
    }
    this._div = this.render();
    return this._div;
  }
  async resolveHandle() {
    return new Promise(async (r) => {
      let res = await this.resolve();
      if (res) {
        this.div.className = this.className + " played";
        setTimeout(() => {
          // hand_div.removeChild(this.div);
          playerDiscard.appendChild(this.div);
          this.div.className = this.className;
          cardsInDiscardSpan.innerText = playerDiscard.childElementCount;
          r();
        }, 1000);
      } else {
        r();
      }
    });
  }

  async resolve() {
    return true;
  }
}
