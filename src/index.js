import React from 'react'
import ReactDOM from 'react-dom'
import './assets/styles/index.scss'
import App from './App'
import { AppContextProvider } from './contexts/AppContext'
import { EmotionProvider } from './contexts/EmotionContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { MainTemplate } from './Template/MainTemplate'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppContextProvider>
        <EmotionProvider>
          <MainTemplate>
            <App />
          </MainTemplate>
        </EmotionProvider>
      </AppContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)
