class RitualCard extends SpellCard {
  name = "ritual";
  img = "./assets/placeholder.png";
  className = "ritual card";
  resolveHandler() {
    window.alert("Spell Effect");
    return true;
  }
  resolve() {
    if (BlockerMap.size) {
      let centerBlocker = [...BlockerMap.values()].filter(
        (e) => e instanceof Blocker
      )[0];
      this.resolveHandler(centerBlocker);
      centerBlocker.death();
      PlayerHand.delete(this.handID);
      return true;
    }
    return false;
  }
}
//Ritual

class FireRitual extends RitualCard {
  name = "Fire Ritual";
  spellDescription =
    "Tribute the blocker at the center and inflict damage to every enemies.";
  resolveHandler(blocker) {
    monsterAOEEffect(blocker.ATK)();
  }
}

class WaterRitual extends RitualCard {
  name = "Water Ritual";
  spellDescription =
    "Tribute the blocker at the center and heal the hero by it's ATK.";

  resolveHandler(blocker) {
    player.heal(blocker.ATK);
  }
}

class WindRitual extends RitualCard {
  name = "Wind Ritual";
  spellDescription =
    "Tribute the blocker at the center and give blocker and hero shield equal to its ATK.";

  resolveHandler(blocker) {
    player.SHIELD += blocker.ATK;
    for (let block of [...BlockerMap.values()]) {
      block.SHIELD += blocker.ATK;
    }
  }
}

class EarthRitual extends RitualCard {
  name = "Earth Ritual";
  spellDescription =
    "Tribute the blocker at the center and give hero armor equal to its ATK.";

  resolveHandler(blocker) {
    for (let i = 0; i < blocker.ATK; i++) {
      player.effectIcon.push(armorEffectIcon);
    }
    player.onDamageEffect.push(armorOnDamageEffect(blocker.ATK));
  }
}

class IronRitual extends RitualCard {
  name = "Iron Ritual";
  spellDescription =
    "Tribute the blocker at the center and give hero ATK equal to its ATK.";
  resolveHandler(blocker) {
    player.ATK += blocker.ATK;
  }
}

class LightRitual extends RitualCard {
  name = "Light Ritual";
  spellDescription = "Tribute the blocker at the center and cleanse all unit.";
  resolveHandler() {
    for (let unit of getAllUnits()) {
      unit.cleanse();
    }
  }
}

class RustRitual extends RitualCard {
  name = "Rust Ritual";
  spellDescription =
    "Tribute the blocker at the center and apply Frail on every enemies up to its ATK.";
  resolveHandler(blocker) {
    for (let monster of [...MonsterMap.values()]) {
      monster.SHIELD -= blocker.ATK;
    }
  }
}

class DarkRitual extends RitualCard {
  name = "Dark Ritual";
  spellDescription =
    "Tribute the blocker at the center and give hero Impulse on every enemies up to its ATK + HP.";
  resolveHandler(blocker) {
    player.IMPULSE += blocker.HP + blocker.ATK;
  }
}
