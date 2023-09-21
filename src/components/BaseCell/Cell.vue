<template>
  <div class="base-cell flex-start-center">
    <div class="lable hidden-text" :style="{ width: parentPropsData.titleWidth }">
      {{ title }}
    </div>
    <div>：</div>
    <div
      class="content"
      :style="{ width: `calc(100% - ${parentPropsData.titleWidth})` }"
    >
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCell',
  props: {
    title: {
      type: [String, Number],
      default: '单元格'
    },
    value: {
      type: [String, Number],
      default: '内容'
    }
  },
  data() {
    return {
      parentPropsData: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.$parent.$options._componentTag !== 'BaseCellGroup') {
        console.error('父组件必须是BaseCellGroup')
      } else {
        this.$parent.$options._propKeys.forEach(prop => {
          this.parentPropsData[prop] = this.$parent[prop]
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.base-cell {
  line-height: 1.875rem;
  align-items: flex-start;
  .lable {
    display: inline-block;
    text-align: justify;
    text-align-last: justify;
    color: #fff;
  }
}
</style>
