import { createReducer } from 'redux-act'

import { get } from './actions'

import { fulfilled, pending, rejected } from '../../../helpers/reducerPromiseHelper'

const initialState = {
  events: {
    data: []
  }
}

export default createReducer({
  [fulfilled(get)]: (state, payload) => { 
    return {
    ...state,
    events: payload.data.data
    }
  }
}, { ...initialState })
