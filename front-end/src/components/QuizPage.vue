<script setup>
import { computed } from 'vue';

const props = defineProps({
  q_nb: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  questionProps: {
    type: Object,
    required: true,
    default: () => ({1 : "haha",
      2 : "hihi",
      3 : "hoho",
      4 : "huhu",
    }), // Default to an empty object
  },
  correctAnswer: {
    required: false,
    default: 1,
  },
})

const validateAnswer = () => {
    const selectedAnswer = document.querySelector('input[name="key"]:checked');
    if (selectedAnswer) {
      const isCorrect = parseInt(selectedAnswer.value) === props.correctAnswer;
      alert(isCorrect ? 'Correct!' : 'Incorrect!');
    } else {
      alert('Please select an answer.');
    }
  };

</script>

<template>
  <div class="container">
    <div class="question_nb">
      Question
    </div>
    <div class="question">
      {{ middleTitle ? middleTitle : null }}
    </div>
    <div class="answers">
      <div v-for="(value, key) in questionProps" :key="key">
        <input type="radio" :id="key" :name="key" :value="key">
        <label :for="key">{{ value }}</label>
      </div>
    </div>
    <button @click="validateAnswer">SOUMETTRE</button>
  
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
