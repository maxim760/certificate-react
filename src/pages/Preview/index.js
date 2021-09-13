import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '../../components'
import { useAppContext } from '../../contexts/AppContext'
import { ROUTES } from '../../utils'
import styles from './preview.module.scss'

export const PreviewPage = () => {
  const history = useHistory()
  const { setIsStarted, isMobile } = useAppContext()
  useEffect(() => {
    if (!isMobile) {
      history.push(ROUTES.MAIN)
    }
  }, [])
  const onClickNextPage = () => {
    console.log('before')
    window.postMessage('mobile start', '*')
    console.log('after')
    setIsStarted(true)
    history.push(ROUTES.MAIN)
  }
  return (
    <div className={styles.wrapper}>
      <Button onClick={onClickNextPage}>Перейти</Button>
    </div>
  )
}
