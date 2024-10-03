//Blocker

class SoulessBotCard extends BlockerCard {
  name = "SoulessBot";
  img = "./assets/cards/minions/SoulessBot.png";
  resolveHandler() {
    let k = new SoulessBot(this.HP, this.ATK);
    k.SHIELD = 1;
  }
}

class ExplosiveGuyCard extends BlockerCard {
  name = "SoulessBot";
  img = "assets/cards/minions/bomb-with-skull-outline.png";
  resolveHandler() {
    new ExplosiveGuy(this.HP, this.ATK);
  }
}

//Spell

class SoulStorm extends SpellCard {
  name = "Soul Storm";
  spellDescription =
    "Release all souls, inflict 2 dmg to each enemy for each soul released.";
  resolveHandler() {
    let Soul = SoulRelease();
    if (Soul) {
      MonsterMap.forEach((m) => {
        m.HP -= 2 * Soul;
      });
      return true;
    }
    return false;
  }
}

class SoulSummon extends SpellCard {
  name = "SoulSummon";
  spellDescription =
    "Release all souls, summon a Soul Guardian with 2HP/2ATK for each soul.";
  resolveHandler() {
    let Soul = SoulRelease();
    if (Soul && BlockerMap.length<5) {
      new SoulGuardian(2 * Soul, 2 * Soul);
      return true;
    }
    return false;
  }
}

class SoulShield extends SpellCard {
  name = "Soul Shield";
  spellDescription = "Release all souls, shield Hero for 1 for each soul";
  resolveHandler() {
    let Soul = SoulRelease();
    if (Soul) {
      player.SHIELD+=Soul;
      return true;
    }
    return false;
  }
}

//Helper

function SoulRelease(max) {
  let Soul = 0;
  BlockerMap.forEach((e, id) => {
    if (e instanceof BlockerGrave) {
      Soul++;
      BlockerMap.delete(id);
      if (max && (Soul == max)) {
        return Soul;
      }
    }
  });
  return Soul;
}
function SoulCount() {
  return Array.from(BlockerMap.values()).filter(
    (e) => e instanceof BlockerGrave
  ).length;
}
