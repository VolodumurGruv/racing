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

enemyCars = [
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRis6a8SB-oxKifXiLNjyDz1qd33qKm-7ZfUA&usqp=CAU",
	"https://spng.pngfind.com/pngs/s/74-749644_black-car-topview-vector-transparent-library-top-view.png",
];

const settings = {
	start: false,
	score: 0,
	speed: 3,
	traffic: 3,
};

function getQuantityElements(heightElement) {
	return document.documentElement.clientHeight / heightElement + 1;
}

start.addEventListener("click", startGame);
// it will listen to buttons
document.addEventListener("keydown", (event) => {
	stopRun(event);
});
document.addEventListener("keyup", (event) => {
	startRun(event);
});

function startGame() {
	start.classList.add("hide");
	gameArea.style.display = "block";

	for (let i = 0; i < getQuantityElements(100); i++) {
		const line = document.createElement("div");
		line.classList.add("line");
		line.style.top = i * 100 + "px";
		line.y = i * 100;
		gameArea.appendChild(line);
	}

	for (let i = 0; i < getQuantityElements(100 * settings.traffic); i++) {
		const enemy = document.createElement("div");
		enemy.classList.add("enemy");
		enemy.y = -100 * settings.traffic * i + 1;
		enemy.style.top = enemy.y + "px";
		enemy.style.left =
			Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
		enemy.style.background = `transparent
		url("${randEnemy()}")
		center / cover no-repeat`;
		console.log(enemy.style.background);
		gameArea.appendChild(enemy);
	}

	settings.start = true;

	gameArea.appendChild(car);
	settings.x = car.offsetLeft;
	settings.y = car.offsetTop;
	requestAnimationFrame(playGame);
}

function playGame() {
	if (settings.start) {
		moveRoad();
		moveEnemy();

		if (keys.ArrowLeft && settings.x > 0) {
			settings.x -= settings.speed;
		}
		if (keys.ArrowRight && settings.x < gameArea.offsetWidth - car.offsetWidth) {
			settings.x += settings.speed;
		}
		if (keys.ArrowDown && settings.y > 0) {
			settings.y += settings.speed;
		}
		if (keys.ArrowUp && settings.y < gameArea.offsetHeight - car.offsetHeight) {
			settings.y -= settings.speed;
		}
		car.style.left = settings.x + "px";
		car.style.top = settings.y + "px";
		requestAnimationFrame(playGame);
	}
}

function startRun(event) {
	event.preventDefault();
	keys[event.key] = true;
}

function stopRun(event) {
	event.preventDefault();

	keys[event.key] = false;
	// settings.start = false;
}

function moveRoad() {
	let lines = document.querySelectorAll(".line");
	lines.forEach((line) => {
		line.y += settings.speed;
		line.style.top = line.y + "px";
		if (line.y >= document.documentElement.clientHeight) {
			line.y = -100;
		}
	});
}

function moveEnemy() {
	let enemies = document.querySelectorAll(".enemy");
	enemies.forEach((enemy) => {
		enemy.y += settings.speed - 1;
		enemy.style.top = enemy.y + "px";
		if (enemy.y >= document.documentElement.clientHeight) {
			enemy.y = -100;
			enemy.style.left =
				Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
		}
	});
}

function randEnemy() {
	const idx = Math.floor(Math.random() * 2);
	console.log(idx);
	return enemyCars[idx];
}
