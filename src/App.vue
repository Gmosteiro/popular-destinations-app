<template>
  <SearchHome />
</template>

<script>
import SearchHome from './views/SearchHome.vue';

export default {
  name: 'App',
  components: {
    SearchHome
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
