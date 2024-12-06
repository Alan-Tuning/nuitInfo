<script setup>
import { ref } from 'vue';
import Woman from '../components/Woman.vue';
import HelloWorld from '../components/HelloWorld.vue';
import FishingGame from '../components/FishingGame.vue';
import game_plastique from '@/components/game_plastique.vue';
import StoryPopup from '../components/StoryPopup.vue';

let story_message = ref("L'océan, vaste et mystérieux, existe depuis des millénaires. Il a traversé les âges, portant en son sein la naissance et l'évolution de formes de vie infiniment diverses. Comme les cellules d'un corps vivant, ces créatures marines se sont multipliées, chacune apportant une spécificité unique à l'ensemble de cet écosystème fascinant.");
let show_story_popup = ref(true);
const womanVisible = ref(true);
const currentComponent = ref(null);

const handleCloudSelection = (id) => {
  if (id == 4) {
    currentComponent.value = game_plastique;
  } else if (id === 5) {
    currentComponent.value = HelloWorld;
  } else if (id === 2) {
    currentComponent.value = FishingGame;
  } else {
    currentComponent.value = null;
  }
  womanVisible.value = !currentComponent.value;
};

window.addEventListener('cloudSelected', (event) => {
  handleCloudSelection(event.detail);
});
</script>

<template>
  <div>
    <Woman :class="{ hidden: !womanVisible }" />

    <div v-if="currentComponent" class="dynamic-component">
      <component :is="currentComponent" />
    </div>
  </div>

  <StoryPopup :message="story_message" :show_footer="show_story_popup" @close_popup="show_story_popup = false"/>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.hidden {
  display: none;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .dynamic-component {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000; /* Mettre au-dessus de Woman */
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
