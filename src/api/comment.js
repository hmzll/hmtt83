import request from '@/utils/request'

// 封装一个获取评论或者获取回复的接口
export const getCmtList = (params) => {

    return request({
        url: '/v1_0/comments',
        params
    })
}

// 封装一个发表评论或者发表回复的接口
export const sendCmt = (data) => {

    return request({
        url: '/v1_0/comments',
        method: 'post',
        data
    })
}