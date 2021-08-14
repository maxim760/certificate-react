import { $host } from '.'
import { normalizeCertificates } from '../utils/normalizeCertificates'

export const certificateApi = {
  async getAll() {
    try {
      const { data } = await $host.get('', {
        params: { MethodName: 'OSGetGoodList' },
      })
      return normalizeCertificates(data.data)
    } catch (error) {
      throw new Error('Ошибка при получении сертификатов')
    }
  },
}
