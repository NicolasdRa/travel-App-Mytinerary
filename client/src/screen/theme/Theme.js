import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#57423F'
    },
    secondary: {
      main: '#ef5350'
    }
  },
  typography: {
    topNavTab: {
      textTransform: 'none',
      fontSize: '.8rem',
      fontWeight: 300,
      minWidth: 10,
      marginLeft: '25px'
    }
  },
  overrides: {}
})
