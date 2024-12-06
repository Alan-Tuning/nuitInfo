<template>
  <div class="game-container">
    <!-- En-tête du jeu -->
    <header class="game-header">
      <h1>Jeu du recyclage</h1>
    </header>

    <!-- Encadré avec le principe du jeu -->
    <section class="game-instruction">
      <p>Le but du jeu est de ramasser les sacs plastiques qui tombent du ciel et de les déposer dans la poubelle. Déplacez-les dans la poubelle. Chaque sac plastique collecté vous rapporte un point et chaque poisson vous en fait perdre un.</p>
    </section>

    <!-- Jeu -->
    <section v-if="!gameOver" class="game-play">
      <!-- Points à collecter -->
      <div
        v-for="point in points"
        :key="point.id"
        class="point"
        :style="{ left: point.left, top: point.top }"
        @dragstart="dragStart($event, point)"
        draggable="true"
      >
        <img :src="point.image" alt="Point" class="point-image" />
      </div>

      <!-- Poubelle fixe en bas à droite -->
      <div
        class="basket"
        :style="{ left: basketPosition.left, bottom: basketPosition.bottom }"
        @drop="drop($event)"
        @dragover="allowDrop($event)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
          <path d="M3 4h18v2H3zm2 3h14l1 11H4zm3 4h8v6H7z" />
        </svg>
      </div>

      <!-- Score -->
      <div class="score">
        <p>Score: {{ score }}</p>
      </div>
    </section>

    <!-- Message de félicitations -->
    <div v-if="gameOver" class="game-over">
      <p>{{ congratulationsMessage }}</p>
      <button @click="restartGame">Retour à l'accueil</button>
    </div>
  </div>
</template>


<script setup>
import logoSite from '@/assets/poisson.png'; // Importation de l'image du poisson
import sacPlastique from '@/assets/sacplastique.png'; // Importation de l'image du sac plastique
import { onMounted, onUnmounted, ref } from 'vue';

const score = ref(0);
const points = ref([]); // Liste des points à collecter
const basketPosition = ref({ left: '80%', bottom: '10px' }); // Poubelle fixe en bas à droite
let gameAreaHeight = ref(0);
let gameAreaWidth = ref(0);
let dernierPoint = null;
const gameOver = ref(false); // Pour afficher le message de fin de jeu
const congratulationsMessage = ref(''); // Message de félicitations

const generatePoint = (isFish) => {
  const image = isFish ? logoSite : sacPlastique; // Choisir l'image selon le paramètre isFish

  // Limiter la position horizontale pour qu'elle reste dans la zone de jeu
  const left = Math.random() * (gameAreaWidth.value - 50) + 'px'; // Position horizontale aléatoire (en tenant compte de la largeur du point)

  // Limiter la position verticale pour qu'elle reste dans la zone de jeu
  const top = Math.random() * (gameAreaHeight.value - 100) + 'px'; // Position verticale aléatoire (en tenant compte de la hauteur du point)

  const id = Date.now() + Math.random(); // ID unique pour chaque point
  points.value.push({ id, image, left, top, isFish });
};


// Créer des points au démarrage
const createPoints = () => {
  points.value = []; // Réinitialiser la liste des points
  // Générer toujours 6 poissons et 3 sacs plastiques
  for (let i = 0; i < 8; i++) {
    generatePoint(true); // Générer des poissons
  }
  for (let i = 0; i < 8; i++) {
    generatePoint(false); // Générer des sacs plastiques
  }
};

// Fonction de drag start pour chaque point
const dragStart = (event, point) => {
  event.dataTransfer.setData('point', JSON.stringify(point));
  dernierPoint = point;
};

// Fonction de drag over pour autoriser le drop
const allowDrop = (event) => {
  event.preventDefault(); // Permet le comportement de "drop"
};

// Fonction de drop pour récupérer un point, mettre à jour le score et supprimer le point
const drop = (event) => {
  event.preventDefault();
  const data = event.dataTransfer.getData('point');
  const point = JSON.parse(data);

  // Mise à jour du score
  if (!point.isFish) {
    score.value += 1; // Gain de points pour le sac plastique
  } else {
    score.value -= 1; // Perte de points pour le poisson
  }

  // Supprimer le point de la liste des points
  points.value = points.value.filter(p => p.id !== point.id);

  // Générer un nouveau point pour remplacer celui collecté
  if (dernierPoint.isFish) {
    generatePoint(true); // Générer un nouveau poisson
  } else {
    generatePoint(false); // Générer un nouveau sac plastique
  }


  // Vérifier si le score atteint 5
  if (score.value === 5) {
    gameOver.value = true; // Afficher le message de fin de jeu
    congratulationsMessage.value = 'Félicitations, vous avez gagné!';
  }
};

// Fonction pour redémarrer le jeu (revenir à l'accueil)
const restartGame = () => {
  // Remettre tout à zéro
  score.value = 0;
  gameOver.value = false;
  congratulationsMessage.value = '';
  createPoints();
};

onMounted(() => {
  // Définir les dimensions de la zone de jeu
  gameAreaHeight.value = window.innerHeight - 160; // Laisser de la place pour le header et les instructions
  gameAreaWidth.value = window.innerWidth;

  createPoints(); // Générer les points au démarrage du jeu
});

onUnmounted(() => {
  // Retirer l'écouteur d'événements si nécessaire
});
</script>


<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-bottom: 40px;
  background-color: #2196F3; /* Fond bleu pour toute la zone de jeu */
}

.game-header {
  background-color: #4caf50;
  width: 100%;
  padding: 10px;
  text-align: center;
  color: white;
}

.game-instruction {
  margin: 20px;
  padding: 10px;
  border: 2px solid #4caf50;
  width: 90%;
  text-align: center;
  font-size: 1rem; /* Taille de texte par défaut */
}

.game-play {
  position: relative;
  width: 100%;
  height: calc(100vh - 160px);
  overflow: hidden;
}

.point {
  position: absolute;
  width: 50px; /* Ajustez la taille de l'image */
  height: 50px; /* Ajustez la taille de l'image */
  cursor: pointer;
}

.point-image {
  width: 100%;
  height: 100%;
}

.basket {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 80px;
  height: 60px;
  background-color: #f44336;
  border-radius: 10px;
  cursor: pointer;
}

.score {
  position: absolute;
  top: 10px;
  font-size: 1.5rem;
  font-weight: bold;
}

.basket svg {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

/* Styles pour les écrans mobiles */
@media (max-width: 768px) {
  .game-play {
    height: calc(100vh - 160px);
  }

  .point {
    width: 35px;
    height: 35px;
  }

  .basket {
    width: 60px;
    height: 50px;
  }

  .score {
    font-size: 1.2rem;
  }

  .game-instruction {
    font-size: 0.8rem; /* Taille de texte plus petite pour les écrans mobiles */
  }
}

.game-over {
  text-align: center;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
