let MonsterMap = new Map();
let MonsterID = 0;
class Monster extends Unit {
  name = "AHSAMAMA !!";
  img = "assets/monsters/spider.png";
  className = "monster unit";
  constructor(HP_MAX, ATK) {
    super(HP_MAX, ATK);
    this.id = MonsterID;
    MonsterMap.set(MonsterID, this);
    MonsterID += 1;
  }
  attack(target) {
    normalAttack(this, target);
  }
  death() {
    super.death();
    MonsterMap.delete(this.id);
  }
}

class GeneralArmor extends Monster {
  img = "./assets/monsters/14090.png";
  name = "General Armor";
  effectIcon = [armorEffectIcon];
  onDamageEffect = [armorOnDamageEffect(1)];
}
