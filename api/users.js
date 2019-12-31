import request, { loggedUser } from './index'
import qs from 'querystring'

export const get = async ({ ...restParams } = {}) => {
  const { token } = await loggedUser()
  return request.get(`/profile`, {
    params: restParams,
    headers: { 'x-access-token': token }
  })
}

export const updatePushToken = async ({ PushToken }) => {
  const { token } = await loggedUser()
  return request.post('/updatepushtoken', qs.stringify({
    PushToken
  }), {
    headers: {
      'x-access-token': token
    }
  })
}