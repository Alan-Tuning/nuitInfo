<template>
  <div class="game-container">
    <!-- En-tête du jeu -->
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
        @dragend="dragEnd($event)"
        draggable="true"
        @touchstart="touchStart($event, point)"
        @touchmove="touchMove($event, point)"
        @touchend="touchEnd($event)"
      >
        <img :src="point.image" alt="Point" class="point-image" />
      </div>

      <!-- Poubelle fixe en bas à droite -->
      <div
        class="basket"
        :style="{ left: basketPosition.left, bottom: basketPosition.bottom }"
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

// Fonction pour générer un point (sac plastique ou poisson)
const generatePoint = (isFish) => {
  const image = isFish ? logoSite : sacPlastique; // Choisir l'image selon le paramètre isFish

  // Limiter la position horizontale pour qu'elle reste dans la zone de jeu
  const left = Math.random() * (gameAreaWidth.value - 50) + 'px'; // Position horizontale aléatoire

  // Limiter la position verticale pour qu'elle reste dans la zone de jeu
  const top = Math.random() * (gameAreaHeight.value - 100) + 'px'; // Position verticale aléatoire

  const id = Date.now() + Math.random(); // ID unique pour chaque point
  points.value.push({ id, image, left, top, isFish });
};

// Créer les points au démarrage
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

// Fonction pour gérer le démarrage du drag (ordinateur)
const dragStart = (event, point) => {
  event.dataTransfer.setData('point', JSON.stringify(point)); // Enregistrer le point dans les données de transfert
  dernierPoint = point; // Sauvegarder le dernier point touché
};

// Fonction pour gérer le drag end (ordinateur)
const dragEnd = (event) => {
  event.preventDefault(); // Empêcher l'action par défaut du drag

  // Récupérer la position de la poubelle
  const basketRect = document.querySelector('.basket').getBoundingClientRect();

  // Récupérer la position de la souris lors du dragend
  const mouseX = event.clientX; // Position horizontale de la souris
  const mouseY = event.clientY; // Position verticale de la souris

  // Récupérer la position du point
  const pointRect = {
    left: mouseX - 10, // Position horizontale ajustée pour le centre de l'image
    top: mouseY - 10, // Position verticale ajustée pour le centre de l'image
    right: mouseX + 10, // Ajuster la droite du point
    bottom: mouseY + 10, // Ajuster le bas du point
  };

  console.log("Position de la souris:", mouseX, mouseY);
  console.log("Position du point:", pointRect.left, pointRect.top, pointRect.right, pointRect.bottom);
  console.log("Position de la poubelle:", basketRect.left, basketRect.top, basketRect.right, basketRect.bottom);

  // Vérifier si le point est dans la poubelle (positionné dessus)
  if (
    pointRect.left >= basketRect.left &&
    pointRect.right <= basketRect.right &&
    pointRect.top >= basketRect.top &&
    pointRect.bottom <= basketRect.bottom
  ) {
    // Si c'est un sac plastique, gagner un point; sinon, perdre un point (si c'est un poisson)
    score.value += dernierPoint.isFish ? -1 : 1; 

    if (score.value >= 5) {
      congratulationsMessage.value = 'Félicitations! Vous avez gagné!';
      gameOver.value = true; // Afficher le message de fin de jeu
    }

    // Supprimer le point collecté
    points.value = points.value.filter(p => p.id !== dernierPoint.id);

    // Ajouter un nouveau point
    generatePoint(dernierPoint.isFish);
  }
};

// Fonction pour gérer le démarrage du touché (mobile)
const touchStart = (event, point) => {
  event.preventDefault(); // Empêcher le comportement par défaut
  dernierPoint = point; // Enregistrer le point touché
};

// Fonction pour gérer le mouvement du touché (mobile)
const touchMove = (event, point) => {
  event.preventDefault(); // Empêcher le comportement par défaut
  const touch = event.touches[0]; // Obtenir la position du touché
  point.left = touch.clientX +'px'; // Mise à jour de la position horizontale
  point.top = touch.clientY + 'px'; // Mise à jour de la position verticale
};

const touchEnd = (event) => {
  event.preventDefault(); // Empêcher le comportement par défaut

  // Récupérer la position de la poubelle
  const basketRect = document.querySelector('.basket').getBoundingClientRect();

  // Récupérer la position du doigt lors du touchend
  const touch = event.changedTouches[0]; // Nous récupérons le premier doigt (s'il y en a plusieurs)

  const pointRect = {
    left: parseFloat(dernierPoint.left),
    top: parseFloat(dernierPoint.top),
    right: parseFloat(dernierPoint.left) + 50, // Ajuster la largeur du point
    bottom: parseFloat(dernierPoint.top) + 50, // Ajuster la hauteur du point
  };

  // Coordonnée du doigt
  const touchX = touch.clientX; // Position horizontale du doigt
  const touchY = touch.clientY; // Position verticale du doigt

  console.log("Position du doigt: ", touchX, touchY);
  console.log("Position du point: ", pointRect.left, pointRect.top, pointRect.right, pointRect.bottom);
  console.log("Position de la poubelle: ", basketRect.left, basketRect.top, basketRect.right, basketRect.bottom);

  // Vérifier si le point est dans la poubelle (positionné dessus)
  if (
    touchX >= basketRect.left &&
    touchX <= basketRect.right &&
    touchY >= basketRect.top &&
    touchY <= basketRect.bottom
  ) {
    score.value += dernierPoint.isFish ? -1 : 1; // Perdre un point si c'est un poisson, gagner un point sinon
    if (score.value >= 5) {
      congratulationsMessage.value = 'Félicitations! Vous avez gagné!';
      gameOver.value = true; // Afficher le message de fin de jeu
    }
    points.value = points.value.filter(p => p.id !== dernierPoint.id); // Supprimer le point collecté
    generatePoint(dernierPoint.isFish); // Ajouter un nouveau point (poisson ou sac plastique)
  }
};


// Fonction pour redémarrer le jeu (revenir à l'accueil)
const restartGame = () => {
  const cloudSelectedEvent = new CustomEvent('cloudSelected', {
    detail: -4,
  });
  window.dispatchEvent(cloudSelectedEvent);
};

onMounted(() => {
  gameAreaHeight.value = window.innerHeight - 160; // Hauteur de la zone de jeu
  gameAreaWidth.value = window.innerWidth; // Largeur de la zone de jeu

  createPoints(); // Créer les points au démarrage
});

onUnmounted(() => {
  // Retirer les écouteurs d'événements si nécessaire
});
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding-bottom: 40px;
  background-color: #2196F3; /* Fond bleu */
}

.game-instruction {
  margin: 20px;
  padding: 10px;
  border: 2px solid #4caf50;
  width: 90%;
  text-align: center;
  font-size: 1rem; /* Taille de texte */
}

.game-play {
  position: relative;
  width: 100%;
  height: calc(100vh - 160px);
  overflow: hidden;
}

.point {
  position: absolute;
  width: 50px;
  height: 50px;
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
    font-size: 0.8rem;
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
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
