<template>
  <div ref="birdsContainer" class="birds-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

const birdsContainer = ref(null);

// Configuration des oiseaux
const BIRD_COUNT = 50;
const AREA_SIZE = 5000;
const birdModels = [];

let scene, camera, renderer;

const createBirdGeometry = () => {
  const geometry = new THREE.BufferGeometry();
  
  // Vertices pour créer une forme d'oiseau simple
  const vertices = new Float32Array([
    // Corps
    0, 0, 0,
    -10, 0, -5,
    10, 0, -5,
    
    // Aile gauche
    0, 0, 0,
    -20, 5, -10,
    -10, 0, -5,
    
    // Aile droite
    0, 0, 0,
    20, 5, -10,
    10, 0, -5
  ]);

  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  
  // Matériau dynamique
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x000000,
    side: THREE.DoubleSide 
  });

  return { geometry, material };
};

const initBirds = (parentScene, parentCamera, parentRenderer) => {
  scene = parentScene;
  camera = parentCamera;
  renderer = parentRenderer;

  const { geometry, material } = createBirdGeometry();

  for (let i = 0; i < BIRD_COUNT; i++) {
    const bird = new THREE.Mesh(geometry, material);
    
    // Positionner aléatoirement les oiseaux
    bird.position.set(
      Math.random() * AREA_SIZE - AREA_SIZE / 2,
      Math.random() * 1000 + 500, // Altitude variable
      Math.random() * AREA_SIZE - AREA_SIZE / 2
    );
    
    // Rotation aléatoire
    bird.rotation.y = Math.random() * Math.PI * 0.2;
    
    // Mise à l'échelle
    bird.scale.set(5, 5, 5);
    
    scene.add(bird);
    birdModels.push(bird);
  }
  
  animateBirds();
};

const animateBirds = () => {
  birdModels.forEach((bird, index) => {
    // Mouvement de vol sinusoïdal
    const time = Date.now() * 0.001;
    const amplitude = 5;
    
    bird.position.x += Math.cos(time + index) * 3;
    bird.position.z += Math.sin(time + index) * 3;
    bird.position.y += Math.sin(time * 0.5 + index) * amplitude;
    
    // Rotation pour suivre la direction du vol
    bird.rotation.y = Math.atan2(
      bird.position.z, 
      bird.position.x
    );
    
    // Effet d'oscillation des ailes
    bird.rotation.x = Math.sin(time * 5) * 0.2;
    
    // Réinitialiser la position si l'oiseau sort de la zone
    if (Math.abs(bird.position.x) > AREA_SIZE / 2 || 
        Math.abs(bird.position.z) > AREA_SIZE / 2) {
      bird.position.x = Math.random() * AREA_SIZE - AREA_SIZE / 2;
      bird.position.z = Math.random() * AREA_SIZE - AREA_SIZE / 2;
    }
  });
  
  // Continuer l'animation
  requestAnimationFrame(animateBirds);
};

// Exposition de la méthode d'initialisation
defineExpose({
  initBirds
});
</script>

<style scoped>
.birds-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>