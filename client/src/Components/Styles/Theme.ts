import { createTheme, Theme } from '@mui/material/styles'

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(256, 44%, 5%)',
      // main: '#292c33',
    },
    secondary: {
      main: '#ef5350',
    },

    common: {
      beige: '#BFA6A2',
      beigeLight: '#efebe9',
      blue: '#0092FF',
      grey: '#555555',
      green: '#4caf50',
      turquoise: '#40E0D0',
      chalk: '#fafafa',
      orangeLight: '#fbe9e7',
    },
  },

  typography: {
    fontFamily: ['Roboto', '"Roboto Slab"', 'sans-serif'].join(','),

    topNavTab: {
      textTransform: 'none',
      fontSize: '.8rem',
      fontWeight: 300,
      minWidth: 10,
      marginLeft: '25px',
    },
  },

  components: {
    // Name of the component
    MuiGrid: {
      styleOverrides: {
        // Name of the slot
        container: {
          width: '100% !important',
          margin: ' 0 !important',
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})
