<template>
  <div
    :class="[
      'base-tabs',
      'flex-center',
      {
        card: type === 'card',
        division: type === 'division'
      }
    ]"
  >
    <div
      v-for="(item, index) in tabs"
      :key="index"
      :class="[{ active: index === value }, 'item', 'flex-center']"
      @click="onClick(item, index)"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTabs',
  props: {
    value: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'card',
      validator: val => {
        const legalValue = ['card', 'division']
        if (legalValue.indexOf(val) !== -1) {
          return true
        } else {
          throw new Error(`值只能是${legalValue.join('|')}`)
        }
      }
    },
    tabs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onClick(item, index) {
      this.$emit('input', index)
      this.$emit('tab-click', { target: item, index: index })
    }
  }
}
</script>
<style scoped lang="less">
.base-tabs {
  position: relative;
  width: fit-content;
}
.division {
  .item {
    color: rgba(255, 255, 255, 0.85);
    min-width: 0.82rem;
    min-height: 0.3rem;
    cursor: pointer;
    font-size: var(--font-size-sm);
    background-image: url(./images/change.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    margin-right: 0.1rem;
    &:last-child {
      margin-right: 0;
    }
  }
  .item:hover,
  .active {
    background-image: url(./images/change1.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
}
.card {
  background-color: rgba(4, 33, 99, 0.4);
  border: 1px solid #03edfc;
  > .item {
    border-right: 1px solid #03edfc;
    font-weight: bold;
    padding: 0.03rem 0.1rem;
    min-width: 0.4rem;
    cursor: pointer;
    transition: all 0.2s;
    font-size: var(--font-size-sm);
    &:last-child {
      border-right: none;
    }
  }
  > .item:hover,
  .active {
    color: #66abe6;
  }
}
</style>
