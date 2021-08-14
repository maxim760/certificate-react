import { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ROUTES } from '../../utils'

export const useRedirectsFromForm = ({ data, certificate }) => {
  const history = useHistory()

  useEffect(() => {
    if (!certificate) {
      history.push(ROUTES.MAIN)
    }
  }, [])

  useEffect(() => {
    if (data) {
      history.push(ROUTES.PAYMENT)
    }
  }, [data])

  const goBack = useCallback(() => {
    history.goBack()
  }, [])

  return { goBack }
}
