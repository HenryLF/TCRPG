class Blocker extends Unit {
  className = "blocker unit";
  img = "./assets/cards/minions/blocker.gif";
  name = "ShitGobblin";
  static levelScaling = [1, 1, 1];
  async death() {
    let parent = await super.death();
    console.log(parent);
    let grave = new BlockerGrave();
    parent.appendChild(grave.div);
  }
}

class Hero extends Unit {
  className = "hero unit";
  name = "Percival";
  img = "./assets/player.gif";
  async action() {
    this.div.className = this.className + " attacking";
    let tgt = await WaitForUserSelection(".monster");
    this.div.className = this.className;
    if (tgt === false || tgt === true) {
      return false;
    } else {
      await firstStrikeAttack(this, tgt.object);
    }
    return true;
  }
  effectIcons = [firstStrikeEffectIcon];
  death(){
    super.death()
    gameOver();
  }
}

class Monster extends Unit {
  className = "monster unit";
  name = "Monster";
  img = "./assets/monsters/WildCat.gif";
  async action() {
    this.div.className = this.className + " attacking";
    let tgt = await WaitForUserSelection(".blocker.unit, .hero").then((t) =>
      t === true || t === false ? defaultBlocker() : t
    );
    console.log(tgt);
    this.div.className = this.className;
    await normalAttack(this, tgt.object);
    return true;
  }
}
