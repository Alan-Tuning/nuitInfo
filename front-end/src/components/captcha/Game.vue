<template>
  <div id="game-view" ref="gameContainer">
    <div id="count-collected">{{ collectedObstacle }}/7</div>
    <div class="wave wave1"></div>
    <div class="wave wave2"></div>
    <div class="wave wave3"></div>
    <div v-for="fish in fishes" :key="fish.id" class="fish" :style="getStyle(fish)"  @click="handleClick" :data-id="fish.id">
      <img src="@/assets/poisson.png" alt="fish" class="fish-img"/>
    </div>

    <div v-for="obstacle in obstacles" :key="obstacle.id" class="game-item" :style="getStyle(obstacle)" @click="handleClick" :data-id="obstacle.id">
      <img src="@/assets/obstacle.png" alt="obstacle" class="obstacle-img"  />
    </div>
    <div id="game-menu" v-if="!running">
      <h2 v-if="gameOver">{{ gameWon ? "Bravo! Vous avez gagné!" : "Désolé! Vous avez perdu!" }}</h2>
      <p v-if="gameOver">Vous avez collecté {{ collectedObstacle }} obstacles</p>
      <p v-if="gameOver">Vous avez collecté {{ fishes.length }} poissons</p>
      <p v-if="gameOver">Temps restant: {{ timer }}s</p>
      <button @click="startClick">Rejouer</button>
    </div>
  </div>


</template>

<script>
export default {
  name: "GameComponent",
  data() {
    return {
      message: "",
      ship: { x: 400, y: 500, size: 40 },
      obstacles: [],
      fishes: [],
      collectedObstacle: 0,
      timer: 10,
      running: false,
      gameOver: true,
      gameWon: false,
      animationFrame: null,
      containerWidth: 800,
      containerHeight: 600,
    };
  },
  methods: {
    startClick() {
      this.initGame();
    },
    initGame() {
      this.obstacles = this.generateItems(7, "obstacle");
      this.fishes = this.generateItems(10, "fish");
      this.collectedObstacle = 0;
      this.timer = 10;
      this.running = true;
      this.gameOver = false;
      this.gameWon = false;

      this.$nextTick(() => {
        if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
        this.startAnimation();
      });
    },
    generateItems(count, type) {
      const items = [];
      for (let i = 0; i < count; i++) {
        items.push({
          id: i,
          x: Math.random() * (this.containerWidth - 60),
          y: Math.random() * (this.containerHeight - 60),
          dx: 1 - Math.random() * 2,
          dy: 1 - Math.random() * 2,
          visible: true,
          size: 60,
          type,
        });
      }
      return items;
    },
    getStyle(item) {
      return {
        position: "absolute",
        left: `${item.x}px`,
        top: `${item.y}px`,
        width: `${item.size}px`,
        height: `${item.size}px`,
        display: item.visible ? "block" : "none",
      };
    },
    moveFishes() {
      this.fishes.forEach((fish) => {
        fish.x += fish.dx * 2;
        fish.y += fish.dy * 2;

        if (fish.x < 0 || fish.x + fish.size > this.containerWidth) {
          fish.dx *= -1;
        }

        if (fish.y < 0 || fish.y + fish.size > this.containerHeight) {
          fish.dy *= -1;
        }
      });
    },
    startAnimation() {
      const animate = () => {
        if (!this.gameOver) {
          this.moveFishes();
          this.animationFrame = requestAnimationFrame(animate);
        }
      };
      this.animationFrame = requestAnimationFrame(animate);
    },
    handleClick(event) {
      // Vérifie si l'élément cliqué est un poisson
      if (event.target.classList.contains("fish-img")) {
        const fishId = parseInt(event.target.parentElement.dataset.id);
        const fish = this.fishes.find((f) => f.id === fishId);
        if (fish) {
          this.onFishClick(fish);
        }
      }
      
      // Vérifie si l'élément cliqué est un obstacle
      if (event.target.classList.contains("obstacle-img")) {
        const obstacleId = parseInt(event.target.parentElement.dataset.id);
        const obstacle = this.obstacles.find((o) => o.id === obstacleId);
        if (obstacle) {
          this.onObstacleClick(obstacle);
        }
      }
    },

    onFishClick(fish) {
      fish.visible = false;
      if (this.fishes.every((f) => !f.visible)) {
        this.gameOver = true;
        this.gameWon = true;
      }
    },

    onObstacleClick(obstacle) {
      obstacle.visible = false;
      this.collectedObstacle++;
      if (this.collectedObstacle === 7) {
        this.gameOver = true;
        this.gameWon = false;
        this.running = false;
        this.message = "Vous avez gagné !";
        this.$emit("captchaValidated");
      }
    },
  },
  mounted() {
    const container = this.$refs.gameContainer;
    this.containerWidth = container.offsetWidth;
    this.containerHeight = container.offsetHeight;

    // Initialisation du jeu après récupération des dimensions du container
    this.initGame();
  },
};
</script>

<style>
#game-view {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  background-image: linear-gradient(120deg, #00559a 0%, #00d4ff 100%);
  background-size: 200% 200%;
  animation: gradientAnimation 3s ease infinite;
  overflow: hidden;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.wave {
  position: absolute;
  width: 200%;
  height: 300px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.3);
  opacity: 0.7;
  border-radius: 100%;
}

.wave1 {
  animation: waveAnimation 6s infinite ease-in-out;
}

.wave2 {
  animation: waveAnimation 7s infinite ease-in-out;
  bottom: 30px;
  opacity: 0.5;
}

.wave3 {
  animation: waveAnimation 8s infinite ease-in-out;
  bottom: 60px;
  opacity: 0.3;
}

@keyframes waveAnimation {
  0% {
    transform: translateX(-50%) translateY(0);
  }

  50% {
    transform: translateX(-50%) translateY(30px);
  }

  100% {
    transform: translateX(-50%) translateY(0);
  }
}

#count-collected {
  color: #ffffff;
  font-size: 24px;
}

#game-container {
  position: relative;
  width: 800px;
  height: 600px;
  border: 2px solid #0077be;
  margin-top: 10px;
}

.game-item {
  position: absolute;
  border-radius: 50%;
}

#ship {
  position: absolute;
  background-color: blue;
  border-radius: 50%;
}

.fish {
  position: absolute;
  width: 60px;
  height: 60px;
}

.fish-img {
  width: 100%;
  height: 100%;
}

.obstacle {
  position: absolute;
  width: 60px;
  height: 60px;
}

.obstacle-img {
  width: 100%;
  height: 100%;
}

#game-menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #e9e9e9;
  color: #0077b2;
  font-size: 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #ffffff;
}
</style>
