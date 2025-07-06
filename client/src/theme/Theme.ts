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
          // scrollbar - mobile-friendly styling
          scrollbarColor: 'rgba(191, 166, 162, 0.3) transparent',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: 'transparent',
            height: '4px',
            width: '4px',
            
            '@media (max-width: 959px)': {
              width: '2px',
              height: '2px',
            }
          },
          // scrollbar thumb - less intrusive on mobile
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 10,
            backgroundColor: 'rgba(191, 166, 162, 0.3)',
            transition: 'background-color 0.2s ease',
            
            '@media (max-width: 959px)': {
              backgroundColor: 'rgba(191, 166, 162, 0.2)',
            }
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
            {
              backgroundColor: 'rgba(191, 166, 162, 0.6)',
            },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
            {
              backgroundColor: 'rgba(191, 166, 162, 0.8)',
            },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: 'rgba(191, 166, 162, 0.5)',
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

          '@media (max-width: 599px)': {
            fontSize: '1.1rem',
          },
          
          '@media (min-width: 960px)': {
            fontSize: '1rem',
            fontWeight: 500,
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
