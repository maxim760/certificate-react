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
      console.log(error.response)
      throw new Error(
        error?.response?.data?.resultdescription ||
          'Ошибка при получении сертификата',
      )
    }
  },
}
