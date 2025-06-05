const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const dialogueBox = document.getElementById('dialogueBox');
const winScreen = document.getElementById('winScreen');

const duck = { x: 100, y: 300, width: 50, height: 50, dy: 0, gravity: 0.5, jump: -10 };
const obstacles = [];
let frameCount = 0;
let currentDay = 0;

const dialogues = [
  "Day 1: Quackers jumps into the pool! Peep floats on a flamingo!",
  "Day 2: Sandcastles and wave-jumping at the beach!",
  "Day 3: Shell hunting and crab surprises!",
  "Day 4: Pirate adventure and market shopping!",
  "Day 5: Karaoke night! Ducklings sing a silly song!",
  "Day 6: Treasure hunt around Arcos Playa!",
  "Day 7: Boat trip and dolphins spotted!",
  "Day 8: Ice cream, sandcastles, and fun in S'Illot!",
  "Day 9: Time to go home. See you next year!"
];

function drawDuck() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(duck.x, duck.y, duck.width, duck.height);
}

function drawObstacles() {
  ctx.fillStyle = 'brown';
  obstacles.forEach(ob => {
    ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
  });
}

function updateObstacles() {
  if (frameCount % 120 === 0) {
    obstacles.push({ x: 800, y: 350, width: 30, height: 50 });
  }
  obstacles.forEach(ob => {
    ob.x -= 5;
  });
}

function checkCollision() {
  for (let ob of obstacles) {
    if (
      duck.x < ob.x + ob.width &&
      duck.x + duck.width > ob.x &&
      duck.y < ob.y + ob.height &&
      duck.y + duck.height > ob.y
    ) {
      currentDay = 0;
      dialogueBox.innerText = "Oops! Try again from Day 1!";
      obstacles.length = 0;
    }
  }
}

function nextDay() {
  if (currentDay < dialogues.length) {
    dialogueBox.innerText = dialogues[currentDay];
    currentDay++;
  } else {
    winScreen.style.display = 'flex';
    dialogueBox.style.display = 'none';
    clearInterval(gameLoop);
  }
}

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDuck();
  drawObstacles();
  updateObstacles();

  duck.dy += duck.gravity;
  duck.y += duck.dy;

  if (duck.y > 350) {
    duck.y = 350;
    duck.dy = 0;
    nextDay();
  }

  checkCollision();
  frameCount++;
}

let gameLoop = setInterval(game, 30);

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    if (duck.y >= 350) duck.dy = duck.jump;
  }
});

// Touch controls
document.addEventListener('touchstart', () => {
  if (duck.y >= 350) duck.dy = duck.jump;
});

