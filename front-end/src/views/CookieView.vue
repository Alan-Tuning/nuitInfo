

<template>
    <div>
        <h1>CookieView</h1>
        
        <div class="parent">
            <div class="div1"> </div>
            <div class="div2"><Areyousure/> </div>
            <div class="div3"><BuyItems /></div>
        </div>
        
    </div>
</template>

<script setup>
    import Areyousure from '../components/Areyousure.vue';
    import { ref } from 'vue';

    import BuyItems from '../components/BuyItems.vue';

</script>

<style scoped>
    h1 {
        color: red;
    }

    .parent {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }

    .div1 { grid-area: 1 / 1 / 2 / 2; }
    .div2 { grid-area: 1 / 2 / 2 / 3; }
    .div3 { grid-area: 1 / 3 / 2 / 4; }
</style>