import { createAction } from 'redux-act'

import * as Auth from '../../../api/auth'

export const set = createAction('SET_LOGIN')
export const login = createAction('LOGIN', Auth.login)
