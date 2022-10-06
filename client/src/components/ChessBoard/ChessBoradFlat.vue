<template>
  <div
    class="flat"
    v-if="flat"
    :class="this.getColorByStatus(flat.status)"
    @mouseenter="mouseEnterHandler()"
    @mouseleave="mouseLeaveHandler()"
  >
    {{ Number(flat.cost / 1e3).toLocaleString() }} т.₽
    <RealtyTypeLabel :type="flat.type" />
    <ToolTip :show="isPointed">
      <FlatRepresentation :flat="flat" />
    </ToolTip>
  </div>
  <div v-else class="flat-skeleton"></div>
</template>

<script>
import FlatRepresentation from '../FlatRepresentation/FlatRepresentation.vue';
import RealtyTypeLabel from '../RealtyTypeLabel/RealtyTypeLabel.vue';
import ToolTip from '../ToolTip/ToolTip.vue';
export default {
  name: 'ChessBoardFlat',

  data() {
    return {
      isPointed: false,
    };
  },

  methods: {
    mouseEnterHandler() {
      this.isPointed = true;
    },
    mouseLeaveHandler() {
      this.isPointed = false;
    },
    getColorByStatus(status) {
      switch (status) {
        case 'Бронь':
          return 'reserved';
        case 'Выданы ключи':
          return 'keys-out';
        case 'Свободна':
          return 'free';
        default:
          return 'blank';
      }
    },
  },

  props: {
    flat: {
      type: Object,
    },
  },
  components: { ToolTip, FlatRepresentation, RealtyTypeLabel },
};
</script>

<style scoped>
.flat {
  box-sizing: border-box;
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  height: 24px;
  width: 96px;
  border: 1px solid #eaeaea;
  color: #fff;
}
.reserved {
  background-color: #ffab4a;
}
.free {
  background-color: #57c683;
}
.keys-out {
  background-color: #a393eb;
}
.blank {
  background-color: #e8f7fa;
  border: 1px solid #268cc7;
  color: #268cc7;
}
.flat-skeleton {
  box-sizing: border-box;
  border: 1px solid #eaeaea;
  background-color: #eaeaea;
  width: 96px;
  height: 24px;
}
</style>
