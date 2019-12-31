import request, { loggedUser } from './index'
import qs from 'querystring'

export const get = async ({ ...restParams } = {}) => {
  const { token } = await loggedUser()
  return request.get(`/notifications/`, {
    params: restParams,
    headers: { 'x-access-token': token }
  })
}

export const getDetails = async ({ IdNotification, ...restParams } = {}) => {
  const { token } = await loggedUser()
  return request.get(`/notifications/${IdNotification}`, {
    params: restParams,
    headers: { 'x-access-token': token }
  })
}

export const accept = async ({ IdJob, Accepted } = {}) => {
  const { token } = await loggedUser()
  return request.post('/jobs/accept', qs.stringify({
    IdJob, Accepted
  }), {
    headers: {
      'x-access-token': token
    }
  })
}

export const getSchedule = async () => {
  const { token } = await loggedUser()
  return request.post('/jobs/schedule', {}, {
    headers: {
      'x-access-token': token
    }
  })
}