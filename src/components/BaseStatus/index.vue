<template>
  <section class="base-status">
    <!-- Normal Status -->
    <template v-if="status === 'normal'">
      <slot name="default"></slot>
    </template>

    <!-- Loading Status -->
    <template v-else-if="status === 'loading'">
      <slot name="loading">
        <dv-loading> Loading... </dv-loading>
      </slot>
    </template>

    <!-- Error Status -->
    <template v-else-if="status === 'error'">
      <slot name="error">
        <img class="null" src="./images/null.png" alt="null" />
      </slot>
    </template>

    <!-- Fallback for unexpected status -->
    <template v-else>
      <p>Unknown status.</p>
    </template>
  </section>
</template>

<script>
export default {
  name: 'BaseStatus',
  props: {
    status: {
      type: String,
      required: false,
      default: 'normal',
      validator(value) {
        return ['normal', 'loading', 'error'].includes(value)
      }
    }
  }
}
</script>

<style scoped lang="less">
.base-status {
  width: 100%;
  height: 100%;
  img.null {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
    object-fit: scale-down;
  }
}
</style>
