const Hero = {
  img: "./assets/player.png",
  HP_MAX: 7,
  HP: 7,
  ATK: 3,
  btn: document.createElement("button"),
  render() {
    this.btn.className = "PlayerHero";
    this.btn.addEventListener("click", (e) => {
      SelectedButton = this;
    });

    let img = document.createElement("img");
    img.className = "PlayerImg";
    img.src = this.img;
    this.btn.appendChild(img);

    field.appendChild(this.btn);

    div = document.createElement("div");
    div.className = "PlayerHP";
    for (let i = 0; i < this.HP_MAX; i++) {
      if (i < this.HP) {
        div.appendChild(HeartImg.cloneNode());
      } else {
        div.appendChild(DeadHeartImg.cloneNode());
      }
    }
    field.appendChild(div);

    div = document.createElement("div");
    div.className = "PlayerATK";
    for (let i = 0; i < this.ATK; i++) {
      div.appendChild(SwordImg.cloneNode());
    }
    field.appendChild(div);
  },
};

let MinionMap = new Map();
let MinionCount = 0;
class Minion {
  constructor(hp, atk, img) {
    this.id = MinionCount;
    MinionCount = (MinionCount + 1) % 5;
    this.HP = hp;
    this.HP_MAX = hp;
    this.ATK = atk;
    this.img = img;
    this.btn = document.createElement("button");
    this.btn.id = `Minion${this.id}`;
    this.btn.className = "FieldMinion";
  }
  render() {
    this.btn.addEventListener("click", (e) => {
      SelectedButton = this;
    });
    let img = document.createElement("img");
    img.src = this.img;
    img.className = "MinionImg";
    this.btn.appendChild(img);

    let stat = document.createElement("div");
    stat.className = "MinionStat";
    let hp = document.createElement("div");
    hp.appendChild(HeartImg);
    hp.className = "HP";
    hp.innerHTML += this.HP;
    stat.appendChild(hp);

    let atk = document.createElement("div");
    atk.appendChild(SwordImg);
    atk.innerHTML += this.ATK;
    atk.className = "ATK";
    stat.appendChild(atk);

    this.btn.appendChild(stat);

    field.appendChild(this.btn);
  }
}
