import { AppRouter } from './components'
import { useAppContext } from './contexts/AppContext'
import { withCheckApikey } from './hocs/withCheckApiKey'
/** @jsxImportSource @emotion/react */
import { jsx, ThemeProvider } from '@emotion/react'
import { useMemo } from 'react'

const themeLight = {
  text: '#000',
  background: '#fff',
  buttonText: '#000',
  buttonTextHover: '#fff',
  buttonBorder: '#000',
  buttonBg: 'rgba(0, 0, 0, 0)',
  buttonBgHover: 'rgba(0, 0, 0, 1)',
}

const themeDark = {
  text: '#fff',
  background: '#121212',
  buttonText: '#fff',
  buttonTextHover: '#000',
  buttonBorder: '#fff',
  buttonBg: 'rgba(255, 255, 255, 0)',
  buttonBgHover: 'rgba(255, 255, 255, 1)',
}

const createTheme = (props) => {
  console.log({ props })
  // todo добавить темную тему
  const theme = props.theme === 'light' ? themeLight : themeLight
  return {
    primary: props.color,
    disabled: '#959495',
    isDark: props.theme !== 'light',
    ...theme,
  }
}
const App = () => {
  const { isMobile, options = {} } = useAppContext()
  const theme = useMemo(() => {
    return createTheme(options)
  }, [options])
  return (
    <ThemeProvider theme={theme}>
      <AppRouter isMobile={isMobile} />
    </ThemeProvider>
  )
}

export default withCheckApikey(App)
