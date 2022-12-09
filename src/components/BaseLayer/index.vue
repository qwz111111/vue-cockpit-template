<template>
  <div class="base-layer">
    <div class="l1-title">{{ title }}</div>
    <div class="l1-box">
      <div
        v-for="(item, index) in list"
        :key="item"
        @click="onClick(item, index)"
      >
        <span
          :class="[
            { 'l1-active': index == indexList },
            'transition-300',
            'flex-start-center',
            'hidden-text'
          ]"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseLayer',
  props: {
    list: {
      type: Array,
      required: false,
      default: () => []
    },
    title: {
      type: String,
      required: false,
      default: '数据图层选择'
    }
  },
  data() {
    return {
      indexList: 0
    }
  },
  watch: {
    indexList: {
      handler(newVal) {
        if (this.list.length === 0) return
        this.$emit('change', { target: this.list[newVal], newVal })
      },
      immediate: false
    }
  },
  methods: {
    onClick(item, index) {
      this.indexList = index
    }
  }
}
</script>

<style scoped lang="less">
.base-layer {
  width: 7.5vw;
  height: 15vh;
  background: url('./images/tuli.png') left center no-repeat;
  background-size: 1.9vw 100%;
  position: absolute;
  .l1-title {
    position: relative;
    left: 2.4vw;
    font-size: 1.4vmin;
  }
  .l1-box {
    overflow: auto;
    position: relative;
    left: 1vw;
    font-size: 1.3vmin;
    height: 80%;
    scrollbar-width: none; /* firefox */
    > div {
      background: url('./images/item1.png') left center no-repeat;
      background-size: 0.4vw 2.2vh;
      padding: 0.8vmin 0 0.8vmin 1vmin;
      > span {
        width: 5vw;
        height: 2.5vh;
        background: rgba(4, 37, 116, 0.7);
        padding-left: 1vmin;
        color: #fff;
      }
      > span:hover,
      .l1-active {
        color: #8bf7fe;
      }
    }
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
}
</style>
