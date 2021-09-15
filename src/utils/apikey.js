import { parseQueryParams } from './parseQueryParams'

const getApiKey = () => {
  return (
    parseQueryParams(window.location.href).apikey ||
    window.localStorage.getItem('apikey')
  )
}

const setApiKey = (apikey) => {
  window.localStorage.setItem('apikey', apikey)
}

export const ApiKey = {
  get: getApiKey,
  set: setApiKey,
}
