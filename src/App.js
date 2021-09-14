import { AppRouter } from './components'
import { useAppContext } from './contexts/AppContext'
import { MainTemplate } from './Template/MainTemplate'

export const App = () => {
  const { isMobile } = useAppContext()
  return (
    <MainTemplate>
      <AppRouter isMobile={isMobile} />
    </MainTemplate>
  )
}
