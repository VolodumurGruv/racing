const start = document.querySelector(".start");
const score = document.querySelector(".score");
const gameArea = document.querySelector(".gameArea");
const car = document.createElement("div");

car.classList.add("car");

const keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowRight: false,
	ArrowLeft: false,
};

const settings = {
	start: false,
	score: 0,
	speed: 3,
};

start.addEventListener("click", startGame);
// it will listen to buttons
document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);

function startGame() {
	start.classList.add("hide");
	settings.start = true;
	gameArea.appendChild(car);
	requestAnimationFrame(playGame);
}

function playGame() {
	console.log("Play game");
	if (settings.start) requestAnimationFrame(playGame);
}

function startRun(e) {
	e.preventDefault();
	keys[e.key] = true;
}

function stopRun(e) {
	e.preventDefault();
	keys[e.key] = false;
	settings.start = false;
}
