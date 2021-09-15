import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import NumberFormat from 'react-number-format'
import { Card, Button, Loader, Input, Checkbox } from '../../components'
import { normalizeUser } from '../../utils'
import { useAsync } from '../../hooks'
import { useAppContext } from '../../contexts/AppContext'
import { userApi } from '../../services/userApi'
import SuggestAddress from './SuggestAddress'
import styles from './form.module.scss'
import { useRedirectsFromForm } from './useRedirectsFromForm'
import { getSumma } from '../../utils/getSumma'
import { fiscalization } from '../../robokassa'
import { request } from '../../services/request'

const schema = yup.object().shape({
  name: yup.string().required('Имя должно быть заполнено'),
  email: yup
    .string()
    .required('Почта должна быть заполнена')
    .email('Вы ввели некорректную почту'),
  phone: yup
    .string()
    .required('Телефон должен быть заполнен')
    .test('phone correctly', 'Вы ввели некорректный телефон', (value) => {
      return value.length === 10 // (999) 999 99-99
    }),
  withDelivery: yup.boolean(),
  address: yup
    .string()
    .nullable()
    .when('withDelivery', (withDelivery, schema) => {
      return schema.test({
        test: (value) => {
          if (!withDelivery) {
            return true
          }
          return !!value
        },
        message: 'Адрес доставки должен быть указан',
      })
    }),
})

export const ContactsForm = () => {
  const { certificate, setUser, delivery, clientId, robokassa } =
    useAppContext()
  const { refetch, status, data } = useAsync({ fn: userApi.sendUser })
  const { goBack } = useRedirectsFromForm({ data, certificate })
  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
    watch,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      phone: '',
      email: '',
      name: '',
      withDelivery: false,
      address: '',
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const withDelivery = !!watch('withDelivery')
  const onPhoneChange = (onChange) => (v) => {
    alert('change: ' + JSON.stringify(v))
    onChange(v.value)
  }
  const onPastePhone = (onChange) => (event) => {
    alert('paste')
    const paste = event.clipboardData.getData('text').replace(/[^\d\+]/g, '')
    const starts = [
      { prefix: '+7', remove: 2 },
      { prefix: '89', remove: 1 },
      { prefix: '88', remove: 1 },
    ]
    const start = starts.find((start) => paste.startsWith(start.prefix))
    if (!start) {
      return
    }
    const phoneNum = paste.substring(start.remove)
    event.preventDefault()
    onChange(phoneNum)
  }
  const onQueryChange = (onChange) => (v) => onChange(v.value)

  const onSubmitForm = (userData) => {
    setIsLoading(true)
    const user = normalizeUser(userData)
    const { Id, TableName, PrimaryKey, Price, Summa, Name } = certificate
    setUser(user)
    const summa = getSumma(delivery, Price, user.DeliveryAddress)
    request('OSCreatePreOrder', {
      CRMClientId: clientId,
      IsTestMode: robokassa.ROBOISTEST,
      ItemId: Id,
      ItemName: Name,
      TableName,
      PrimaryKey,
      Price,
      Summa: summa,
      FName: user.FullName,
      Phone: user.Phone,
      Email: user.Email,
      UseDelivery: delivery.SHOPUSEDELIVERY,
      DeliveryAddress: user.DeliveryAddress,
    })
      .then((data) => {
        if (!data[0]) throw new Error('Ошибка метода OSCreatePreOrder')
        if (data[0].RESULT !== '0') throw new Error(data[0].RESULTDESCRIPTION)

        fiscalization(robokassa, data[0].ID, summa)
      })
      .then(() => {
        refetch({
          ...user,
          Id,
          TableName,
          PrimaryKey,
          Price,
          Summa,
        })
      })
      .finally(() => setIsLoading(false))
  }
  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <Card>
        <Input
          label="Имя"
          type="text"
          {...register('name')}
          error={errors.name?.message}
        />
        <Controller
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <NumberFormat
                format="+7 (###) ###-##-##"
                mask="_"
                label="Телефон"
                placeholder="+7 (999) 999-99-99"
                onBlur={onBlur}
                onBeforeInput={(...args) =>
                  alert(
                    'BEFORE INPUT', //+
                    // args.map((ar) => JSON.stringify(ar)).join(','),
                  )
                }
                onEnded={(...args) => alert('ENDED')}
                onChangeCapture={() => alert('CHANGE CAPTURE')}
                onChange={() => alert('CHANGE')}
                onBeforeInputCapture={() => alert('capture input')}
                onBeforeInput={() => alert(' input')}
                onClick={() => alert('click')}
                onKeyUp={() => alert('key UP')}
                onSelect={(...args) => alert('SELECT')}
                // onPaste={onPastePhone(onChange)}
                onPaste={(...args) => alert('PASTE')}
                onValueChange={onPhoneChange(onChange)}
                allowEmptyFormatting={true}
                value={value}
                type="tel"
                error={errors.phone?.message}
                customInput={Input}
              />
            )
          }}
          name="phone"
          control={control}
        />
        <Input
          label="Почта"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        {(!!Number(delivery.SHOPUSEDELIVERY) || true) && (
          <Checkbox
            label="Вам требуется доставка?"
            {...register('withDelivery')}
          />
        )}
        {withDelivery && (
          <Controller
            render={({ field: { onChange, value, onBlur } }) => {
              return (
                <SuggestAddress
                  error={errors.address?.message}
                  onBlur={onBlur}
                  label="Адрес"
                  placeholder="Введите адрес"
                  onChange={onQueryChange(onChange)}
                  query={value}
                />
              )
            }}
            name="address"
            control={control}
          />
        )}
      </Card>

      {status.isError && <Card>Ошибка. Попробуйте ещё.</Card>}

      <div className={styles.buttons}>
        <Button type="button" onClick={goBack}>
          Назад
        </Button>
        <Button
          type="submit"
          disabled={status.isLoading || isLoading}
          className={styles.loadingBtn}
        >
          {status.isLoading || isLoading ? (
            <Loader size="small" />
          ) : (
            'Перейти к оплате'
          )}
        </Button>
      </div>
    </form>
  )
}
