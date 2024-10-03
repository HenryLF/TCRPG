const effectDamagePlaceholder = new Unit(0, 0);

function monsterAOEEffect(dmg) {
  return () => {
    MonsterMap.forEach((unit) => {
      unit.takeEffectDamage(dmg);
    });
  };
}

const armorEffectIcon = document.createElement("img");
armorEffectIcon.src = "./assets/armor.png";
armorEffectIcon.className = "effect icons";

function armorOnDamageEffect(armor) {
  return (unit) => {
    unit.HP = Math.min(unit.HP + armor, unit.HP_MAX);
  };
}
