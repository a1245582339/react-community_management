import http from './config'
import {
    ajaxGet
} from '@/utiles/request'
export const getAdmin = async () => {
    const res = await ajaxGet('/admin')
    return res.map(item => {
        return {
            ...item,
            role_name: item.role === 1 ? '管理员' : '超级管理员',
            key: item.id
        }
    })
}

export const updateAdmin = (data, id) => {
    console.log(data, id)
    return http.post('/admin', {
        id: id,
        data: data
    })
}

export const getMe = () => {
    return ajaxGet('/info/admin')
}