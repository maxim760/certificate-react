import React from 'react'
import ReactDOM from 'react-dom'
import './assets/styles/index.scss'
import { App } from './App'
import { AppContextProvider } from './contexts/AppContext'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)
