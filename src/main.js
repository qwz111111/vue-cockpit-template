import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import echarts from './utils/echarts'
import router from './router'
import bus from '@/utils/bus'
import './utils/rem.js'
import './style/index.css'
import {
  borderBox11,
  scrollBoard,
  scrollRankingBoard,
  loading
} from '@jiaminghi/data-view'
import {
  Carousel,
  CarouselItem,
  Image,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui'
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$bus = bus
Vue.use(VueRouter)
Vue.use(borderBox11).use(scrollBoard).use(scrollRankingBoard).use(loading)
Vue.use(Carousel)
  .use(CarouselItem)
  .use(Image)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
