import { AppRouter } from './components'
import { useAppContext } from './contexts/AppContext'

export const App = () => {
  const { isMobile } = useAppContext()
  return <AppRouter isMobile={isMobile} />
}
