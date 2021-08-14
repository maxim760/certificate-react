import { useState, useCallback } from 'react'
import { STATUS } from '../utils/constants'

export const useStatus = (defaultStatus = STATUS.NEVER) => {
  const [{ status, message }, setStatus] = useState(() => ({
    status: defaultStatus,
  }))
  const setNewStatus = useCallback(
    (status, message) => {
      setStatus({ status, message })
    },
    [setStatus],
  )
  const updateMessage = useCallback(
    (message) => {
      setStatus((prev) => ({ ...prev, message }))
    },
    [setStatus],
  )
  return {
    message: message,
    setStatus: setNewStatus,
    updateMessage,
    isLoading: status === STATUS.LOADING,
    isNone: status === STATUS.NEVER,
    isSuccess: status === STATUS.SUCCESS,
    isError: status === STATUS.ERROR,
  }
}
