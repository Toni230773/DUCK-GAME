```javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const duck = {
  x: 50,
  y: 400,
  width: 40,
  height: 40,
  velocityY: 0,
  jumping: false
};

const gravity = 1.5;
const ground = 500;

let obstacles = [];
let trees = [];
let currentLevel = 1;
const totalLevels = 15;
let keys = {};

function createLevel(level) {
  obstacles = [];
  trees = [];
  for (let i = 0; i < 5 + level; i++) {
    obstacles.push({ x: Math.random() * 800 + 200, y: ground - 20, width: 30, height: 30 });
    trees.push({ x: Math.random() * 900, y: ground - 60, width: 20, height: 60 });
  }
}

function drawBackground() {
  ctx.fillStyle = '#87CEEB';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#F4A460';
  ctx.fillRect(0, ground, canvas.width, canvas.height - ground);

  // Draw signs or labels
  ctx.fillStyle = '#000';
  ctx.font = '20px Arial';
  ctx.fillText(`Level ${currentLevel} - Arcos Playa / Sillot`, 10, 30);
}

function drawDuck() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(duck.x, duck.y, duck.width, duck.height);
}

function drawObstacles() {
  ctx.fillStyle = 'brown';
  for (let obs of obstacles) {
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  }
}

function drawTrees() {
  ctx.fillStyle = 'green';
  for (let tree of trees) {
    ctx.fillRect(tree.x, tree.y, tree.width, tree.height);
  }
}

function update() {
  if (keys['ArrowRight']) duck.x += 5;
  if (keys['ArrowLeft']) duck.x -= 5;

  duck.velocityY += gravity;
  duck.y += duck.velocityY;
  if (duck.y >= ground - duck.height) {
    duck.y = ground - duck.height;
    duck.jumping = false;
  }

  // Collision
  for (let obs of obstacles) {
    if (
      duck.x < obs.x + obs.width &&
      duck.x + duck.width > obs.x &&
      duck.y < obs.y + obs.height &&
      duck.y + duck.height > obs.y
    ) {
      alert('You hit an obstacle! Restarting level...');
      duck.x = 50;
      createLevel(currentLevel);
    }
  }

  // Next level
  if (duck.x > canvas.width) {
    currentLevel++;
    if (currentLevel > totalLevels) {
      alert('Congratulations! You completed all levels!');
      currentLevel = 1;
    }
    duck.x = 50;
    createLevel(currentLevel);
  }
}

function loop() {
  drawBackground();
  drawDuck();
  drawObstacles();
  drawTrees();
  update();
  requestAnimationFrame(loop);
}

document.addEventListener('keydown', e => {
  keys[e.key] = true;
  if (e.key === ' ' && !duck.jumping) {
    duck.velocityY = -20;
    duck.jumping = true;
  }
});
document.addEventListener('keyup', e => {
  keys[e.key] = false;
});

createLevel(currentLevel);
loop();
```
