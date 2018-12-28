import axios from 'axios'
import { getToken } from '@/utiles/js-cookie';

const http = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000
})

// request拦截器
http.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers.Authorization = getToken()
        }
        return config
    },
    error => {
        return error
    }
)
  
// respone拦截器
http.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return error
    }
)

export default http