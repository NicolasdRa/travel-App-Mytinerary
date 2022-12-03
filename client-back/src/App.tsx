import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { Provider } from 'react-redux'
import { theme } from './Components/Styles/Theme'

import { store } from './Components/Redux/store'
import { AppRouter } from './routers/AppRouter'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  )
}

export default App
