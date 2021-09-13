import React from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useHistory } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import { useWindowSize } from '../hooks/useWindowSize'
import { certificateApi } from '../services/certificateApi'
import { ROUTES } from '../utils'

const AppContext = createContext(null)

export const AppContextProvider = ({ children }) => {
  const history = useHistory()
  const {
    data,
    refetch,
    status,
    clear: clearData,
  } = useAsync({
    fn: certificateApi.getAll,
  })
  const { width } = useWindowSize()
  const [isMobile, setIsMobile] = useState(width < 600)
  useEffect(() => {
    setIsMobile(width < 600)
  }, [width])
  useEffect(() => {
    if (!isStarted && isMobile) {
      history.push(ROUTES.PREVIEW)
    }
  }, [isMobile])
  const [isStarted, setIsStarted] = useState(false)
  const [certificate, setCertificate] = useState(null)
  const [user, setUser] = useState(null)
  const clear = useCallback(() => {
    setUser(null)
    setCertificate(null)
    setIsStarted(false)
    window.parent.postMessage({ type: 'sycret', status: 'finish' }, '*')
    clearData()
  }, [])
  return (
    <AppContext.Provider
      value={{
        data,
        refetch,
        status,
        certificate,
        setCertificate,
        user,
        setUser,
        clear,
        isMobile,
        isStarted,
        setIsStarted,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
