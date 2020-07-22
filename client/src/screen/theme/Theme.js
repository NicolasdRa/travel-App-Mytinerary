import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#57423F'
    },
    secondary: {
      main: '#ef5350'
    },

    common: {
      beige: '#BFA6A2',
      blue: '#0092FF',
      green: '#4caf50'
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
  overrides: {
    MuiGrid: {
      container: {
        width: '100% !important',
        margin: ' 0 !important'
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
})
