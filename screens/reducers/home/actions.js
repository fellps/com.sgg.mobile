import { createAction } from 'redux-act'

import * as Events from '../../../api/events'
import * as Users from '../../../api/users'

export const set = createAction('SET_HOME')
export const get = createAction('GET_EVENTS', Events.get)
export const updatePushToken = createAction('UPDATE_PUSH_TOKEN', Users.updatePushToken)
