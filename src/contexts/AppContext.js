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
import { ApiKey, ROUTES, WidgetData } from '../utils'
import { PostMessage } from '../utils/message'

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
  const [clientId, setClientId] = useState(null)
  const [robokassa, setRobokassa] = useState(null)
  const [delivery, setDelivery] = useState(null)
  const [options, setOptions] = useState({})
  const setNewOptions = (payload) => {
    setOptions((prev) => {
      const copy = { ...prev }
      payload.forEach(({ OPTIONNUMBER, OPTIONVALUE }) => {
        if (OPTIONNUMBER === '1') copy.background = OPTIONVALUE
        if (OPTIONNUMBER === '2') copy.color = OPTIONVALUE
        if (OPTIONNUMBER === '3')
          copy.theme = !!Number(OPTIONVALUE) ? 'light' : 'dark'
      })
      return copy
    })
  }
  useEffect(() => {
    setIsMobile(width < 600)
  }, [width])
  useEffect(() => {
    WidgetData.save()
  }, [])
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
    PostMessage.finish()
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
        options,
        setOptions: setNewOptions,
        delivery,
        setDelivery,
        clientId,
        setClientId,
        robokassa,
        setRobokassa,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
