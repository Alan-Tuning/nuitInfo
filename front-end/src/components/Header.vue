<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

defineProps({
  supportLink: {
    type: String,
    default: 'https://www.raceforwater.org/fr/nous-soutenir/',
  },
  supportText: {
    type: String,
    default: 'Nous soutenir',
  },
  menuLabel: {
    type: String,
    default: 'Menu',
  },
});

</script>

<template>
  <header id="header" class="l-header">
      <!-- Logo -->
      <a href="/" class="l-header__home" title="Accueil">
        <!-- Le logo est stocké dans assets/logo-site.png du dossier src -->
        <img src="@/assets/logo-site.png" alt="logo" />
      </a>

      <!-- Menu Burger -->
      <button
        id="navigation-button"
        class="c-burger l-header__burger"
        aria-label="navigation-burger"
        @click="toggleMenu"
      >
        <span class="c-burger__line"></span>
        <span class="c-burger__line"></span>
        <span class="c-burger__line"></span>
      </button>

      <!-- Navigation -->
      <nav
        id="navigation"
        class="l-navigation"
        :class="{ 'is-visible': isMenuOpen }"
        aria-hidden="!isMenuOpen"
      >
        <ul class="l-navigation__items">
          <li><RouterLink to="/cookie">Plastic Clicker</RouterLink></li>
          <li> <RouterLink to="/podcast">Podcasts</RouterLink></li>
        </ul>
      </nav>
      <!-- Support Button -->
      <a :href="supportLink" class="c-waterdrop l-header__waterdrop">
        <!-- <svg class="c-waterdrop__icon">
          <use xlink:href="https://www.raceforwater.org/app/themes/default/assets/images/sprite-c99f74a38c.svg#sprite-icon-hydrogene"></use>
        </svg> -->
        {{ supportText }}
      </a>
  </header>
</template>

<style scoped>
/* Header global styles */
.l-header {
  background-color: #fff;
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
}

.l-header__home img {
  max-width: 150px;
  height: auto;
}

.c-burger {
  display: none;
  flex-direction: column;
  gap: 4px;
  width: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.c-burger__line {
  width: 100%;
  height: 3px;
  background-color: #162751;
  border-radius: 1px;
}

/* Desktop navigation */
.l-navigation {
  display: flex;
  flex-direction: row;
}

.l-navigation__items {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.l-navigation__link {
  text-decoration: none;
  color: #162751;
  font-weight: bold;
}

/* SVG Icon specific styles */
.c-waterdrop__icon {
  width: 20px; /* Fixe la taille du SVG */
  height: 20px;
  margin-right: 0.5rem; /* Ajoute un peu d'espace entre l'icône et le texte */
}

.l-header__waterdrop {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

/* Styles pour les écrans mobiles */
@media (max-width: 768px) {
  .c-burger {
    display: flex;
  }

  .l-navigation {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    width: 100%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
  }

  .l-navigation.is-visible {
    display: flex;
  }

  .l-navigation__items {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .c-waterdrop {
    display: none; /* Masque le bouton de soutien sur mobile */
  }
}

/* Styles pour les écrans plus grands (tablettes et ordinateurs) */
@media (min-width: 769px) {
  .l-header__container {
    padding: 1rem 2rem;
  }

  .c-burger {
    display: none; /* Cache le menu burger sur ordinateur */
  }

  .l-navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .l-navigation__items {
    gap: 2rem;
  }
}
</style>
