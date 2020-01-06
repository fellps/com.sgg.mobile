import { createReducer } from 'redux-act'

import {
  set,
  register
} from './actions'

import { rejected, pending } from '../../../helpers/reducerPromiseHelper'

const initialState = {
  data: {},
  response: {
    status: null
  }
}

export default createReducer({
  [set]: (state, payload) => {
    return ({
      ...state,
      data: { ...state.data, ...payload }
    })
  },

  [pending(register)]: state => ({
    ...state,
    response: { ...state.response, status: 'pending' }
  }),

  [rejected(register)]: (state, payload) => ({
    ...state,
    response: payload.response.data
  })
}, { ...initialState })
