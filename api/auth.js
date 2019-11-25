import request from './index'

export const login = async ({ email, password }) => request.post('/auth/login', {
    email, password
})
