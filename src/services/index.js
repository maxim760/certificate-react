import axios from 'axios'
import { WidgetData } from '../utils'

const $host = axios.create({
  baseURL: 'https://sycret.ru/service/api/api',
})

$host.interceptors.request.use((config) => {
  const apikey = WidgetData.getApiKey()
  if (config.method === 'post') {
    config.data = JSON.stringify({ ...JSON.parse(config.data), ApiKey: apikey })
  } else {
    config.params = { ...config.params, ApiKey: apikey }
  }
  console.log(config, 'AFTER')
  return config
})

export { $host }
