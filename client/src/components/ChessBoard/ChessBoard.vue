<template>
  <div>
    <h3>House UID: {{ house }}</h3>
    <div class="board">
      <div class="floor-nums">
        <div
          v-for="n in Array.from(
            { length: maxFloors },
            (_, i) => i + 1,
          ).reverse()"
          :key="n"
          class="floor-num"
        >
          {{ n }}
        </div>
      </div>
      <ChessBoardEntrance
        v-for="e in entrances"
        :key="e"
        :entrance="e"
        :maxFloors="maxFloors"
      />
    </div>
  </div>
</template>

<script>
import { getEntrances } from '@/api/api';
import ChessBoardEntrance from './ChessBoardEntrance.vue';

export default {
  data() {
    return {
      entrances: [],
      maxFloors: 0,
      highlightedCellPos: { row: null, col: null },
      setHighlightIds(row, col) {
        this.highlightedCellPos = { row, col };
      },
    };
  },
  async mounted() {
    this.entrances = await getEntrances(this.house);
    this.maxFloors = this.entrances.reduce(
      (prev, curr) => Math.max(prev, curr.floors.length),
      0,
    );
  },
  name: 'ChessBoard',
  props: {
    house: {
      type: String,
      required: true,
    },
  },
  components: { ChessBoardEntrance },
};
</script>

<style scoped>
.floor-nums {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 16px;
}
.floor-num {
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.board {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  border-collapse: collapse;
  max-width: 100%;
  overflow: auto;
}
</style>
