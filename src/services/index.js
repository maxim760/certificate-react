import axios from 'axios'
import { ApiKey } from '../utils'

const $host = axios.create({
  baseURL: 'https://sycret.ru/service/api/api',
})

$host.interceptors.request.use((config) => {
  const apikey = ApiKey.get()
  if (config.method === 'post') {
    config.data = JSON.stringify({ ...JSON.parse(config.data), ApiKey: apikey })
  } else {
    config.params = { ...config.params, ApiKey: apikey }
  }
  return config
})

export { $host }
