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
  DropdownItem,
  Input,
  Button,
  Form,
  FormItem,
  Option,
  Select,
  OptionGroup,
  Pagination,
  Card,
  Table,
  TableColumn,
  DatePicker,
  TimePicker,
  Loading,
  Slider,
  Switch,
  Checkbox,
  CheckboxGroup
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
  .use(Input)
  .use(Button)
  .use(Form)
  .use(FormItem)
  .use(Option)
  .use(Select)
  .use(OptionGroup)
  .use(Pagination)
  .use(Card)
  .use(Table)
  .use(TableColumn)
  .use(DatePicker)
  .use(TimePicker)
  .use(Loading)
  .use(Slider)
  .use(Switch)
  .use(Checkbox)
  .use(CheckboxGroup)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
