// 导入请求对象
import request from '@/utils/request'

// 封装一个获取文章列表的接口
export const articleList = (params) => {

    return request({
        url: '/v1_0/articles',
        params
    })
}