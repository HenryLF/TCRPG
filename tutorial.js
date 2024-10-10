const dialog1 = [
  "",
  "Haaa what a nice day !!",
  "Hooo You're here to play ?",
  "The game is quite simple, but it can be intimidating to start.",
  "Let me explain the basis.",
];
const dialog2 = [
  "WTF ??? No time for that a monster arrived.",
  "It have low ATK, I think your safe to just slap him.",
  "Just click on yourself then on this fucker.",
];
const dialog3 = [
  "Nice one ! But you some damage back...",
  "Yeah monster are kinda tought to deal with.",
];
const dialog4 = [
  "Crap, now it's comming for you ! ",
  "You need to chose how's gonna take the attack...",
  "...but there is just you, click on yourself or the skip button.",
];
const dialog5 = [
  "Hmmm, you don't have SHIELD anymore, quite troublesome...",
  "Maybe it'll be better to not go as straight forward anymore.",
  "Hehe, I might have a gift for you.",
];
const dialog6 = [
  "Your very first blocker card !! It will take hits for you !",
  "Sadly they cannot attack... But they'll retaliate !",
  "Just click on the card to summon the blocker !",
];
const dialog7 = [
  "Ok, let's just skip to the monster phase.",
  "Click the SKIP button",
];
const dialog8 = [
  "This guy fought well enough, but looks like he passed away.",
  "But we can make use of that !  Do you like magic ?",
];
const dialog9 = [
  "This is a Soul spell, it will consume the souls of you deseased blocker.",
  "The more soul the better the spell.",
  "Ho ! And also, because you're limited to 5 blockers, it allows you to clear your field)",
  "Anyway, let's use it, click the spell !",
];
const dialog10 = [
  "Ok this fucker is soften enough, let finish him.",
  "See the icon underneath your character ?",
  "It means you have FIRST STRIKE, you can hover on it to see what it means.",
  "You will not take damage back if you kill the monster.",
  "Don't hesitate to cherck what the different icon means.",
  "Ok let's kill this bloke and move to the real game.",
];

class TutoBlockerCard extends BlockerCard {
  BlockerClass = TutoBlocker;
}
class TutoBlocker extends Blocker {
  static levelScaling = [1, 1, 0];
}
async function initTuto() {
  for (let line of dialog1) {
    await createDialog(line);
  }
  let m = new Monster(5, 1, 0);
  monster_div.appendChild(m.div);
  for (let line of dialog2) {
    await createDialog(line);
  }
  dialogDiv.style.display = "flex";
  await WaitForUserSelection(".hero");
  await player.action();
  for (let line of dialog3) {
    await createDialog(line);
  }
  m.div.className = m.className + " attacking";
  for (let line of dialog4) {
    await createDialog(line);
  }
  dialogDiv.style.display = "flex";
  await m.action();
  for (let line of dialog5) {
    await createDialog(line);
  }
  let c = new TutoBlockerCard(1);
  hand_div.appendChild(c.div);
  for (let line of dialog6) {
    await createDialog(line);
  }
  dialogDiv.style.display = "flex";
  await WaitForUserSelection(".card");
  c.resolveHandle();
  for (let line of dialog7) {
    await createDialog(line);
  }
  await WaitForUserSelection(".hero");
  await createDialog("And now have the blocker take the hit !");

  dialogDiv.style.display = "flex";
  await m.action();
  for (let line of dialog8) {
    await createDialog(line);
  }
  dialogDiv.style.display = "flex";
  c = new SoulStorm(1);
  hand_div.appendChild(c.div);
  for (let line of dialog9) {
    await createDialog(line);
  }

  dialogDiv.style.display = "flex";
  await WaitForUserSelection(".card");
  await c.resolveHandle();
  for (let line of dialog10) {
    await createDialog(line);
  }
  await WaitForUserSelection(".hero");
  await player.action();
  hero_div.removeChild(player.div);
  startGame();
}
