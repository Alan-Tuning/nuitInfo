<template>
    <div class="container">
      <h1 class="title">Améliorations</h1>
      <p class="selected-item">Article sélectionné : {{ selectedItem }}</p>
  
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
        </div>
      </div>
  
      <button 
        @click="buyItem" 
        :disabled="!selectedItem || selectedItemPrice > points" 
        class="buy-button"
      >
        Acheter l'article
      </button>
  
      <div v-if="purchasedItem" class="confirmation">
        <p>Félicitations ! Vous avez acheté : {{ purchasedItem }}</p>
      </div>
    </div>
  </template>
    
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
    { id: 1, name: 'Champignon qui mange plastique', price: 1.99, bonus: 1 },
    { id: 2, name: 'Jacques-Yves Cousteau', price: 999.50, bonus: 5 },
    { id: 3, name: 'DeLorean qui consomme les déchets', price: 1499.00, bonus: 10 },
    { id: 4, name: 'Hugues Aufray qui chante', price: 249.99, bonus: 2 },
    { id: 5, name: 'Un bateau de nettoyage', price: 2999.99, bonus: 20 },
    { id: 6, name: 'Renaud c\'est la mer qui prend l\'homme TATATA', price: 79.99, bonus: 1 },
  ]);
  
  const selectedItem = ref('');
  const selectedItemPrice = ref(0);
  const purchasedItem = ref('');
  
  const selectItem = (item) => {
    selectedItem.value = item.name;
    selectedItemPrice.value = item.price;
  };
  
  const buyItem = () => {
    if (selectedItem.value && selectedItemPrice.value <= props.points) {
      emit('buy-upgrade', selectedItemPrice.value);
      purchasedItem.value = selectedItem.value;
      selectedItem.value = '';
      selectedItemPrice.value = 0;
    } else {
      alert('L\'achat a échoué.');
    }
  };
  </script>
    

  
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
    background-color: #4CAF50;
    color: white;
  }
  
  .buy-button {
    margin-top: 20px;
    padding: 12px 20px;
    background-color: #4CAF50;
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
  
  .buy-button:hover {
    background-color: #45a049;
  }
  
  .confirmation {
    margin-top: 20px;
    background-color: #e0f7e0;
    padding: 10px;
    border-radius: 5px;
    font-size: 1.1rem;
    color: #4CAF50;
  }
  </style>