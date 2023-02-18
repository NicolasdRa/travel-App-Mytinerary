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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // scrollbar
          scrollbarColor: 'transparent',
          // scrollbarWidth: 'thin',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: 'transparent',
            height: '8px',
            width: '8px',
          },
          // scrollbar thumb
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 10,
            backgroundColor: '#fbe9e7',
            // minHeight: 3,
            // maxHeight: 3,
            // minWidth: 3,
            // maxWidth: 3,
            // border: '1px solid #BFA6A2',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
            {
              backgroundColor: '#BFA6A2',
            },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
            {
              backgroundColor: '#BFA6A2',
            },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: '#BFA6A2',
            },

          // scrollbar buttons
          '&::-webkit-scrollbar-button, & *::-webkit-scrollbar-button': {
            display: 'none',
          },

          // scrollbar track
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            display: 'none',
          },

          // scrollbar track-piece
          '&::-webkit-scrollbar-track-piece, & *::-webkit-scrollbar-track-piece':
            {
              display: 'none',
            },

          // scrollbar corner
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#BFA6A2',
          },
        },
      },
    },

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

    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '50px',
        },
      },
    },

    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: '50px',
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        formControl: {
          // top: '6px',
        },
      },
    },

    MuiSpeedDialAction: {
      styleOverrides: {
        fab: {
          backgroundColor: '#292c33',
          color: 'white',
        },

        staticTooltipLabel: {
          backgroundColor: '#9F9696',
          color: 'white',
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1.4rem',
          fontWeight: 400,
          minWidth: 10,
          marginLeft: '15px',

          '@media (max-width: 500px)': {
            fontSize: '1.2rem',
          },
        },

        textColorInherit: {
          opacity: 1,
        },
      },
    },

    // '&.Mui-focused': {}
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
