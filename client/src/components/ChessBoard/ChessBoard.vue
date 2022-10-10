<template>
  <div>
    <div class="chessboard">
      <FiltersBlock @change="filters = $event.filterValue" />
      <div class="chessboard__floor-numbers">
        <div v-for="n in getFloorNumbers()" :key="n" class="floor-numbers__num">
          {{ n }}
        </div>
      </div>
      <ChessBoardEntrance
        v-for="e in entrances"
        :key="e.id"
        :entrance="e"
        :maxFloors="maxFloors"
        :selectedFlat="selectedFlat"
        :applyFilters="applyFilters"
        @change="selectedFlat = $event"
      />
    </div>
  </div>
</template>

<script>
import { getEntrances } from '@/api/api';
import { validateKey, validateNumber } from '@/helpers/validation';
import FiltersBlock from '../FiltersBlock/FiltersBlock.vue';
import ChessBoardEntrance from './ChessBoardEntrance.vue';

export default {
  data() {
    return {
      entrances: [],
      maxFloors: 0,
      selectedFlat: { pipe: null, flat: null, entrance: null },
      filters: {
        cost: {
          min: 0,
          max: Infinity,
        },
        square: {
          min: 0,
          max: Infinity,
        },
        status: null,
        planType: null,
        misc: null,
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
  methods: {
    getFloorNumbers() {
      return Array.from({ length: this.maxFloors }, (_, i) => i + 1).reverse();
    },
    applyFilters(flat) {
      let isValid = validateNumber(
        this.filters.cost.min,
        this.filters.cost.max,
        flat?.cost,
      );

      isValid &= validateNumber(
        this.filters.square.min,
        this.filters.square.max,
        flat?.square,
      );

      if (this.filters.status) {
        isValid &= flat?.status === this.filters.status;
      }
      if (this.filters.planType) {
        isValid &= flat?.planType === this.filters.planType;
      }
      if (this.filters.misc) {
        isValid &= validateKey(this.filters.misc, flat);
      }
      return isValid;
    },
  },
  watch: {
    async house(newHouse) {
      this.selectedFlat = { pipe: null, flat: null, entrance: null };
      this.entrances = await getEntrances(newHouse);
      this.maxFloors = this.entrances.reduce(
        (prev, curr) => Math.max(prev, curr.floors.length),
        0,
      );
    },
    filters(w) {
      console.log(w);
    },
  },
  name: 'ChessBoard',
  props: {
    house: {
      type: String,
      required: true,
    },
  },
  components: { ChessBoardEntrance, FiltersBlock },
};
</script>

<style scoped>
.chessboard__floor-numbers {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 16px;
}
.floor-numbers__num {
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chessboard {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  border-collapse: collapse;
  max-width: 100%;
  overflow: auto;
}
</style>
