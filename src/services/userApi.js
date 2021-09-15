import { $host } from '.'

export const userApi = {
  async sendUser(payload) {
    try {
      const {
        data: { data },
      } = await $host.get('', {
        params: {
          MethodName: 'OSSale',
          PaymentTypeId: 2,
          ...payload,
        },
      })
      if (!data?.[0]?.CERTNUMBER) {
        throw new Error()
      }
      return data
    } catch (error) {
      throw new Error('Ошибка при оформлении платежа')
    }
  },
}
