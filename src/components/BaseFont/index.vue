<template>
  <div class="base-font">
    <span
      v-for="(item, index) in fontList"
      :key="index"
      :style="{
        fontSize: `${size}rem`,
        width: `${size * 1.25}rem`,
        height: `${size * 1.5}rem`
      }"
      >{{ item }}</span
    >
  </div>
</template>

<script>
export default {
  name: 'BaseFont',
  props: {
    value: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      fontList: []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.fontList = val.split('')
      },
      immediate: true
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.base-font {
  display: flex;
  flex-direction: row;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1.5px;
    background-image: url(./images/number-bg.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }
}
</style>
