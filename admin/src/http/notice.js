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