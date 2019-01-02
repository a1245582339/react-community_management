import http from '@/http/config'

export const ajaxGet = async (url, params) => {
    // 简单的get请求，不涉及处理数据
    const res = await http.get(url, { params })
    const data = res.data.data
    return data
}