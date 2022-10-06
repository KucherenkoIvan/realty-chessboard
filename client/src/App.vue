<template>
  <div v-bind:key="house" v-for="house in houses">
    <ChessBoard v-bind:house="house" />
  </div>
</template>

<script>
import { getHouses } from './api/api';
import ChessBoard from './components/ChessBoard/ChessBoard.vue';

export default {
  name: 'App',
  components: { ChessBoard },
  data() {
    return {
      houses: null,
    };
  },
  async mounted() {
    this.houses = await getHouses();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px 40px;
}
</style>
