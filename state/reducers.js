import { combineReducers } from 'redux'

import login from '../screens/reducers/login/reducer'
import register from '../screens/reducers/register/reducer'
import uploadDocuments from '../screens/reducers/uploadDocuments/reducer'
import home from '../screens/reducers/home/reducer'
import notifications from '../screens/reducers/notifications/reducer'
import users from '../screens/reducers/users/reducer'
import recoverPassword from '../screens/reducers/recoverPassword/reducer'
import { reducer as isLoading } from '../helpers/reducerPromiseHelper'

export default combineReducers({
  login,
  register,
  uploadDocuments,
  home,
  notifications,
  users,
  recoverPassword,
  isLoading
})
