//Blocker

class SoulessBot extends Blocker {
  name = "Souless Bot";
  img = "./assets/cards/minions/SoulessBot.png";
  effectIcon = [soulessEffectIcon];
  death() {
    BlockerMap.delete(this.id);
  }
}

class SoulGuardian extends Blocker {
  name = "Soul Guardian";
  img = "./assets/scrap/fire emblem/14129.png";
}

class ExplosiveGuy extends Blocker {
  name = "ExplosiveGuy";
  img = "assets/cards/minions/bomb-with-skull-outline.png";
  onDeathEffect = [monsterAOE(1)];
}

//Monster

class GeneralArmor extends Monster {
  img = "./assets/monsters/14090.png";
  name = "General Armor";
  effectIcon = [armorEffectIcon];
  takeDamageEffect = [armorEffect(1)];
}

//Helper

function ShieldOnDamageEffect(t) {
  t.HP += 1;
}

function monsterAOE(dmg) {
  return () => {
    MonsterMap.forEach((unit) => {
      console.log(unit);
      unit.HP -= dmg;
    });
  };
}

function armorEffect(armor) {
  return (atk) => {atk.HP = Math.min(atk.HP+armor,atk.HP_MAX)}
    }