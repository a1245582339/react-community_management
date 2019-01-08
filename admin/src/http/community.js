import http from './config'
import { timestampToDate } from '@/utiles/time'
import { ajaxGet } from '@/utiles/request'

const communityStatus = ['未审核', '已审核', '已注销']

export const getCommunity = async (params) => {
    const dept = (await getDept())
    const res = await http.get('/community', { params })
    const data = res.data.data.map((item, index) => {
        return {
            ...item,
            key: index,
            belong_dept_name: dept.find(i => i.id === item.belong_dept).dept_name,
            manage_dept_name: dept.find(i => i.id === item.manage_dept).dept_name,
            create_time: timestampToDate(item.create_time),
            status_text: communityStatus[item.status]
        }
    })
    return {data, count: res.data.count}
}

export const getDept = async () => {
    return ajaxGet('/dept')
}

export const getType = async () => {
    return ajaxGet('/community/type')
}

export const getStu = async (stu_id) => {
    const stu_list = (await http.get('/student', { 
        params: {
            stu_id
        } 
    })).data.data
    return stu_list.map(item => {
        return { 
            text: `${item.stu_name}(${item.stu_id})`,
            value: item.stu_id
        }
    })
}

export const postCommunity = (id, data) => {
    return http.post('/community', { id, data })
}

export const getMemeber = (community_id) => {
    return ajaxGet('/community/student', {community_id})
}

export const removeMemeber = (id) => {
    return http.post('/community/student', {
        id,
        data: {
            isDel: 1
        }
    })
}