<template>
    <div class="parent">
            <div class="plastic-clicker">
                <h1>Plastic Clicker</h1>

                <div class="score-section">
                    <p>Points accumulés : {{ points.toFixed(2) }}</p>
                    <p>Sacs plastiques recyclés : {{ recycledBags }}</p>
                </div>

                <div class="plastic-bag" :class="{ 'clicked': isClicked }" @click="clickBag">
                    <img src="@/assets/plastic-bag.png" alt="Sac plastique à recycler" draggable="true" :style="{ width: width_bag + 'px' }">
                </div>

            </div>
        <div class="div3">
            <BuyItems :points="points" @buy-upgrade="buyUpgrade" />
        </div>
    </div>

</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import BuyItems from './BuyItems.vue';

// Points de base
const points = ref(0);
const recycledBags = ref(0);
const width_bag = ref(100.0);

// État du clic
const isClicked = ref(false);

// Améliorations
const recyclers = ref(0);

// Points par seconde
const pointsPerSecond = computed(() => recyclers.value * 1);

// Fonction pour cliquer sur le sac
const clickBag = () => {
    points.value++;
    recycledBags.value++;
    isClicked.value = true;
    // Animation de clic
    setTimeout(() => {
        isClicked.value = false;
    }, 100);

    clickBag.value = Math.random()*1000
    console.log(clickBag.value)

};

// Acheter une amélioration
const buyUpgrade = (upgradeCost) => {
    if (points.value >= upgradeCost) {
        points.value -= upgradeCost;
        recyclers.value++;
    }
};

// Génération automatique de points
let autoRecycleInterval;
onMounted(() => {
    autoRecycleInterval = setInterval(() => {
        points.value += pointsPerSecond.value;
        recycledBags.value += pointsPerSecond.value;
    }, 1000);
});

onUnmounted(() => {
    clearInterval(autoRecycleInterval);
});
</script>

<style scoped>
.parent {
    display: flex;
    flex-direction: row;
    justify-content: space-between; /* Ajoute de l'espace entre les éléments */
    align-items: center; /* Centre les éléments verticalement */
    padding: 20px;
}

.plastic-clicker {
    flex: 0 0 75%; /* Largeur fixe de 80% */
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
}

.plastic-bag {
    cursor: pointer;
    transition: transform 0.1s;
    display: inline-block;
}

.plastic-bag.clicked {
    transform: scale(0.95);
}

.plastic-bag img {
    max-width: 200px;
    user-select: none;
}

.score-section {
    flex: 0 0 20%; /* Largeur fixe de 20% */
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    padding: 10px;
    border-radius: 5px;
}


/* .parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
}

.div1 {
    grid-area: 1 / 1 / 2 / 2;
}

.div2 {
    grid-area: 1 / 2 / 2 / 3;
}

.div3 {
    grid-area: 1 / 3 / 2 / 4;
} */
</style>