import axios from 'axios'

import config from '../config'

import { AsyncStorage } from 'react-native'

export const loggedUser = async () => {
  const loggedUserCookie = await AsyncStorage.getItem('loggedUser')
  return JSON.parse(loggedUserCookie)
}

export default axios.create({
  baseURL: config.apiUrl,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})
