<template>
  <div class="base-cell-group main-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseCellGroup',
  props: {
    titleWidth: {
      type: String,
      default: '4vmax'
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
.base-cell-group {
  padding: 1vh 1vw;
  box-sizing: border-box;
  overflow: auto;
}
</style>
