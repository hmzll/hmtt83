import axios from 'axios'
// 导入store
import store from '@/store'

// 克隆出一个新的axios对象，并设置它的基地址
const request = axios.create({
    baseURL: 'http://geek.itheima.net/'
})

// 给request对象加请求拦截器
request.interceptors.request.use( config => {
    // 正常请求调用的
    // 如果token才添加到请求头
    if (store.state.tokenObj.token) {
        
        config.headers.Authorization = 'Bearer ' + store.state.tokenObj.token
    }

    return config 

}, err => {
    // 请求出错调用
    return Promise.reject(err)
} )

// 因为本项目只有一个接口服务器，也就是只有一个基地址
// 所以这里我们用默认导出
export default request