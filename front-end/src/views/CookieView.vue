<template>
    <div>
        <h1>CookieView</h1>
        <PlasticGame />
        
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    import BuyItems from '../components/BuyItems.vue';
    import PlasticGame from '../components/PlasticGame.vue';

</script>

<style scoped>
    h1 {
        color: red;
    }

</style>