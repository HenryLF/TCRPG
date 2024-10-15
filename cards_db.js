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
  static levelScaling = [1, 2, 2];
  constructor() {
    super(...arguments);
    for (let i = 0; i < this.LVL; i++) {
      this.effectIcons.push(armorEffectIcon);
    }
    this.preDamageEffect = [armorPreDamageEffect(this.LVL)];
  }
}

class SpikyBlockerCard extends BlockerCard {
  name = "Cactoïd";
  BlockerClass = SpikyBlocker;
  img = "./assets/cards/minions/Cactoid.gif";
  effectIcons = [spikyEffectIcon, spikyEffectIcon];
}
class SpikyBlocker extends Blocker {
  name = "Cactoïd";
  img = "./assets/cards/minions/Cactoid.gif";
  static levelScaling = [2, 2, 1];
  constructor() {
    super(...arguments);
    for (let i = 0; i < this.LVL; i++) {
      this.effectIcons.push(spikyEffectIcon);
    }
    this.onDamageEffect = [retaliateOnDamageEffect(this.LVL)];
  }
}

class ExplosiveBlockerCard extends BlockerCard {
  name = "Xploder";
  BlockerClass = ExplosiveBlocker;
  img = "./assets/cards/minions/Xploder.png";
}
class ExplosiveBlocker extends Blocker {
  name = "Xploder";
  img = "./assets/cards/minions/Xploder.png";
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

//Monster
class Spiker extends Monster {
  name = "Spiker";
  img = "./assets/monsters/Spiker.gif";
  effectIcons = [spikyEffectIcon, spikyEffectIcon];
  onDamageEffect = [retaliateOnDamageEffect(2)];
}
class BlackKnight extends Monster {
  name = "Black Knight";
  img = "./assets/monsters/BlackKnight.gif";
  attack(tgt) {
    return firstStrikeAttack(this, tgt.object);
  }
  effectIcons = [firstStrikeEffectIcon];
}
class FireKnight extends Monster {
  name = "FireKnight";
  img = "./assets/monsters/FireKnight.gif";
  effectIcons = [armorEffectIcon, inFlameEffectIcon];
  preDamageEffect = [armorPreDamageEffect(1)];
  onDamageEffect = [buffOnDamage(0, 1, 1)];
}
class EggPlant extends Monster {
  name = "Egg Plant";
  img = "./assets/monsters/EggPlant.gif";
  effectIcons = [lunaticEffectIcon];
  _count = 0;
  get lunaticCounter() {
    return this._count;
  }
  set lunaticCounter(val) {
    this._count = val;
    console.log(this._count);
    this.ATK = Math.min(5 + 5 * this._count, 30);
    if (this._count == 6) {
      this.attack = (tgt) => firstStrikeAttack(this, tgt.object);
      this.effectIcons.push[firstStrikeAttack];
      this.img = "./assets/monsters/EggPlantPoped.gif";
      this.reRender();
    }
    if (this._count > 6) {
      this.effectIcons.push(multiAttackEffectIcon);
      this.action = async () => {
        for (let i = 0; i < this._count - 5; i++) {
          await super.action();
        }
        this.lunaticCounter = this.lunaticCounter + 1;
      };
      this.reRender();
    }
  }
  async action() {
    await super.action();
    this.lunaticCounter = this.lunaticCounter + 1;
  }
}

class CaptainSpirit extends MonsterLeader {
  img = "./assets/monsters/PirateGhost.gif";
  name = "Captain Spirit";
}
class GhostPirate extends Monster {
  name = "Ghost Pirate";
  img = "./assets/monsters/Pirate.gif";
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
      return true;
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
