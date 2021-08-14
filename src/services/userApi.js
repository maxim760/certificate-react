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
          UseDelivery: 0,
          ...payload,
        },
      })
      if (!data?.[0]?.CERTNUMBER) {
        throw new Error()
      }
      return data
    } catch (error) {
      console.log('in getAll, error:', error)
      throw new Error('Ошибка при оформлении платежа')
    }
  },
}
