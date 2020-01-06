import { createAction } from 'redux-act'

import * as Auth from '../../../api/auth'

export const set = createAction('SET_REGISTER')
export const register = createAction('REGISTER', Auth.register)
