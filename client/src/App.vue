<template>
  Дом:
  <select v-model="selectedHouse">
    <option v-for="house in houses" :key="house" :value="house">
      {{ house }}
    </option>
  </select>
  <div v-if="selectedHouse">
    <ChessBoard :house="selectedHouse" />
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
      selectedHouse: null,
      houses: null,
    };
  },
  async mounted() {
    this.houses = await getHouses();
    this.selectedHouse = this.houses[0];
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
