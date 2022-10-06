<template>
  <div class="entrance">
    <h4>{{ entrance.title }}</h4>
    <ChessBoardFloor
      v-for="floor in floors"
      :key="floor"
      :floor="floor"
      :maxFlats="maxFlats"
    />
  </div>
</template>

<script>
import { getFloors } from '@/api/api';
import ChessBoardFloor from './ChessBoardFloor.vue';

export default {
  data() {
    return {
      floors: [],
      maxFlats: 0,
      highlightedCellPos: { row: null, col: null },
      setHighlightIds(row, col) {
        this.highlightedCellPos = { row, col };
      },
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
  },
  components: { ChessBoardFloor },
};
</script>

<style scoped>
.entrance {
  display: inline-flex;
  flex-flow: column nowrap;
  justify-content: flex-end;

  overflow: show;

  margin: 16px;

  gap: 8px;
}
</style>