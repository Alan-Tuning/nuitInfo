<script setup>
import Header from './components/Header.vue';
</script>

<template>
  <Header />

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
* {
  background-color: #EBEBEB;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .dynamic-component {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000; /* Mettre au-dessus de Woman */
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
