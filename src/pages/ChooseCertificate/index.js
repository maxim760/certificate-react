import React, { useEffect } from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { Button, Loader, CertificateCard, Card } from '../../components'
import { useAppContext } from '../../contexts/AppContext'
import { cl, ROUTES } from '../../utils'
import { useSelectOptions } from './useSelectOptions'

import styles from './chooseCertificate.module.scss'
import { PostMessage } from '../../utils/message'
import { useTheme } from '@emotion/react'

export const ChooseCertificate = () => {
  const theme = useTheme()
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
    options,
  } = useAppContext()
  const customStyles = {
    control: (base, state) => ({
      ...base,
      boxShadow: state.isFocued ? theme.primary + ' 0 0 0 2px' : 'none',
      borderColor: theme.primary + ' !important',
      borderWidth: '2px',
    }),
  }
  useEffect(() => {
    alert('start' + isMobile + window.innerWidth)
    PostMessage.start()
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
        styles={customStyles}
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
