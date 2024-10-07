let CardMap = new Map();

class Card {
  name = "Card";
  type = "placeholder";
  img = "./assets/cards/placeholder.png";
  className = "card";
  render() {
    let div = document.createElement("div");
    div.object = this;
    div.className = this.className;
    div.id = "input";

    let p = document.createElement("p");
    p.className = "Name";
    p.innerText = this.name;
    div.appendChild(p);

    let img = document.createElement("img");
    img.className = "IMG";
    img.src = this.img;
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
  async resolveHandle() {
    return new Promise(async (r) => {
      let res = await this.resolve()
      if (res) {
        this.div.className = this.className + " played";
        setTimeout(() => {
          hand_div.removeChild(this.div);
          playerDiscard.appendChild(this.div);
          this.div.className = this.className;
          cardsInDiscard.innerText = playerDiscard.childElementCount;
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

