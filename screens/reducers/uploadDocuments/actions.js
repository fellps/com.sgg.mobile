import { createAction } from 'redux-act'

import * as Auth from '../../../api/auth'

export const set = createAction('SET_UPLOAD_DOCUMENTS')
export const registerDocuments = createAction('UPLOAD_DOCUMENTS_REGISTER', Auth.registerDocuments)