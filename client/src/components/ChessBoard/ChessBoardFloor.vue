<template>
  <div class="row">
    <ChessBoradFlat v-for="flat in flats" :key="flat" :flat="flat" />
  </div>
</template>

<script>
import ChessBoradFlat from './ChessBoradFlat.vue';

export default {
  data() {
    return {
      flats: this.fillFlats(this.floor?.flats),
    };
  },
  name: 'ChessBoardFloor',
  props: {
    floor: {
      type: Object || undefined,
    },
    maxFlats: {
      type: Number,
    },
  },
  methods: {
    fillFlats(rawFlats) {
      return Array.from({ length: this.maxFlats }, (_, i) => i).map(
        (flatNumber) => rawFlats?.find(({ pipe }) => pipe === flatNumber + 1),
      );
    },
  },
  components: { ChessBoradFlat },
};
</script>

<style scoped>
.row {
  gap: 8px;
  min-height: 24px;
  display: flex;
  flex-flow: row nowrap;
  overflow: visible;
  width: fit-content;
}
</style>
