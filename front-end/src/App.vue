<script setup>
import FactoriesGames from './components/factoriesGames.vue';
import Header from './components/Header.vue'; // Importation du header
import StoryPopup from './components/StoryPopup.vue';
import { ref } from 'vue'


let story_message = "L'océan, vaste et mystérieux, existe depuis des millénaires. Il a traversé les âges, portant en son sein la naissance et l'évolution de formes de vie infiniment diverses. Comme les cellules d'un corps vivant, ces créatures marines se sont multipliées, chacune apportant une spécificité unique à l'ensemble de cet écosystème fascinant."

let show_story_popup = ref(true);

</script>

<template>
  <Header />

  <main>
    <RouterView />
  </main>

  <StoryPopup :message="story_message" :show_footer="show_story_popup" @close_popup="show_story_popup = false"/>
</template>

<style scoped>
* {
  background-color: #EBEBEB;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
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
