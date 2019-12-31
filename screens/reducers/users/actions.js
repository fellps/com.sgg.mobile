import { createAction } from 'redux-act'

import * as Users from '../../../api/users'

export const set = createAction('SET_USER')
export const get = createAction('GET_USERS', Users.get)