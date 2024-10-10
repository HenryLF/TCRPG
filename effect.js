function armorPreDamageEffect(ARMOR) {
  return (dmg) => dmg - ARMOR;
}

function retaliateOnDamageEffect(DMG) {
  return (obj, attacker) => {
    return new Promise((r) => {
      attacker.HP -= DMG-attacker.SHIELD;
      attacker.SHIELD -=DMG 
      r();
    });
  };
}

function explodeOnDeathEffect(DMG) {
  return (obj) => {
    return new Promise((r) => {
      for (let monster of monstersOnFieldIterator()) {
        monster.takeDamage({ ATK: DMG });
      }
    });
  };
}

//Attacks

async function normalAttack(atk, tgt) {
  await tgt.takeDamage(atk);
  await atk.takeDamage(tgt);
  return;
}

async function firstStrikeAttack(atk, tgt) {
  await tgt.takeDamage(atk);
  if (tgt.HP > 0) {
    await atk.takeDamage(tgt);
  }
  return;
}

function noRetaliateAttack(atk, tgt) {
  return new Promise(async (r) => {
    await tgt.takeDamage(atk);
    r();
  });
}
