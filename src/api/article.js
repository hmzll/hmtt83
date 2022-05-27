// 导入请求对象
import request from '@/utils/request'

// 封装一个获取文章列表的接口
export const articleList = (params) => {

    return request({
        url: '/v1_0/articles',
        params
    })
}


// 封装一个获取文章详情的接口
export const articleDetail = (id) => {

    return request({
        url: `/v1_0/articles/${id}`,
    })
}