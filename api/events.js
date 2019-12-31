import request, { loggedUser } from './index'

export const get = async ({ limit, offset, ...restParams } = {}) => {
  const { token } = await loggedUser()
  return request.get(`/events/list/active?limit=${limit}&offset=${offset}`, {
    params: restParams,
    headers: { 'x-access-token': token }
  })
}