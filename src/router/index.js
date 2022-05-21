import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// 导入组件
import login from '@/views/Login'
import layout from '@/views/Layout'

const routes = [
  // 毛都不输入重定向到login
  { path: '/', redirect: '/login' },
  { name: 'login', path: '/login', component: login },
  { name: 'layout', path: '/layout', component: layout },
]

const router = new VueRouter({
  routes
})

export default router
