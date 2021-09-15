import { useCallback, useEffect, useState } from 'react'
import { Card, Loader, Button } from '../components'
import { useAppContext } from '../contexts/AppContext'
import { request } from '../services/request'
import { WidgetData } from '../utils'
import styles from './checkApiKey.module.scss'

export const withCheckApikey = (Component) => {
  return () => {
    const { setClientId, setDelivery, setRobokassa, setOptions } =
      useAppContext()
    const [isValid, setIsValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const checkApiKey = useCallback(() => {
      setIsLoading(true)
      request('MDBGetClCompanyId', {
        CLApiKey: WidgetData.getApiKey(),
      })
        .then((data) => {
          if (!data[0]) throw new Error('Ошибка метода MDBGetClCompanyId')

          if (data[0].RESULT !== '0') return

          setClientId(data[0].CLCOMPANYID)

          return data[0].CLCOMPANYID
        })
        .then((clientId) => {
          if (!clientId) return

          request('OSGetDeliveryParams').then((data) => {
            if (!data[0]) throw new Error('Ошибка метода OSGetDeliveryParams')

            setDelivery(data[0])
          })

          return request('OSGetRoboData', {
            ClCompanyId: clientId,
          })
        })
        .then((data) => {
          if (!data[0]) throw new Error('Ошибка метода OSGetRoboData')

          setRobokassa(data[0])

          return request('OSGetOptions')
        })
        .then((data) => {
          setOptions(data)
          setIsValid(true)
        })
        .catch(() => {
          setIsValid(false)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }, [])
    useEffect(() => {
      checkApiKey()
    }, [])
    if (isLoading) return <Loader center />
    if (!isValid && !isLoading)
      return (
        <div className="center">
          <Card>У вас нет апи ключа или апи ключ неверный</Card>
          <Button className={styles.nextTryBtn} onClick={checkApiKey}>
            Попробуйте ещё
          </Button>
        </div>
      )

    return <Component />
  }
}
