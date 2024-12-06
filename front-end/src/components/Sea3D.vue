<template>
    <div ref="oceanContainer" class="ocean-background"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import * as THREE from 'three';
  import { Water } from 'three/examples/jsm/objects/Water.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  
  const oceanContainer = ref(null);
  
  let scene, camera, renderer, water, controls;
  const SCREEN_WIDTH = window.innerWidth;
  const SCREEN_HEIGHT = window.innerHeight;
  
  const initThreeJS = () => {
    // Créer la scène
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
  
    // Configurer la caméra
    camera = new THREE.PerspectiveCamera(55, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 20000);
    camera.position.set(30, 30, 100);
    camera.lookAt(scene.position);
  
    // Configurer le renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    oceanContainer.value.appendChild(renderer.domElement);
  
    // Ajouter des contrôles orbitaux
    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set(0, 10, 0);
    controls.minDistance = 40;
    controls.maxDistance = 200;
  
    // Configurer l'éclairage
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(0, 300, 500);
    scene.add(light);
  
    // Créer l'eau
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    water = new Water(
      waterGeometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load(
          'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/waternormals.jpg', 
          function(texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          }
        ),
        sunDirection: new THREE.Vector3(0.5, -1, -1),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined
      }
    );
  
    water.rotation.x = -Math.PI / 2;
    scene.add(water);
  
    // Animation des vagues
    animate();
  };
  
  const animate = () => {
    requestAnimationFrame(animate);
    water.material.uniforms['time'].value += 1.0 / 60.0;
    controls.update();
    renderer.render(scene, camera);
  };
  
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  
  onMounted(() => {
    initThreeJS();
    window.addEventListener('resize', onWindowResize);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize);
    // Nettoyer les ressources Three.js si nécessaire
    renderer.dispose();
    water.geometry.dispose();
    water.material.dispose();
  });
  </script>
  
  <style scoped>
  .ocean-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0.7;
  }
  </style>