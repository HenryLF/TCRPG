const MonsterField = document.getElementById("MonsterField");

class Monster {
  constructor(id) {
    this.id = id;
    this.btn = document.createElement("button");
    this.btn.id = `Monster${this.id}`;
    this.btn.className = "Monster";

  }
  HP = 0;
  HP_MAX = 0;
  ATK = 0;
  img = "./assets/cards/placeholder.png";
  name = 'MonsterBaseClass'
  render() {
    this.btn.addEventListener('click',(e)=>this.eventHandler())
    let img = document.createElement("img");
    img.src = this.img;
    img.className = "MonsterImg";
    this.btn.appendChild(img);

    let stat = document.createElement("div");
    stat.className = "MonsterStat";
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
    MonsterField.appendChild(this.btn);
  }
  eventHandler(){
    console.log(this.name)
    SelectedButton = this;
  }
}

class ShitSpider extends Monster {
  HP = 3;
  HP_MAX = 3;
  ATK = 1;
  img = "./assets/monsters/spider.png";
  name='ShitSpider'
}
