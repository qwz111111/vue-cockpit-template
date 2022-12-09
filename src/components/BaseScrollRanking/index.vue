<template>
  <div class="base-scroll-ranking main-box" @click="$emit('click')">
    <dv-scroll-ranking-board ref="scrollRanking" :config="config" />
  </div>
</template>

<script>
export default {
  name: 'BaseScrollRanking',
  props: {
    option: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      config: {}
    }
  },
  watch: {
    option: {
      handler() {
        this.init()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    init() {
      if (!this.option) return
      if (JSON.stringify(this.option) === '{}') return
      this.config = this.option
      this.config = {
        data: this.config.data || [],
        rowNum: this.config.rowNum || 5,
        waitTime: this.config.waitTime || 2000,
        carousel: this.config.carousel || 'single',
        unit: this.config.unit || '',
        sort: this.config.sort || true,
        valueFormatter: this.config.valueFormatter || undefined
      }
    }
  }
}
</script>

<style lang="less" scoped>
.base-scroll-ranking {
  :deep(.dv-scroll-ranking-board .ranking-info) {
    font-size: var(--font-size-sm);
  }
}
</style>
