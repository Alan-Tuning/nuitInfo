<template>
  <div>
    <canvas ref="gameCanvas" :width="canvasWidth" :height="canvasHeight" @mousemove="handleMouseMove"
      @click="handleClick"></canvas>
    <div class="status">
      <p>Temps restant : {{ timer }}s</p>
      <p>Poissons collectés : {{ collectedBuoys }}/5</p>
    </div>
    <p v-if="gameOver" :style="{ color: gameWon ? 'green' : 'red' }">
      {{ gameWon ? 'Bravo ! Vous êtes humain.' : 'Échec, essayez encore !' }}
    </p>
    <button v-if="gameOver" @click="restartGame">Rejouer</button>
  </div>
</template>

<script>
export default {
  name: "GameCanvas",
  data() {
    return {
      canvasWidth: 800,
      canvasHeight: 600,
      ctx: null,
      backgroundImage: null,
      ship: { x: 400, y: 500, size: 40 },
      buoys: [],
      obstacles: [],
      collectedBuoys: 0,
      timer: 10,
      gameOver: false,
      gameWon: false,
      buoyImage: null,
      obstacleImage: null,
      timerInterval: null,
    };
  },
  methods: {
    initGame() {
      const canvas = this.$refs.gameCanvas;
      this.ctx = canvas.getContext("2d");

      // Charger les images
      this.backgroundImage = new Image();
      this.backgroundImage.src = "blue.jpg";

      this.buoyImage = new Image();
      this.buoyImage.src = "garbage-bag01.png";

      this.obstacleImage = new Image();
      this.obstacleImage.src = "butterfly-fish.png"; 

      // Initialize game state
      this.buoys = this.generateItems(5, "buoy");
      this.obstacles = this.generateItems(7, "obstacle");
      this.collectedBuoys = 0;
      this.timer = 10;
      this.gameOver = false;
      this.gameWon = false;

      // Start timer
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        this.timer -= 1;
        if (this.timer <= 0) {
          this.gameOver = true;
          clearInterval(this.timerInterval);
        }
      }, 1000);

      this.startGameLoop();
    },
    generateItems(count, type) {
      const items = [];
      for (let i = 0; i < count; i++) {
        items.push({
          x: Math.random() * (this.canvasWidth - 50) + 25,
          y: Math.random() * (this.canvasHeight - 200) + 50,
          size: 40,
          type,
        });
      }
      return items;
    },
    drawBackground() {
      if (this.backgroundImage) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvasWidth, this.canvasHeight);
      }
    },
    drawShip() {
      this.ctx.fillStyle = "blue";
      this.ctx.beginPath();
      this.ctx.arc(this.ship.x, this.ship.y, this.ship.size / 2, 0, Math.PI * 2);
      this.ctx.fill();
    },
    drawItems(items, image) {
      items.forEach((item) => {
        if (image) {
          this.ctx.drawImage(
            image,
            item.x - item.size / 2,
            item.y - item.size / 2,
            item.size,
            item.size
          );
        }
      });
    },
    handleMouseMove(event) {
      const rect = this.$refs.gameCanvas.getBoundingClientRect();
      this.ship.x = event.clientX - rect.left;
      this.ship.y = event.clientY - rect.top;

      // Check if the ship passes over an obstacle
      this.obstacles.forEach((obstacle) => {
        const dist = Math.hypot(this.ship.x - obstacle.x, this.ship.y - obstacle.y);
        if (dist < (this.ship.size + obstacle.size) / 2) {
          this.timer -= 1; // Penalty
        }
      });
    },
    handleClick(event) {
      const rect = this.$refs.gameCanvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      // Check if the click is on a buoy
      this.buoys = this.buoys.filter((buoy) => {
        const dist = Math.hypot(clickX - buoy.x, clickY - buoy.y);
        if (dist < buoy.size / 2) {
          this.collectedBuoys++;
          return false; // Remove the buoy
        }
        return true;
      });

      // Check if the click is on an obstacle
      this.obstacles.forEach((obstacle) => {
        const dist = Math.hypot(clickX - obstacle.x, clickY - obstacle.y);
        if (dist < obstacle.size / 2) {
          this.timer -= 2; // Penalty for clicking a bad object
        }
      });

      // Check win condition
      if (this.collectedBuoys >= 5) {
        this.gameOver = true;
        this.gameWon = true;
        clearInterval(this.timerInterval);
      }
    },
    startGameLoop() {
      const loop = () => {
        if (this.gameOver) return;

        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Draw background, items, and ship
        this.drawBackground();
        this.drawItems(this.buoys, this.buoyImage);
        this.drawItems(this.obstacles, this.obstacleImage);
        this.drawShip();

        // Next frame
        requestAnimationFrame(loop);
      };
      loop();
    },
    restartGame() {
      this.initGame();
    },
  },
  mounted() {
    this.initGame();
  },
};
</script>

<style>
canvas {
  border: 2px solid #0077be;
  margin-top: 10px;
}

.status {
  margin: 10px 0;
  font-size: 16px;
  color: #333;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #0077be;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #005f99;
}
</style>