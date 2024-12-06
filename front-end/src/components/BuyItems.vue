<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  points: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['buy-upgrade']);

const items = ref([
  { id: 1, name: 'Champignon qui mange plastique', price: 1.99, bonus: 1, count: 0 },
  { id: 2, name: 'Jacques-Yves Cousteau', price: 999.50, bonus: 5, count: 0 },
  { id: 3, name: 'DeLorean qui consomme les déchets', price: 1499.00, bonus: 10, count: 0 },
  { id: 4, name: 'Hugues Aufray qui chante', price: 249.99, bonus: 2, count: 0 },
  { id: 5, name: 'Un bateau de nettoyage', price: 2999.99, bonus: 20, count: 0 },
  { id: 6, name: 'Renaud c\'est la mer qui prend l\'homme TATATA', price: 79.99, bonus: 1, count: 0 },
]);

const selectedItem = ref('');
const selectedItemPrice = ref(0);
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
      <div
        v-for="item in items"
        :key="item.id"
        class="item"
        @click="selectItem(item)"
        :class="{ 
          selected: item.name === selectedItem, 
          disabled: item.price > points 
        }"
      >
        {{ item.name }} - {{ item.price }} € 
        <span v-if="item.count > 0"> (Acheté : {{ item.count }} fois)</span>
      </div>
    </div>

    <button 
      @click="attemptPurchase" 
      :disabled="!selectedItem || selectedItemPrice > points" 
      class="buy-button"
    >
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
  