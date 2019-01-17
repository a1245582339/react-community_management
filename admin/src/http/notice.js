import http from './config'

export const getNotice = (params) => {
    return http.get('/notice', { params })
}

export const updateNotice = (data, id) => {
    return http.post('/notice', {id, data})    
}

export const uploadImg = (img) => {
    var data = new FormData()
    data.append('file', img)
    return http.post('/notice/upload', data)    
}

export const getNoticeLog = async (params) => {
    const res = (await http.get('/notice/log', { params })).data.data
    const label = res.map(item => item.title)
    const data = res.map(item => {
        return {
            value: item.data.length,
            name: item.title
        }
    })
    return {label, data, totalData: res}
}