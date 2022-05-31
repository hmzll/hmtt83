import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import store from '@/store'
import { Toast } from 'vant'


// 导入组件
import login from '@/views/Login'
import layout from '@/views/Layout'
import home from '@/views/Home'
import ask from '@/views/Ask'
import video from '@/views/Video'
import mine from '@/views/Mine'
import edit from '@/views/Mine/edit.vue'
import article from '@/views/Article'
import search from '@/views/Search'
import result from '@/views/Search/result.vue'

const routes = [
  // 毛都不输入重定向到login
  { path: '/', redirect: '/layout/home' },
  { name: 'login', path: '/login', component: login },
  { name: 'edit', path: '/mine/edit', component: edit },
  { name: 'article', path: '/article', component: article },
  { name: 'search', path: '/search', component: search },
  { name: 'result', path: '/search/result', component: result },
  {
    name: 'layout',
    path: '/layout',
    component: layout,
    children: [
      { 
        name: 'home', 
        path: 'home', 
        component: home,
        meta: {
          keepAlive: true
        }
      },
      { name: 'ask', path: 'ask', component: ask },
      { name: 'video', path: 'video', component: video },
      { 
        name: 'mine', 
        path: 'mine', 
        component: mine, 
        meta: {
          needLogin: true
        } 
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

// 全局前置守卫
router.beforeEach( (to, from, next) => {

  if (to.meta.needLogin) {

    // 代表去的是要登录的页面
    if (store.state.tokenObj.token) {

      next()

    }else {
      Toast.fail('请先登录')
      // 没有登录
      next({
        name: 'login',
        query: {
          back: to.path // 记录原本要去的页面路径
        }
      })
    }
  }else {
    // 代表去的是不需要登录就能访问的页面
    next()
  }
} )


// 解决3.1版本后在控制台出现的警告
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
