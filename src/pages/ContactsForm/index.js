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
  const { certificate, setUser } = useAppContext()
  const { refetch, status, data } = useAsync({ fn: userApi.sendUser })
  const { goBack } = useRedirectsFromForm({ data, certificate })
  const {
    formState: { errors, isValid },
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
  const withDelivery = !!watch('withDelivery')
  const onPhoneChange = (onChange) => (v) => onChange(v.value)
  const onQueryChange = (onChange) => (v) => onChange(v.value)
  const onSubmitForm = (userData) => {
    console.log(userData)
    const user = normalizeUser(userData)
    const { Id, TableName, PrimaryKey, Price, Summa } = certificate
    setUser(user)
    refetch({
      ...user,
      Id,
      TableName,
      PrimaryKey,
      Price,
      Summa,
    })
  }

  // const [query, setQuery] = useState('')
  // const onChangeQuery = (data) => {
  //   setQuery(data.value)
  // }

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
          render={({ field: { onChange, value } }) => {
            return (
              <NumberFormat
                format="+7 (###) ###-##-##"
                mask="_"
                label="Телефон"
                placeholder="+7 (999) 999-99-99"
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
        <Checkbox
          label="Вам требуется доставка?"
          {...register('withDelivery')}
        />
        {withDelivery && (
          <Controller
            render={({ field: { onChange, value } }) => {
              return (
                <SuggestAddress
                  error={errors.address?.message}
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
          disabled={status.isLoading}
          className={styles.loadingBtn}
        >
          {status.isLoading ? <Loader size="small" /> : 'Перейти к оплате'}
        </Button>
      </div>
    </form>
  )
}
