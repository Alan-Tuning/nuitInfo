<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { onMounted } from 'vue';
import tatataSound from '@/assets/tatata.mp3';
import santianoSound from '@/assets/santiano.mp3';


const props = defineProps({
    points: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['buy-upgrade']);

const items = ref([
    { id: 1, name: 'Champignon qui mange plastique', price: 1.99, bonus: 1, count: 0, img: "@/assets/champignon.png" },
    { id: 2, name: 'Jacques-Yves Cousteau', price: 999.50, bonus: 5, count: 0, img: "@/assets/cousteau.png" },
    { id: 3, name: 'DeLorean qui consomme les déchets', price: 1499.00, bonus: 10, count: 0, img: "@/assets/dolorean.png" },
    { id: 4, name: 'Hugues Aufray qui chante', price: 0.99, bonus: 2, count: 0, img: "@/assets/Hugues.png" },
    { id: 5, name: 'Un bateau de nettoyage', price: 2999.99, bonus: 20, count: 0, img: "@/assets/bateau.png" },
    { id: 6, name: 'Renaud c\'est la mer qui prend l\'homme TATATA', price: 0.99, bonus: 1, count: 0, img: "@/assets/Renaud.png" },
    { id: 7, name: 'Le paradis', price: 6000000, bonus: -45, count: 0, img: "assets/paradis.png" },
]);

const selectedItem = ref('');
const selectedItemPrice = ref(0);
const TATATA = new Audio(tatataSound);
const SANTIANO = new Audio(santianoSound);
const purchasedItem = ref('');
const showConfirmation = ref(false);

const selectItem = (item) => {
    selectedItem.value = item.name;
    selectedItemPrice.value = item.price;
};

const attemptPurchase = () => {
    showConfirmation.value = true;
};

const confirmPurchase = () => {
    if (selectedItemPrice.value <= props.points) {
        const item = items.value.find(i => i.name === selectedItem.value);
        if (item) {
            item.count++;
        }
        if (item.id === 6) {
            const playTatata = (count) => {
                if (count > -1) {
                    TATATA.play();
                    setTimeout(() => playTatata(count - 1), 1000);
                }
            };

            playTatata(item.count);
        } else if (item.id === 4) {
            const playSantiano = (count) => {
                if (count > -1) {
                    SANTIANO.play();
                    setTimeout(() => playSantiano(count - 1), 2000);
                }
            };
            playSantiano(item.count);
        }
        emit('buy-upgrade', selectedItemPrice.value);
        purchasedItem.value = selectedItem.value;
        selectedItem.value = '';
        selectedItemPrice.value = 0;
    } else {
        alert('Points insuffisants pour cet achat.');
    }
    showConfirmation.value = false;
};

const cancelPurchase = () => {
    showConfirmation.value = false;
};


</script>

<template>
    <div class="container">
        <h1 class="title">Améliorations</h1>

        <div class="items-list">
            <div :key="1" class="item" @click="selectItem(items[0])" :class="{
                selected: items[0].name === selectedItem,
                disabled: items[0].price > points
            }" style="text-align : left">
                <img src="@/assets/champignon.png" height="40" width="40">
                {{ items[0].name }} - {{ items[0].price }} €
                <span v-if="items[0].count > 0"> (Acheté : {{ items[0].count }} fois)</span>
            </div>

            <div :key="2" class="item" @click="selectItem(items[1])" :class="{
                selected: items[1].name === selectedItem,
                disabled: items[1].price > points
            }" style="text-align : left">
                <img src="@/assets/cousteau.png" height="40" width="40">
                {{ items[1].name }} - {{ items[1].price }} €
                <span v-if="items[1].count > 0"> (Acheté : {{ items[1].count }} fois)</span>
            </div>

            <div :key="3" class="item" @click="selectItem(items[2])" :class="{
                selected: items[2].name === selectedItem,
                disabled: items[2].price > points
            }" style="text-align : left">
                <img src="@/assets/dolorean.png" height="40" width="40">
                {{ items[2].name }} - {{ items[2].price }} €
                <span v-if="items[2].count > 0"> (Acheté : {{ items[2].count }} fois)</span>
            </div>

            <div :key="4" class="item" @click="selectItem(items[3])" :class="{
                selected: items[3].name === selectedItem,
                disabled: items[3].price > points
            }" style="text-align : left">
                <img src="@/assets/Hugues.png" height="40" width="40">
                {{ items[3].name }} - {{ items[3].price }} €
                <span v-if="items[3].count > 0"> (Acheté : {{ items[3].count }} fois)</span>
            </div>

            <div :key="5" class="item" @click="selectItem(items[4])" :class="{
                selected: items[4].name === selectedItem,
                disabled: items[4].price > points
            }" style="text-align : left">
                <img src="@/assets/bateau.png" height="40" width="40">
                {{ items[4].name }} - {{ items[4].price }} €
                <span v-if="items[4].count > 0"> (Acheté : {{ items[4].count }} fois)</span>
            </div>

            <div :key="6" class="item" @click="selectItem(items[5])" :class="{
                selected: items[5].name === selectedItem,
                disabled: items[5].price > points
            }" style="text-align : left">
                <img src="@/assets/Renaud.png" height="40" width="40">
                {{ items[5].name }} - {{ items[5].price }} €
                <span v-if="items[5].count > 0"> (Acheté : {{ items[5].count }} fois)</span>
            </div>

            <div :key="7" class="item" @click="selectItem(items[6])" :class="{
                selected: items[6].name === selectedItem,
                disabled: items[6].price > points
            }" style="text-align : left">
                <img src="@/assets/paradis.png" height="40" width="40">
                {{ items[6].name }} - {{ items[6].price }} €
                <span v-if="items[6].count > 0"> (Acheté : {{ items[6].count }} fois)</span>
            </div>
        </div>

        <button @click="attemptPurchase" :disabled="!selectedItem || selectedItemPrice > points" class="buy-button">
            Acheter l'article
        </button>

        <div v-if="showConfirmation" class="confirmation-dialog">
            <div class="dialog-content">
                <p>Confirmez-vous l'achat de : {{ selectedItem }} pour {{ selectedItemPrice }} € ?</p>
                <div class="dialog-actions">
                    <button id="oui" @click="confirmPurchase">Oui</button>
                    <button id="non" @click="cancelPurchase">Non</button>
                </div>
            </div>
        </div>

        <div v-if="purchasedItem" class="confirmation">
            <p>Félicitations ! Vous avez acheté : {{ purchasedItem }}</p>
        </div>
    </div>
</template>

<style scoped>
.selected-item {
    margin-top: 15px;
    font-size: 1.1rem;
    color: #666;
}

.items-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-top: 20px;
}

.item {
    padding: 15px;
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.item:hover {
    background-color: #e0e0e0;
}

.item.selected {
    background-color: #ffffff;
    color: white;
}

.buy-button {
    margin-top: 20px;
    padding: 12px 20px;
    background-color: #ff0000;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.buy-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.confirmation-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.dialog-content {
    background: white;
    color: black;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
}

.dialog-actions button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

#oui {
    background: red;
    color: white;
}

#non {
    background: green;
    color: white;
}
</style>