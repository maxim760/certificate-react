import axios from 'axios'
const API_KEY = process.env.REACT_APP_API_KEY

const $host = axios.create({
  baseURL: 'https://sycret.ru/service/api/api',
})

$host.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    ApiKey: API_KEY,
  }
  return config
})

export { $host }
