<template>
    <div class="parent">
        <div class="div1">
            <div class="plastic-clicker">
                <h1>Plastic Clicker</h1>

                <div class="score-section">
                    <p>Points accumulés : {{ points }}</p>
                    <p>Sacs plastiques recyclés : {{ recycledBags }}</p>
                </div>

                <div class="game-area">
                    <div class="plastic-bag" :class="{ 'clicked': isClicked }" @click="clickBag">
                        <img src="@/assets/plastic-bag.png" alt="Sac plastique à recycler" draggable="false">
                    </div>
                </div>

            </div>
        </div>
        <div class="div2"></div>
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
.plastic-clicker {
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f0f0f0;
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
    margin: 20px 0;
    padding: 10px;
    background-color: white;
    border-radius: 5px;
}


.parent {
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
}
</style>