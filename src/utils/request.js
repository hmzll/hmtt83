import axios from 'axios'
// 导入store
import store from '@/store'

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

        // 利用refresh_token去刷新一个新的token
        let res = await axios({
            url: 'http://geek.itheima.net/v1_0/authorizations',
            method: 'put',
            headers: {
                Authorization: 'Bearer ' + store.state.tokenObj.refresh_token
            }
        })

        // 注意：服务器返回的新token只有token，你不能直接把token赋值给vuex
        // 不然会导致覆盖让refresh_token丢失，所以应该传递要给对象，对象里有token属性，
        // 属性值就是刷新到的token，还要有refresh_token，属性值就是原本的refresh_token
        store.commit('changeToken', {
            token: res.data.data.token,
            refresh_token: store.state.tokenObj.refresh_token
        })
    }
})

// 因为本项目只有一个接口服务器，也就是只有一个基地址
// 所以这里我们用默认导出
export default request