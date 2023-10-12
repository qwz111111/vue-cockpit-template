<template>
  <div class="base-search" @keydown="onKeydown">
    <el-input
      :placeholder="placeholder"
      :value="value"
      @input="v => $emit('input', v)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    >
      <template #append>
        <slot>
          <el-button
            icon="el-icon-search"
            @click="$emit('search', value)"
          ></el-button>
        </slot>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'BaseSearch',
  props: {
    placeholder: {
      type: String,
      required: false,
      default: '请输入关键字'
    },
    value: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    onKeydown(e) {
      if (e.key === 'Enter') {
        this.$emit('search', this.value)
      }
      this.$emit('keydown', e)
    }
  }
}
</script>
<style lang="less" scoped>
@search_bg_color: rgba(17, 56, 104, 0.6);
@search_color: #0c6edc;
@search_focus: #3388ff;

:deep(.el-input__inner) {
  background-color: @search_bg_color;
  border: 1px solid @search_color;
  transition: all 0.3s;
  font-size: 14px;
  color: #fff;
}
:deep(.el-input__inner:focus) {
  border: 1px solid @search_focus;
}
:deep(.el-input__inner::placeholder) {
  color: #4693d5;
}
:deep(.el-input-group__append),
:deep(.el-input-group__prepend) {
  background-color: #113868;
  border: 1px solid @search_color;
  color: #fff;
}
:deep(.el-input-group__append) {
  border-left: none;
}
:deep(.el-input-group__prepend) {
  border-right: none;
}

:deep(.el-button) {
  padding: 12px 12px;
}
</style>
