<template>
  <div class="base-dropdown">
    <el-dropdown
      :trigger="trigger"
      @command="handleCommand"
      @visible-change="visibleChange"
    >
      <span class="el-dropdown-link">
        {{ value || options[0] }}
        <i
          class="el-icon-arrow-right el-icon--right"
          :style="{
            transform: visible ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'all 0.3s'
          }"
        ></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in options" :key="item" :command="item">
          {{ item }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'BaseDropdown',
  props: {
    value: {
      type: [String, Number],
      required: false
    },
    options: {
      type: Array,
      required: false,
      default: () => []
    },
    trigger: {
      type: String,
      required: false,
      default: 'click'
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleCommand(event) {
      this.$emit('input', event)
      this.$emit('click-dropdown', {
        target: event
      })
    },
    visibleChange(event) {
      this.visible = event
    }
  }
}
</script>

<style scoped lang="less">
.el-dropdown {
  color: #fff;
  font-size: var(--font-size-sm);
  background: rgba(4, 37, 116, 0.5);
  border: 1px solid #04519a;
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius-base);
  cursor: pointer;
}
.el-dropdown-menu {
  background: rgba(4, 37, 116, 0.85);
  border-radius: var(--border-radius-base);
  font-size: var(--font-size-base);
  border: 1px solid #04519a;
  .el-dropdown-menu__item {
    color: #fff;
    &:hover {
      background-color: #3077b1;
    }
  }
}
</style>
