<script setup>
import { reactive, onMounted, ref } from "vue";

defineProps({
  msg: {
    type: String,
    required: true,
  },
});

const womanSrc = new URL('@/assets/woman.png', import.meta.url).href;
const cloudSrc = new URL('@/assets/cloud.png', import.meta.url).href;

const clouds = reactive([
  { id: 1, x: 47, y: 38, size: 100, rotation: 0, visible: true }, // rein
  { id: 2, x: 48, y: 30, size: 100, rotation: 100, visible: true }, // poumon droit
  { id: 6, x: 46, y: 30, size: 100, rotation: -100, visible: true }, // poumon gauche
  { id: 3, x: 47, y: 10, size: 100, rotation: 0, visible: true }, // front
  { id: 4, x: 40, y: 45, size: 100, rotation: 0, visible: true }, // bras
  { id: 5, x: 48, y: 25, size: 100, rotation: 0, visible: true }, // coeur
]);

function toggleCloud(id) {
  const cloud = clouds.find((c) => c.id === id);
  if (cloud) cloud.visible = !cloud.visible;
}

const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);

onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
    adjustCloudPositions();
  });
  adjustCloudPositions();
});

function adjustCloudPositions() {
  if (windowWidth.value <= 780) {
    clouds[0].x = 35;  clouds[0].y = 42; //rein
    clouds[1].x = 40;  clouds[1].y = 36; //poumon droit
    clouds[2].x = 32;  clouds[2].y = 36; // poumon gauche
    clouds[3].x = 38;  clouds[3].y = 20; // front
    clouds[4].x = 15;  clouds[4].y = 45; //bras
    clouds[5].x = 40;  clouds[5].y = 32; //coeur
  } else {
    clouds[0].x = 47; clouds[0].y = 38;
    clouds[1].x = 48; clouds[1].y = 30;
    clouds[2].x = 46; clouds[2].y = 30;
    clouds[3].x = 47; clouds[3].y = 10;
    clouds[4].x = 40; clouds[4].y = 45;
    clouds[5].x = 48; clouds[5].y = 25;
  }
}
</script>

<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <img class="image-woman" :src="womanSrc" alt="Woman" />
    <div
      v-for="cloud in clouds"
      :key="cloud.id"
      class="cloud"
      v-show="cloud.visible"
      :style="{
        top: cloud.y + '%',
        left: cloud.x + '%',
        width: cloud.size + 'px',
        transform: 'rotate(' + cloud.rotation + 'deg)',
      }"
    >
      <img :src="cloudSrc" alt="Cloud" />
      <div 
        class="cloud-button" 
        @click.stop="toggleCloud(cloud.id)"
      >
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  margin-bottom: 20px;
}

.image-woman {
  transform: translate(50%);
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cloud {
  position: absolute;
  cursor: pointer;
}

.cloud img {
  width: 100px;
  height: auto;
}

.cloud-button {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  background-color: #62B3E4;  
  border-radius: 50%;  
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);  
  transform: translate(-50%, -50%);  
  cursor: pointer;
  border: 2px solid #333333;
}


@media (max-width: 780px) {
  .image-woman {
    transform: translate(0%);
    width: 80vw;
  }

  .cloud img {
    width: 75px;
    height: auto;
  }

  img {
    width: 75%;
    height: 75%;
  }

  .cloud-button {
    width: 15px;
    height: 15px;
  }
}
</style>
