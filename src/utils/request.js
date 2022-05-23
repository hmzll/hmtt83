import axios from 'axios'
// 导入store
import store from '@/store'
// 导入router
import router from '@/router'
// 导入Toast
import { Toast } from 'vant'

// 克隆出一个新的axios对象，并设置它的基地址
const request = axios.create({
    baseURL: 'http://geek.itheima.net/'
})

// 给request对象加请求拦截器
request.interceptors.request.use(config => {
    // 正常请求调用的
    // 如果token才添加到请求头
    if (store.state.tokenObj.token) {

        config.headers.Authorization = 'Bearer ' + store.state.tokenObj.token
    }

    return config

}, err => {
    // 请求出错调用
    return Promise.reject(err)
})

// 给request对象加响应拦截器
request.interceptors.response.use(data => {
    return data

}, async err => {

    // 如果是401才去刷新token
    if (err.response.status == 401) {
        try {
            // 利用refresh_token去刷新一个新的token
            let res = await axios({
                url: 'http://geek.itheima.net/v1_0/authorizations',
                method: 'put',
                headers: {
                    Authorization: 'Bearer ' + store.state.tokenObj.refresh_token
                }
            })

            // 注意：服务器返回的新token只有token，你不能直接把token赋值给vuex
            // 不然会导致覆盖让refresh_token丢失，所以应该传递一个对象，对象里有token属性，
            // 属性值就是刷新到的token，还要有refresh_token，属性值就是原本的refresh_token
            store.commit('changeToken', {
                token: res.data.data.token,
                refresh_token: store.state.tokenObj.refresh_token
            })

            // 之前的请求存在哪？err.config里
            // 我们拿到新token后就要把之前没完成的请求再发一次
            // 只不过要携带最新token
            // 可是我们不用改，因为我们只要用request这个对象发请求
            // 它又会触发请求拦截，请求拦截会自动把vuex里最新的token加上去
            // 所以这里不用改，直接把该发的请求再发一次就实现了
            return request(err.config)
        } catch {

            // 只能证明refresh_token也出问题了
            // 那就跳转到登录页，让它重新登录
            Toast.fail('登录状态已失效，请重新登录')
            router.push('/login')

            // 下面这句话只是为了控制台少打印一些报错
            // 但其实也没有意义，加不加对项目都没有影响
            // 原因：mine页面发请求，如果你bureturn，它拿到的就是undefined
            // 然后undefined.data.data要报错，为了它不报错，就返回一个对象，对象里有data.data
            return { data: { data: {} } }
        }
    }
})

// 因为本项目只有一个接口服务器，也就是只有一个基地址
// 所以这里我们用默认导出
export default request