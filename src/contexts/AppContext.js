import { createContext, useCallback, useContext, useState } from 'react'
import { useAsync } from '../hooks/useAsync'
import { certificateApi } from '../services/certificateApi'

const AppContext = createContext(null)

export const AppContextProvider = ({ children }) => {
  const {
    data,
    refetch,
    status,
    clear: clearData,
  } = useAsync({
    fn: certificateApi.getAll,
  })
  const [certificate, setCertificate] = useState(null)
  const [user, setUser] = useState(null)
  const clear = useCallback(() => {
    setUser(null)
    setCertificate(null)
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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
