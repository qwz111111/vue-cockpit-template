<template>
  <div class="base-scroll-board main-box">
    <dv-scroll-board
      ref="scrollBoard"
      :config="config"
      :key="key"
      @click="$emit('click', ...arguments)"
    />
  </div>
</template>

<script>
import { nowSize } from '@/utils/common'

export default {
  name: 'BaseScrollBoard',
  props: {
    option: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      config: {},
      key: 0
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
      const update = () => {
        /* 默认居中 */
        const centerAlign = () => {
          if (this.config.data.length === 0) return
          return [
            ...this.config.data[0].map(() => 'center'),
            ...this.config.data[0].map(() => 'center')
          ]
        }
        /* 默认居中 */
        const autoWidth = () => {
          if (!this.config.columnWidth) return false
          return this.config.columnWidth.map(el => nowSize(el))
        }
        this.config = {
          header: this.config.header || [],
          data: this.config.data || [],
          rowNum: this.config.rowNum || 5,
          headerBGC: this.config.headerBGC || 'rgba(6, 42, 116,0.6)',
          oddRowBGC: this.config.oddRowBGC || 'rgba(2, 51, 144, 0.6)',
          evenRowBGC: this.config.evenRowBGC || 'rgba(2, 51, 144, 0.1)',
          waitTime: this.config.waitTime || 2000,
          headerHeight: this.config.headerHeight || nowSize(35),
          columnWidth: autoWidth() || [],
          align: this.config.align || centerAlign(),
          index: this.config.index || false,
          indexHeader: this.config.indexHeader || '编号',
          carousel: this.config.carousel || 'single', //'single'|'page'
          hoverPause: this.config.hoverPause || true
        }
      }
      /* 弹窗更新 */
      this.$nextTick(() => {
        update()
        this.key++
      })
    }
  }
}
</script>

<style lang="less" scoped>
.base-scroll-board {
  :deep(.dv-scroll-board .rows .row-item) {
    font-size: var(--font-size-sm);
    cursor: pointer;
  }
  :deep(.dv-scroll-board .header) {
    font-size: var(--font-size-base);
  }
}
</style>
