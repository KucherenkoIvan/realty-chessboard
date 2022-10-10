<template>
  <div class="flat-representation">
    <h3 class="realty-type">{{ flat.type }}</h3>
    <div class="object-number">номер {{ flat.number }}</div>
    <hr class="divider" />
    <span>{{ Number(flat.cost).toLocaleString() }} ₽</span>
    <span>площадь: {{ flat.square }} м²</span>
    <span>этаж: {{ flat.floor }} / </span>
    <span>статус: {{ flat.status }}</span>
  </div>
</template>

<script>
export default {
  name: 'FlatRepresentation',
  props: {
    flat: Object,
  },
};
</script>

<style scoped>
.flat-representation {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
}
.flat-representation__realty-type {
  white-space: nowrap;
  margin: 8px 0;
}
.flat-representation__object-number {
  color: #666;
}
.flat-representation__divider {
  display: block;
  width: 100%;
}
</style>
