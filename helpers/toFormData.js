import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

export function isFile (input) {
  if ('File' in window && input instanceof window.File) return true
  return false
}

export default function toFormData (obj) {
  const formData = new window.FormData()

  for (const key in obj) {
    if (
      isArray(obj[key]) ||
      (isObject(obj[key]) && isFile(obj[key]) === false) ||
      obj[key] === void (0)
    ) continue

    formData.append(key, obj[key])
  }

  return formData
}
