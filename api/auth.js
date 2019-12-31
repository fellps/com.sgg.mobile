import request from './index'
import qs from 'querystring'

export const login = async ({ Login, Password }) => request.post('/authenticate', qs.stringify({
    Login, Password
}))