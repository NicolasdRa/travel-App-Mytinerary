import { Provider } from 'react-redux'

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { theme } from './theme/Theme'

import { store } from './redux/store'
import { AppRouter } from './routers/AppRouter'
import { CssBaseline } from '@mui/material'

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          <AppRouter />
        </StyledEngineProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
