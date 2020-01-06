import { createAction } from 'redux-act'

import * as Auth from '../../../api/auth'

export const set = createAction('SET_RECOVER_PASSWORD')
export const recoverPassword = createAction('RECOVER_PASSWORD', Auth.login)
