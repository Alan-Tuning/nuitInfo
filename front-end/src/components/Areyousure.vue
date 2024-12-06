
<template>
  <div class="container">
    <!-- Action principale -->
    <button @click="showConfirmation = true">Supprimer l'élément</button>

    <!-- Boîte de dialogue de confirmation -->
    <div v-if="showConfirmation" class="confirmation-dialog">
      <div class="dialog-content">
        <p>Êtes-vous sûr de vouloir effectuer cette action ?</p>
        <div class="dialog-actions">
          <button id="oui" @click="confirmAction">Oui</button>
          <button id="non" @click="cancelAction">Non</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showConfirmation: false, // Affiche ou masque la boîte de confirmation
    };
  },
  methods: {
    confirmAction() {
      this.showConfirmation = false; // Fermer la boîte
      alert("Action confirmée !"); // Logique réelle ici
    },
    cancelAction() {
      this.showConfirmation = false; // Annuler et fermer la boîte
      alert("Action annulée.");
    },
  },
};
</script>

<style scoped>
.container {
  margin: 2rem;
  text-align: center;
}

button {
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
#oui {
    background: red;
}
#non {
    background: green;
}

button:hover {
  background: #0056b3;
}

/* Styles de la boîte de confirmation */
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
}
</style>