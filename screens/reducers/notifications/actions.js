import { createAction } from 'redux-act'

import * as Notifications from '../../../api/notifications'

export const set = createAction('SET_NOTIFICATION')
export const get = createAction('GET_NOTIFICATIONS', Notifications.get)
export const getDetails = createAction('GET_NOTIFICATION_DETAILS', Notifications.getDetails)
export const accept = createAction('GET_NOTIFICATION_ACCEPT', Notifications.accept)
export const getSchedule = createAction('GET_NOTIFICATION_SCHEDULE', Notifications.getSchedule)
