import React from 'react'
/** @jsxImportSource @emotion/react */
import { jsx, ThemeProvider } from '@emotion/react'
import { useAppContext } from './AppContext'
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
    primary: props.color || 'blue',
    disabled: '#959495',
    isDark: props.theme !== 'light',
    ...theme,
  }
}
export const EmotionProvider = ({ children }) => {
  const { options = {} } = useAppContext()
  const theme = useMemo(() => {
    return createTheme(options)
  }, [options])
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
