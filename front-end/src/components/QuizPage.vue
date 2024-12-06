<script setup>
import { ref } from 'vue';

// Variables pour QuizPage
const ind_q_courante = ref(1);
const questions = ref({
  1: {
    q_nb: 1,
    question: "Quel est l'un des principaux effets de la fonte des glaces polaires sur les océans ?",
    questionProps: {
      1: "Augmentation de la salinité des océans",
      2: "Réduction du niveau de la mer",
      3: "Augmentation du niveau de la mer",
      4: "Diminution de la température de l'eau"
    },
    correctAnswer: 3,
  },
  2: {
    q_nb: 2,
    question: "Quel geste quotidien peut aider à réduire l'impact de la fonte des glaces et de la salinisation ?",
    questionProps: {
      1: "Utiliser des sacs en plastique à usage unique",
      2: "Réduire la consommation d'énergie fossile",
      3: "Arroser les plantes avec de l'eau salée",
      4: "Augmenter l'utilisation de produits chimiques dans l'agriculture"
    },
    correctAnswer: 2,
  },
  3: {
    q_nb: 3,
    question: "Qu’est-ce que le continent de plastique ?",
    questionProps: {
      1: "Une formation naturelle dans les océans",
      2: "Une zone remplie de déchets plastiques causée par l’activité humaine",
      3: "Une barrière protégeant les écosystèmes marins",
      4: "Une île artificielle créée pour la recherche scientifique"
    },
    correctAnswer: 2,
  }
});
const currentQuestion = ref(questions.value[ind_q_courante.value]);

// Fonction pour valider la réponse
const validateAnswer = () => {
  const selectedAnswer = document.querySelector('input[name="key"]:checked');
  if (selectedAnswer) {
    const answerValue = parseInt(selectedAnswer.value);
    if (answerValue === currentQuestion.value.correctAnswer) {
      alert('Correct answer!');
    } else {
      alert(`Wrong answer!\nThe correct answer is: ${currentQuestion.value.questionProps[currentQuestion.value.correctAnswer]}`);
    }

    // Passer à la question suivante
    if (ind_q_courante.value < Object.keys(questions.value).length) {
      ind_q_courante.value++;
      currentQuestion.value = questions.value[ind_q_courante.value];
    } else {
      const cloudSelectedEvent = new CustomEvent('cloudSelected', {
        detail: null,
      });
      window.dispatchEvent(cloudSelectedEvent);
    }
  } else {
    alert('Please select an answer!');
  }
};
</script>

<template>
  <div class="container">
    <!-- DynamicPage Content -->
    <div class="up">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo excepturi impedit voluptatibus odio nihil corrupti suscipit reprehenderit, assumenda quos aperiam, accusantium ad. Placeat reiciendis corporis qui ipsum quae voluptas pariatur.
    </div>
    <div class="middle">
      QUIZ
    </div>

    <!-- QuizPage Content -->
    <div class="content">
      <div>
        Question {{ currentQuestion.q_nb }}
      </div>
      <div class="question">
        {{ currentQuestion.question }}
      </div>
      <div class="answers">
        <div v-for="(value, key) in currentQuestion.questionProps" :key="key">
          <input type="radio" :id="key" name="key" :value="key">
          <label :for="key">{{ value }}</label>
        </div>
      </div>
      <button @click="validateAnswer">SOUMETTRE</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-rows: 20% 10% 60%;
  grid-template-columns: 100%;
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
  width: 100%;
  border-radius: 20px;
}

.up {
  overflow: hidden;
  overflow-y: auto;
}

.middle {
}

.content {
}
</style>
