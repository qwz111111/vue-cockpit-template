<template>
  <div
    :class="[
      'base-border',
      'main-box',
      { 'slide-in-left': animista && slide === 'left' },
      { 'slide-in-right': animista && slide === 'right' }
    ]"
    :style="{ 'animation-delay': animationDelay + 'ms' }"
  >
    <div class="header flex-between-center">
      <div>
        <template v-if="typeof title === 'string'">
          <span class="title transition-300" @click="$emit('change-title')">{{
            title
          }}</span>
        </template>
        <template v-else>
          <span
            v-for="(item, index) in title"
            :key="index"
            :class="[
              'title',
              'transition-300',
              { subtitle: index !== titleIndex }
            ]"
            @click="onTitle(item, index)"
          >
            {{ item }}</span
          >
        </template>
      </div>
      <div v-if="$slots.hint" class="hint"><slot name="hint" /></div>
      <div v-else class="options flex-end-center">
        <div
          v-for="(item, index) in options"
          :key="index"
          :class="[
            'item',
            'flex-center',
            'transition-300',
            'hidden-text',
            { 'item-active': index === optionsIndex }
          ]"
          @click="onClick(item, index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="centent">
      <slot>
        <img
          class="horizontally-vertically-center none-img"
          src="./images/kfz.png"
          alt="开发中"
        />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseBorder',
  props: {
    title: {
      type: [String, Array],
      required: false,
      default: ''
    },
    options: {
      type: Array,
      required: false,
      default: () => []
    },
    animista: {
      type: Boolean,
      required: false,
      default: true
    },
    slide: {
      type: String,
      required: false,
      default: ''
    },
    animationDelay: {
      type: String,
      required: false,
      default: '0'
    }
  },
  data() {
    return {
      optionsIndex: 0,
      titleIndex: 0
    }
  },
  watch: {
    optionsIndex: {
      handler(newVal) {
        if (this.options.length === 0) return
        this.$emit('change', { target: this.options[newVal], index: newVal })
      },
      immediate: false
    },
    titleIndex: {
      handler(newVal) {
        this.$emit('change-title', {
          target: this.title[newVal],
          index: newVal
        })
      },
      immediate: false
    }
  },
  methods: {
    onClick(target, index) {
      this.$emit('click-option', { target: target })
      this.optionsIndex = index
    },
    onTitle(target, index) {
      this.titleIndex = index
    }
  }
}
</script>

<style scoped lang="less">
.base-border {
  position: relative;
  box-sizing: border-box;
  .header {
    background: url(./images/border1.png) left top no-repeat;
    background-size: 100% 106%;
    height: 5vh;
    padding-left: 2.5rem;
    .title,
    .subtitle {
      font-size: var(--font-size-xl);
      color: var(--text-color-inverse);
      font-weight: 700;
      margin-right: 1.25rem;
    }
    .subtitle {
      font-size: var(--text-color-base);
      color: rgba(156, 238, 247, 0.7);
    }
    .options {
      font-size: var(--font-size-base);
      color: var(--text-color-inverse);
      margin-right: 0.8vw;
      .item {
        margin-left: 0.625rem;
        padding: 0 0.375rem;
        height: 1.25rem;
        background-position: center bottom;
      }
      .item:hover,
      .item-active {
        font-weight: 600;
        background: url(./images/xz.png) center bottom no-repeat;
        background-size: 100% 0.3125rem;
      }
    }
    .hint {
      margin-right: 0.8vw;
    }
  }
  .centent {
    background: url(./images/border2.png) left top no-repeat;
    background-size: 100% calc(100% - 3.125rem + 0vh + 0.8vh);
    padding: 0vh 1vh 0.8vh;
    height: calc(100% - 5vh - 0vh - 0.8vh);
    box-sizing: border-box;
    // overflow: hidden;
    overflow: visible;
    .none-img {
      height: 100%;
    }
  }
  .centent::after {
    content: ' ';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3.125rem;
    background: url(./images/border3.png) left bottom no-repeat;
    background-size: 100% 100%;
    z-index: -1;
  }
}
</style>
