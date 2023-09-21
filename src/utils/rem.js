//响应式页面,无限适配
(function () {
  function resize() {
    const html = document.documentElement
    const width = html.clientWidth
    html.style.fontSize = `${width / 19.2 / 6.25}px`
  }
  window.addEventListener('resize', resize)
  resize()
})()
