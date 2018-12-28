import http from './config'
import { timestampToDate } from '@/utiles/time'
const communityStatus = ['未审核', '已审核', '已注销']
export const getCommunity = async (params) => {
    const dept = (await getDept()).data.data
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

export const getDept = () => {
    return http.get('/dept')
}