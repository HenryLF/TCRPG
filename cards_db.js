//Blockers
class ArmoredBlockerCard extends BlockerCard {
  name = "Armored Blocker";
  BlockerClass = ArmoredBlocker;
  effectIcons = [armorEffectIcon, armorEffectIcon];
}
class ArmoredBlocker extends Blocker {
  name = "Armored Blocker";
  preDamageEffect = [armorPreDamageEffect(2)];
  effectIcons = [armorEffectIcon, armorEffectIcon];
  static levelScaling = [1,2,1]
}

class SpikyBlockerCard extends BlockerCard {
  name = "Spiky Blocker";
  BlockerClass = SpikyBlocker;
}
class SpikyBlocker extends Blocker {
  name = "Spiky Blocker";
  onDamageEffect = [retaliateOnDamageEffect(1)];
  static levelScaling = [2,1,1]
}

//Spell

class SoulStorm extends SoulSpellCard {
  name = "Soul Storm";
  get spellDescription(){
    return `Release all Souls from dead blocker. Inflict damage ${this.LVL} to every monster.`;
  }
  async spellEffect(soul) {
    for (let monster of monstersOnFieldIterator()) {
      monster.object.takeDamage({ ATK: soul * this.LVL });
    }
  }
}

//Ritual
class FireRitual extends RitualCard {
  name = "Fire Ritual";
  get spellDescription(){
    return `Sacrifice a live blocker to inflict ${this.LVL*3} damage to every monster.`;}
  async spellEffect(sacrifice) {
    for (let monster of monstersOnFieldIterator()) {
      monster.object.takeDamage({ ATK: this.LVL*3 });
    }
  }
}
