<template>
  <div class="tooltip-content" v-if="show">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ToolTip',
  props: {
    show: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.tooltip-content {
  z-index: 1000;
  position: absolute;
  padding: 16px;
  background-color: #fff;
  color: #3e3e3e;
  box-shadow: 1px 2px 8px #3e3e3ec0;
  box-sizing: border-box;
  border-radius: 2px;
  transform: translate(88px, 0);
  animation-duration: 0.2s;
  animation-timing-function: ease;
  animation-name: fadein;
}

@keyframes fadein {
  from {
    opacity: 0.25;
  }
  to {
    opacity: 1;
  }
}
</style>
