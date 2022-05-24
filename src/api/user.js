// 导入设置了基地址的请求对象
import request from '@/utils/request'

// 封装一个用户登录的接口
export const login = (data) => {

    return request({
        // 不能有空格
        url: '/v1_0/authorizations',
        method: 'post',
        data
    })
}


// 封装一个获取用户信息的接口
export const userInfo = () => {

    return request({
        // 不能有空格
        url: '/v1_0/user/profile'
    })
}


// 封装一个修改用户信息的接口
export const editUserInfo = (data) => {

    return request({
        // 不能有空格
        url: '/v1_0/user/profile',
        method: 'patch',
        data
    })
}