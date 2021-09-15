import React, { useEffect } from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { Button, Loader, CertificateCard, Card } from '../../components'
import { useAppContext } from '../../contexts/AppContext'
import { cl, ROUTES } from '../../utils'
import { useSelectOptions } from './useSelectOptions'

import styles from './chooseCertificate.module.scss'

export const ChooseCertificate = () => {
  const history = useHistory()
  const {
    status,
    refetch,
    data,
    certificate,
    setCertificate,
    isMobile,
    isStarted,
    setIsStarted,
  } = useAppContext()
  useEffect(() => {
    if (isMobile && !isStarted) {
      history.push(ROUTES.PREVIEW)
    }
  }, [])
  useEffect(() => {
    if (!certificate) {
      refetch()
    }
  }, [])
  const selectProps = useSelectOptions({ data, certificate, setCertificate })
  const onClickConfirm = () => {
    setIsStarted(true)
    history.push(ROUTES.FORM)
  }
  return (
    <div className={styles.wrapper}>
      <Select
        className={cl({
          [styles.select]: true,
          [styles.loading]: status.isLoading,
        })}
        placeholder="Выберите сертификат"
        isSearchable
        {...selectProps}
        isLoading={status.isLoading}
        loadingMessage={() => 'Загрузка...'}
        noOptionsMessage={() => 'Не удалось загрузить'}
      />
      {status.isLoading && <Loader className={styles.loader} />}
      {!!certificate && <CertificateCard certificate={certificate} />}
      {!!certificate && <Button onClick={onClickConfirm}>Оформить</Button>}
      {status.isError && (
        <div className={styles.errorBlock}>
          <Card>
            <h3>Ошибка: {status.message}</h3>
          </Card>
          <Button onClick={refetch}>Попробуйте еще</Button>
        </div>
      )}
    </div>
  )
}
