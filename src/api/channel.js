import request from "@/utils/request"

// 封装一个获取用户频道的接口
export const ownChannels = () => {
    
    return request({
        url: '/v1_0/user/channels'
    })
}


// 封装一个获取所有频道的接口
export const allChannels = () => {
    
    return request({
        url: '/v1_0/channels'
    })
}


// 封装一个重置频道的接口（既可以新增，也可以删除）
export const resetChannel = (data) => {
    
    return request({
        url: '/v1_0/user/channels',
        method: 'put',
        data
    })
}