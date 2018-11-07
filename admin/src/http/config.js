import axios from 'axios'

const http = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000
})

// request拦截器`
http.interceptors.request.use(
    config => {
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