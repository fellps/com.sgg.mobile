import request, { loggedUser } from './index'
import qs from 'querystring'
import toFormData from '../helpers/toFormData'
import { Platform } from 'react-native';

export const login = async ({ Login, Password }) => request.post('/authenticate', qs.stringify({
    Login, Password
}))

export const register = async ({ Photos, Data }) => {
    const formData = toFormData(Data)

    Photos.forEach((photo) => {
        formData.append('files', {
            name: photo.filename,
            type: 'image/jpeg',
            uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '')
        })
    })
  
    return request.post(`/users`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
}

export const registerDocuments = async ({ Documents, Data }) => {
    const { token } = await loggedUser()

    const formData = toFormData(Data)

    Documents.forEach((document) => {
        formData.append('files', {
            name: document.filename,
            type: 'image/jpeg',
            uri: Platform.OS === 'android' ? document.uri : document.uri.replace('file://', '')
        })
    })
  
    return request.post(`/DocumentsUpdate`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': token
        }
    })
}

