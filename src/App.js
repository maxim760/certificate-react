import { AppRouter } from './components'
import { useAppContext } from './contexts/AppContext'
import { withCheckApikey } from './hocs/withCheckApiKey'

const App = () => {
  const { isMobile } = useAppContext()
  return <AppRouter isMobile={isMobile} />
}

export default withCheckApikey(App)
