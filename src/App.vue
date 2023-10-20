<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  border-radius: 5px;
  background: #16296f;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #718dd2;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: var(--text-color-inverse);
  font-size: var(--font-size-base);
}
</style>
