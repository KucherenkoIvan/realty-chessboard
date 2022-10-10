<template>
  <div class="entrance__floor">
    <ChessBoradFlat
      v-for="flat in flats"
      :key="flat"
      :flat="flat"
      :class="{
        entrance__item_highlighted: getHighlight(flat),
        entrance__item_dimmed: !applyFilters?.(flat),
      }"
      @click="handleFlatClick(flat)"
    />
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

  methods: {
    handleFlatClick(flat) {
      this.$emit('change', {
        pipe: flat.pipe,
        floor: flat.floor,
        entrance: this.entranceId,
      });
    },
    fillFlats(rawFlats) {
      return Array.from({ length: this.maxFlats }, (_, i) => i).map(
        (flatNumber) => rawFlats?.find(({ pipe }) => pipe === flatNumber + 1),
      );
    },
    getHighlight(flat) {
      return (
        (this.selectedFlat?.pipe === flat?.pipe ||
          this.selectedFlat?.floor === this.floor?.floor) &&
        this.selectedFlat?.entrance === this.entranceId
      );
    },
  },
  props: {
    floor: {
      type: Object || undefined,
    },
    maxFlats: {
      type: Number,
    },
    selectedFlat: Object,
    entranceId: String,
    applyFilters: Function,
  },
  components: { ChessBoradFlat },
};
</script>

<style scoped>
.entrance__floor {
  gap: 8px;
  min-height: 24px;
  display: flex;
  flex-flow: row nowrap;
  overflow: visible;
  width: fit-content;
}

.entrance__item_highlighted {
  border-radius: 4px;
  box-shadow: 0px 0px 2px black;
  filter: contrast(1.2) hue-rotate(30deg);
}

.entrance__item_dimmed {
  opacity: 0.5;
}
</style>
