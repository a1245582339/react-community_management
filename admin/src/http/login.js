import http from './config'
export const login = (data) => {
    return http.post('/login/admin', data)
}