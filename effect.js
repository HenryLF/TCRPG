function armorPreDamageEffect(ARMOR) {
  return (dmg) => dmg - ARMOR;
}

function retaliateOnDamageEffect(DMG) {
  return (obj, attacker) => {
    return new Promise((r) => {
      attacker.HP -= DMG;
      r();
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
