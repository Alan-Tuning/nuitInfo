<script setup>
import { computed } from 'vue';
// Components to be used dynamically
import QuizPage from './QuizPage.vue';

const props = defineProps({
  upperMsg: {
    type: String,
    required: false,
  },
  middleTitle: {
    type: String,
    required: false,
  },
  dynamicComponent: {
    type: String,
    required: true, // Make it required for this example
  },
  dynamicProps: {
    type: Object,
    required: false,
    default: () => ({}), // Default to an empty object
  },
})

const componentsMap = {
  // ComponentA,
  // ComponentB,
  QuizPage,
};

// Resolve the component dynamically
const currentComponent = computed(() => componentsMap[props.dynamicComponent] || null);
</script>

<template>
  <div class="container">
    <div class="up" v-if="upperMsg">
      {{ upperMsg ? upperMsg : null }}
    </div>
    <div class="middle" v-if="middleTitle">
      {{ middleTitle ? middleTitle : null }}
    </div>
    <div class="content">
      <component :is="currentComponent" v-bind="dynamicProps" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-rows: 20% 10% 60%; /* Set rows to specific height percentages */
  grid-template-columns: 100%; /* Full width for each column */
  align-items: center;
  justify-items: center;
  text-align: center;
  padding: 1rem;
  gap: 0.5rem;
}

.up, .middle {
  background-color: #080E1E;
  color: #fff;
  text-align: center;
  padding: 0.25rem;
}

.content, .up, .middle {
  width:100%;
  border-radius: 20px;
}

.up {
  overflow: hidden; /* Prevent overflow */
  overflow-y: auto; /* Add scroll if content exceeds the height */
}

.middle {
}

.content {
}
</style>
