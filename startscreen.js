const startScreenOverlay = document.getElementById("start-screen");
const tutorialButton = document.getElementById("tutorial");
const startButton = document.getElementById("start-game");

startButton.addEventListener("click", startGame);

function startGame() {
  player = new Hero(8, 3, 2);
  hero_div.appendChild(player.div);
  startScreenOverlay.style.display = "none";
  playerDraw();
  initTurn();
}

tutorialButton.addEventListener("click",startTutorial)
function startTutorial() {
  player = new Hero(8, 1, 2);
  hero_div.appendChild(player.div);
  startScreenOverlay.style.display = "none";
  initTuto();
}
