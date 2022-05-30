import request from "@/utils/request";

// 封装一个获取联想词汇的接口
export const suggest = (params) => {

    return request ({
        url: '/v1_0/suggestion',
        params
    })
}


// 封装一个获取搜索结果的接口
export const resultList = (params) => {

    return request ({
        url: '/v1_0/search',
        params
    })
}