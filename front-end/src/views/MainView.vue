<script setup>
import { ref } from 'vue';
import Woman from '../components/Woman.vue';
import HelloWorld from '../components/HelloWorld.vue';
import FishingGame from '../components/FishingGame.vue';
import game_plastique from '@/components/game_plastique.vue';
import StoryPopup from '../components/StoryPopup.vue';
import factoriesGames from '../components/factoriesGames.vue';


let story_message = ref("L'océan, vaste et mystérieux, existe depuis des millénaires. Il a traversé les âges, portant en son sein la naissance et l'évolution de formes de vie infiniment diverses. Comme les cellules d'un corps vivant, ces créatures marines se sont multipliées, chacune apportant une spécificité unique à l'ensemble de cet écosystème fascinant.");
let show_story_popup = ref(true);

function show_story(message){
  story_message.value = message;
  show_story_popup.value = true;
}


const womanVisible = ref(true);
const currentComponent = ref(null);

const handleCloudSelection = (id) => {
    if (id == 3) {
    currentComponent.value = factoriesGames;
    show_story("Tout comme la fièvre peut indiquer un dysfonctionnement dans le corps humain, la fonte des glaciers est un indicateur préoccupant du réchauffement climatique, un problème global qui menace notre planète et ses écosystèmes. L’industrialisation massive à l’origine de ce réchauffement doit être contrôlée. Éteint les centrales pour éviter la fonte des glaces.")
  }
  else if (id == 4) {
    currentComponent.value = game_plastique;
    show_story("La peau, lorsqu'elle est atteinte par le cancer, subit des dommages irréversibles. De manière similaire, le continent de plastique, résultat de la pollution humaine, défigure nos océans et menace la vie marine. Soignons le cancer de l’océan, en supprimant les déchets.")
  } else if (id === 5) {
    currentComponent.value = HelloWorld;
  } else if (id === 2) {
    currentComponent.value = FishingGame;
    show_story("Les troubles respiratoires touchent de nombreuses personnes. Les coraux sont à l'océan ce que les poumons sont à l'humain. En raison des pratiques destructrices des pêcheurs qui raclent les fonds marins, ils sont menacés de disparition. Appui deux fois sur chaque coraux pour les libérer.");
  } else if (id == -2) {
    currentComponent.value = null;
    show_story("Bravo ! Vous avez protégé les coraux !");
  } 
  else if (id == -4){
    currentComponent.value = null;
    show_story("Bravo ! Vous avez nettoyé l'océean !");
  }
  else if (id == -3){
    currentComponent.value = null;
    show_story("Bravo ! Vous avez protégé les glaciers !");
  }
  
  else {
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
