import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '../../components'
import { useAppContext } from '../../contexts/AppContext'
import { ROUTES } from '../../utils'
import { PostMessage } from '../../utils/message'
import styles from './preview.module.scss'

export const PreviewPage = () => {
  const history = useHistory()
  const { setIsStarted, isMobile } = useAppContext()
  useEffect(() => {
    alert(isMobile + window.innerWidth)
    if (!isMobile) {
      history.push(ROUTES.MAIN)
    }
  }, [])
  const onClickNextPage = () => {
    setIsStarted(true)
    history.push(ROUTES.MAIN)
  }
  return (
    <div className={styles.wrapper}>
      <Button onClick={onClickNextPage}>Оформить сертификат</Button>
    </div>
  )
}
