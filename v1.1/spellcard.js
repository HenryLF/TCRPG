class SpellCard extends Card {
  name = "spell";
  img = "./assets/placeholder.png";
  className = "spell card";
  spellDescription = "A spell that have an effect";
  resolveHandler() {
    window.alert("Spell Effect");
    return true;
  }

  resolve() {
    let k = this.resolveHandler();
    if (k) {
      PlayerHand.delete(this.handID);
      DiscardPile.push(this)
      return true;
    }
    return false;
  }
  render() {
    let div = document.createElement("div");
    div.className = this.className;
    let p = document.createElement("p");
    p.className = "name";
    p.innerText = this.name;
    div.appendChild(p);

    let img = document.createElement("img");
    img.src = this.img;
    div.appendChild(img);

    p = document.createElement("p");
    p.className = "s";
    p.innerText = this.spellDescription;
    div.appendChild(p);
    return div;
  }
}

//Soul Release
function SoulRelease(max) {
  let Soul = 0;
  BlockerMap.forEach((e, id) => {
    if (e instanceof BlockerGrave) {
      Soul++;
      BlockerMap.delete(id);
      if (max && Soul == max) {
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

//Spell

class SoulStorm extends SpellCard {
  name = "Soul Storm";
  spellDescription =
    "Release all souls, inflict 2 dmg to each enemy for each soul released.";
  resolveHandler() {
    let Soul = SoulRelease();
    if (Soul) {
      MonsterMap.forEach((m) => {
        m.takeEffectDamage(2 * Soul);
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
    if (Soul) {
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
      player.SHIELD += Soul;
      return true;
    }
    return false;
  }
}
