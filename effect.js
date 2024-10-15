function armorPreDamageEffect(ARMOR) {
  return (dmg) => dmg - ARMOR;
}

function retaliateOnDamageEffect(DMG) {
  return (obj, attacker) => {
    return new Promise((r) => {
      console.log(attacker,arguments)
      attacker.takeDamage({ ATK: DMG });
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

function buffOnDamage(HP, ATK, SHIELD) {
  return async (obj, attacker) => {
    await obj.heal(HP);
    obj.ATK += ATK;
    obj.SHIELD += SHIELD;
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
