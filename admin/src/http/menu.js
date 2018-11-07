import http from './config'

export const getMenu = () => {
    return http.get('/menu')
}