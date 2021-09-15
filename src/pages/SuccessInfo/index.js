import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Card } from '../../components'
import { useAppContext } from '../../contexts/AppContext'
import { ROUTES } from '../../utils'

import styles from './successInfo.module.scss'

export const SuccessInfo = () => {
  const { certificate, user, clear } = useAppContext()
  const history = useHistory()
  useEffect(() => {
    if (!certificate || !user) {
      goToMain()
    }
  }, [])
  const goToMain = () => {
    clear()
    history.push(ROUTES.MAIN)
  }
  return (
    <div className={styles.wrapper}>
      <Card withShadow>
        <h2>Идёт оплата</h2>
      </Card>
      <Button onClick={goToMain}>Вернуться на главную</Button>
    </div>
  )
}
