<template>
  <div class="flex flex-col items-center h-screen text-black mt-20">
    <img src="@/images/not-found.png" alt="404" class="w-[750px] mb-10" />
    <p class="mb-10">很抱歉，您访问的页面不存在</p>
    <button
      class="bg-emerald-400 hover:bg-emerald-600 transition-all text-white px-5 py-2"
      @click="$router.push('/')"
    >
      返回首页
    </button>
  </div>
</template>

<script>
export default {
  name: 'NotAuth',
  methods: {}
}
</script>

<style scoped lang="less"></style>
