import { createReducer } from 'redux-act'

import { get, getDetails } from './actions'

import { fulfilled, pending, rejected } from '../../../helpers/reducerPromiseHelper'

const initialState = {
  notifications: {
    data: []
  },

  notification: {}
}

export default createReducer({
  [fulfilled(get)]: (state, payload) => ({
    ...state,
    notifications: payload.data
  }),
  [fulfilled(getDetails)]: (state, payload) => ({
    ...state,
    notification: payload.data.data
  })
}, { ...initialState })
