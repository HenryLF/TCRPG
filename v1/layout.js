const field = document.getElementById("field");

const data = document.getElementById("data");
// const data_ctx = data.getContext("2d");

const hand = document.getElementById("hand");

const cardTop = 0;
let maxHandSize = 5;


const HeartImg = document.createElement("img");
HeartImg.src = "./assets/heart.png";

const DeadHeartImg = document.createElement("img");
DeadHeartImg.src = "./assets/heart_dead.png";

const SwordImg = document.createElement("img");
SwordImg.src = "./assets/sword.png";


let SelectedButton;
// window.addEventListener("resize", initLayout);
// initLayout();
