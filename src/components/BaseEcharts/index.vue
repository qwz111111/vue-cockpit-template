<template>
  <div ref="baseEcharts" class="main-box base-echarts" @click="onClick"></div>
</template>
<script>
export default {
  name: 'BaseEcharts',
  props: {
    option: {
      type: Object,
      required: false,
      default: () => {}
    },
    autoTip: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      animation: true
    }
  },
  mounted() {
    window.addEventListener('resize', () => this.resizeCharts())
    this.initEcharts()
  },
  beforeDestroy() {
    if (this.mTime) clearInterval(this.mTime)
    window.removeEventListener('resize', this.resizeCharts())
  },
  watch: {
    option: {
      handler() {
        this.initEcharts()
      },
      immediate: false,
      deep: true
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
    initEcharts() {
      if (!this.option || JSON.stringify(this.option) === '{}') return

      if (this.myCharts) this.myCharts.dispose()
      this.myCharts = this.$echarts.init(this.$refs.baseEcharts)
      this.myCharts.setOption(this.option)
      this.myCharts.on('click', e => this.$emit('click-echarts', e))
      this.myCharts.on('mousemove', e => {
        this.animation = false
        this.$emit('mousemove-echarts', e)
      })
      this.myCharts.on('globalout', e => {
        this.animation = true
        this.$emit('globalout-echarts', e)
      })
      this.autoShowTip()
    },

    resizeCharts() {
      if (this.myCharts) this.myCharts.resize()
    },

    /* 自动循环显示提示 */
    autoShowTip() {
      if (!this.autoTip) return
      let length = 0
      if (Array.isArray(this.option.series)) {
        length = this.option.series[0].data.length
      } else {
        length = this.option.series.data.length
      }
      if (this.mTime) clearInterval(this.mTime)
      const autoplay = () => {
        let index = 0 //播放所在下标
        if (!this.animation) {
            return
          }
        this.mTime = setInterval(() => {
          this.myCharts.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index
          })
          index++
          if (index >= length) index = 0
        }, Math.round(Math.random() * 3000 + 3000))
      }
      autoplay()
    }
  }
}
</script>
