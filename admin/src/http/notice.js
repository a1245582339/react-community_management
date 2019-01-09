import http from './config'

export const getNotice = (params) => {
    return http.get('/notice', { params })
}

export const createNotice = (data) => {
    return http.post('/notice', {data})    
}

export const uploadImg = (img) => {
    var data = new FormData()
    data.append('file', img)
    return http.post('/notice/upload', data)    
}