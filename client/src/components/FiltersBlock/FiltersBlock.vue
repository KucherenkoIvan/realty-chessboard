<template>
  <div class="filters" @change="handleChange($event)">
    <div class="filters__input-group">
      <label for="price_min">Цена мин.</label>
      <input v-model="price_min" type="number" min="0" />
    </div>
    <div class="filters__input-group">
      <label for="price_max">Цена макс.</label>
      <input v-model="price_max" type="number" min="0" />
    </div>

    <div class="filters__input-group">
      <label for="square_min">Площадь мин.</label>
      <input v-model="square_min" type="number" min="0" />
    </div>
    <div class="filters__input-group">
      <label for="square_max">Площадь макс.</label>
      <input v-model="square_max" type="number" min="0" />
    </div>

    <div class="filters__input-group">
      <label for="status">Статус</label>
      <select v-model="status">
        <option selected value="any">Любой</option>
        <option value="Бронь">Бронь</option>
        <option value="Выданы ключи">Выданы ключи</option>
        <option value="Свободна">Свободна</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FiltersBlock',
  data() {
    return {
      price_min: null,
      price_max: null,
      square_min: null,
      square_max: null,
      status: null,
    };
  },
  methods: {
    handleChange(e) {
      e.stopImmediatePropagation();

      const filterValue = {
        cost: {
          min: this.price_min || 0,
          max: this.price_max || Infinity,
        },
        square: {
          min: this.square_min || 0,
          max: this.square_max || Infinity,
        },
        status: this.status === 'any' ? null : this.status,
        planType: this.planType || null,
        misc: null,
      };

      this.$emit('change', { ...e, filterValue });
    },
  },
};
</script>

<style scoped>
.filters {
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;
  margin: 96px 40px 0 0;
}

.filters__input-group {
  white-space: nowrap;
  gap: 16px;
  display: flex;
  justify-content: space-between;
}
</style>
