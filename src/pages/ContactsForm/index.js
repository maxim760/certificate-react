import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import NumberFormat from 'react-number-format'

import { Card, Button, Loader, Input } from '../../components'
import { normalizeUser } from '../../utils'
import { useAsync } from '../../hooks'
import { useAppContext } from '../../contexts/AppContext'
import { userApi } from '../../services/userApi'

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
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      phone: '',
      email: '',
      name: '',
    },
  })
  const onPhoneChange = (onChange) => (v) => onChange(v.value)
  const onSubmitForm = (userData) => {
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
      </Card>

      {status.isError && <Card>Ошибка. Попробуйте ещё.</Card>}

      <div className={styles.buttons}>
        <Button type="button" onClick={goBack}>
          Назад
        </Button>
        <Button
          type="submit"
          disabled={!isValid || status.isLoading}
          className={styles.loadingBtn}
        >
          {status.isLoading ? <Loader size="small" /> : 'Оплатить'}
        </Button>
      </div>
    </form>
  )
}
