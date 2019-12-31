import { createReducer } from 'redux-act'

import { get } from './actions'

import { fulfilled } from '../../../helpers/reducerPromiseHelper'

const initialState = {
  user: {}
}

export default createReducer({
  [fulfilled(get)]: (state, payload) => ({
    ...state,
    user: payload.data
  })
}, { ...initialState })
