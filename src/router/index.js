import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// 导入组件
import login from '@/views/Login'
import layout from '@/views/Layout'
import home from '@/views/Home'
import ask from '@/views/Ask'
import video from '@/views/Video'
import mine from '@/views/Mine'

const routes = [
  // 毛都不输入重定向到login
  { path: '/', redirect: '/login' },
  { name: 'login', path: '/login', component: login },
  {
    name: 'layout',
    path: '/layout',
    component: layout,
    children: [
      { name: 'home', path: 'home', component: home },
      { name: 'ask', path: 'ask', component: ask },
      { name: 'video', path: 'video', component: video },
      { name: 'mine', path: 'mine', component: mine },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
