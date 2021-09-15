import { parseQueryParams } from './parseQueryParams'

const getFromStorage = (key) => {
  const data = window.sessionStorage.getItem(key)
  if (!data) {
    return null
  }
  return JSON.parse(data)
}

const setToStorage = (key, data) => {
  window.sessionStorage.setItem(key, JSON.stringify(data))
}
const getWidgetData = () => {
  const data =
    parseQueryParams(window.location.href) || getFromStorage('widget')
  return data
}

const setWidgetData = (data = {}) => {
  setToStorage('widget', data)
}

const saveWidgetData = () => {
  const data = getWidgetData()
  setWidgetData(data)
}

export const WidgetData = {
  set: setWidgetData,
  getAll: getWidgetData,
  getApiKey() {
    return getWidgetData()?.apikey
  },
  getPhotoUrl() {
    return getWidgetData()?.url
  },
  getBlur() {
    return getWidgetData()?.blur
  },
  save: saveWidgetData,
}
