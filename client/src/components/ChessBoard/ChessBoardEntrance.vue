<template>
  <div class="chessboard__entrance" v-if="floors.length">
    <h4>{{ entrance.title }}</h4>
    <ChessBoardFloor
      v-for="floor in floors"
      :key="floor"
      :floor="floor"
      :maxFlats="maxFlats"
      :selectedFlat="selectedFlat"
      :entranceId="entrance.id"
      :applyFilters="applyFilters"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-else class="chessboard__entrance-skeleton"></div>
</template>

<script>
import { getFloors } from '@/api/api';
import ChessBoardFloor from './ChessBoardFloor.vue';

export default {
  data() {
    return {
      floors: [],
      maxFlats: 0,
    };
  },
  async mounted() {
    const floors = await getFloors(this.entrance.id);
    this.floors = this.fillFloors(floors);
    this.maxFlats = floors.reduce(
      (prev, { flats }) => Math.max(prev, flats.length),
      0,
    );
  },
  methods: {
    fillFloors(rawFloors) {
      return Array.from({ length: this.maxFloors }, (_, i) => i)
        .map((floorNumber) =>
          rawFloors.find(({ floor }) => floor === floorNumber + 1),
        )
        .reverse();
    },
  },
  name: 'ChessBoardEntrance',
  props: {
    entrance: {
      type: Object,
      required: true,
    },
    maxFloors: {
      type: Number,
      required: true,
    },
    selectedFlat: Object,
    applyFilters: Function,
  },
  components: { ChessBoardFloor },
};
</script>

<style scoped>
.chessboard__entrance-skeleton {
  min-width: 100%;
  height: auto;

  box-sizing: border-box;
  border: 1px solid #eaeaea;
  background-color: #eaeaea;
  border-radius: 8px;
  margin: 16px;
}
.chessboard__entrance {
  display: inline-flex;
  flex-flow: column nowrap;
  justify-content: flex-end;

  overflow: show;

  margin: 16px;

  gap: 8px;
}
</style>
