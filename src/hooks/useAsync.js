import { useState, useCallback, useEffect } from 'react'
import { STATUS } from '../utils/constants'
import { useStatus } from './useStatus'

export const useAsync = ({ fn, args = [], onMount = false } = {}) => {
  const [data, setData] = useState(null)
  const { setStatus, ...statusProps } = useStatus()
  const refetch = useCallback(async (...args) => {
    setStatus(STATUS.LOADING)
    try {
      const result = await fn(...args)
      setData(result)
      setStatus(STATUS.SUCCESS)
    } catch (error) {
      setStatus(STATUS.ERROR, error.message)
      console.log('catch', error)
    }
  }, [])
  useEffect(() => {
    if (onMount) {
      refetch(...args)
    }
  }, [])
  const clear = useCallback(() => {
    setData(null)
    setStatus(STATUS.NEVER)
  }, [])
  return {
    refetch,
    data,
    status: {
      setStatus,
      ...statusProps,
    },
    clear,
  }
}
