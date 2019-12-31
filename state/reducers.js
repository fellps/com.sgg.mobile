import { combineReducers } from 'redux'

import login from '../screens/reducers/login/reducer'
import home from '../screens/reducers/home/reducer'
import notifications from '../screens/reducers/notifications/reducer'
import users from '../screens/reducers/users/reducer'
import { reducer as isLoading } from '../helpers/reducerPromiseHelper'

export default combineReducers({
  login,
  home,
  notifications,
  users,
  isLoading
})
