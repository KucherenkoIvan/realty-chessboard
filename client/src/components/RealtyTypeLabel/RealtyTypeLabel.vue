<template>
  <div class="realty-type-label">{{ label }}</div>
</template>

<script>
export default {
  name: 'RealtyTypeLabel',
  props: {
    type: String,
  },
  computed: {
    label() {
      switch (this.type) {
        case 'Квартира':
          return 'к';
        case 'Нежилые помещения':
          return 'н';
        case 'Паркинг':
          return 'p';
        default:
          return '?';
      }
    },
  },
};
</script>

<style scoped>
.realty-type-label {
  display: inline-flex;
  height: 1rem;
  width: 1rem;
  border: 1px solid #777;
  border-radius: 100%;
  background-color: #fff;
  color: #333;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  padding: 1.5px;
}
</style>
