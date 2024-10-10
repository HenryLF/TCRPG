//Blockers
class ArmoredBlockerCard extends BlockerCard {
  name = "Armored Blocker";
  img = "./assets/cards/minions/Shielder.png";
  BlockerClass = ArmoredBlocker;
  effectIcons = [armorEffectIcon, armorEffectIcon];
}
class ArmoredBlocker extends Blocker {
  name = "Armored Blocker";
  img = "./assets/cards/minions/Shielder.png";
  preDamageEffect = [armorPreDamageEffect(2)];
  effectIcons = [armorEffectIcon, armorEffectIcon];
  static levelScaling = [1, 2, 2];
}

class SpikyBlockerCard extends BlockerCard {
  name = "Cactoïd";
  BlockerClass = SpikyBlocker;
  img = "./assets/cards/minions/cactoid.png";
  effectIcons = [spikyEffectIcon, spikyEffectIcon];
}
class SpikyBlocker extends Blocker {
  name = "Cactoïd";
  onDamageEffect = [retaliateOnDamageEffect(2)];
  img = "./assets/cards/minions/cactoid.png";
  static levelScaling = [2, 2, 1];
  effectIcons = [spikyEffectIcon, spikyEffectIcon];
}

class ExplosiveBlockerCard extends BlockerCard {
  name = "Xploder";
  BlockerClass = ExplosiveBlocker;
  img = "./assets/cards/minions/Xploder.jpg";
}
class ExplosiveBlocker extends Blocker {
  name = "Xploder";
  img = "./assets/cards/minions/Xploder.jpg";
  static levelScaling = [1, 1, 0];
  constructor() {
    super(...arguments);
    for (let i = 0; i < this.LVL; i++) {
      this.effectIcons.push(explosiveEffectIcon);
    }
    this.onDeathEffect = [explodeOnDeathEffect(this.LVL)];
  }
}

class SoulGuardian extends Blocker {
  name = "Soul Guardian";
  img = "./assets/cards/minions/SoulGuardian.png";
}

//Spell

class SoulStorm extends SoulSpellCard {
  name = "Soul Storm";
  get spellDescription() {
    return `Release all Souls from dead blocker. Inflict damage ${this.LVL} to every monster.`;
  }
  async spellEffect(soul) {
    for (let monster of monstersOnFieldIterator()) {
      monster.object.takeDamage({ ATK: soul * this.LVL });
    }
    return true;
  }
}

class SoulSummon extends SoulSpellCard {
  name = "Soul Summon";
  get spellDescription() {
    return `Release all Souls from dead blocker. Summon a minion HP:${
      2 * this.LVL
    } ATK:${2 * this.LVL} for each soul.`;
  }
  async spellEffect(soul) {
    let slot = emptyBlockerSlot();
    if (slot) {
      let b = new SoulGuardian(2 * this.LVL * soul, 2 * this.LVL * soul);
      slot.appendChild(b.div);
    }
    return false;
  }
}
class SoulBlessing extends SoulSpellCard {
  name = "Soul Blessing";
  get spellDescription() {
    return `Release all Souls from dead blocker. Heal hero and bloker for ${this.LVL} HP for each soul.`;
  }
  async spellEffect(soul) {
    await player.heal(soul * this.LVL);
    for (blocker of blockersOnFieldIterator()) {
      await blocker.heal(soul * this.LVL);
    }
  }
}

//Ritual
class FireRitual extends RitualCard {
  name = "Fire Ritual";
  get spellDescription() {
    return `Sacrifice a live blocker to inflict ${
      this.LVL * 2
    } damage to every monster.`;
  }
  async spellEffect() {
    for (let monster of monstersOnFieldIterator()) {
      monster.object.takeDamage({ ATK: this.LVL * 2 });
    }
  }
}
