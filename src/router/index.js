import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// 导入组件
import login from '@/views/Login'

const routes = [
  // 毛都不输入重定向到login
  { path: '/', redirect: '/login' },
  { name: 'login', path: '/login', component: login }
]

const router = new VueRouter({
  routes
})

export default router
