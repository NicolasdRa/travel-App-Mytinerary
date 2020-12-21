import React from 'react'
import ReactDOM from 'react-dom'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from './Components/Redux/rootReducer'

import App from './App'
import * as serviceWorker from './serviceWorker'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import './index.css'

const store = configureStore({
  reducer: rootReducer,
})

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#210909',
      light: '#483131',
      dark: '#000000',
    },
    secondary: {
      main: '#dd2c00',
      light: '#ff6434',
      dark: '#a30000',
    },
  },
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
