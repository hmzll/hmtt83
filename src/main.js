import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局样式
import './styles/base.less'

// 导入vant
import './utils/vant'
// 导入flexible
import 'amfe-flexible'

// 导入dayjs
import dayjs from 'dayjs'
// 导入相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入语言包
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
// 应用相对时间的插件
dayjs.extend(relativeTime)
// 弄一个全局过滤器来处理时间
Vue.filter('relvTime', (val) => {

  return dayjs(val).fromNow()
})

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
