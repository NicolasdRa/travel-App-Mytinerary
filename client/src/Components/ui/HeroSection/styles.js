import { makeStyles } from '@material-ui/core/styles'
import Image from '../../../assets/images/bg4.jpg'

export const useStyles = makeStyles((theme) => ({
  main: {
    // backgroundImage:
    //   'radial-gradient(circle, rgba(255, 255, 255, .7) 0%, rgba(255, 255, 255, 1) 60%), url(' +
    //   Image +
    //   ')',
    backgroundImage: 'url(' + Image + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    flexDirection: 'column',

    [theme.breakpoints.up('md')]: {
      height: '53vh',
    },

    [theme.breakpoints.up('lg')]: {
      height: '60vh',
    },
  },

  topNav: {
    position: 'fixed',
    zIndex: '1100',
    bottom: 0,
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto 0',
    padding: '0 2rem',
    justifyContent: 'space-around',

    [theme.breakpoints.up('md')]: {
      padding: '0 5rem',
    },

    [theme.breakpoints.up('lg')]: {
      padding: '0 8rem',
    },

    [theme.breakpoints.up('xl')]: {},
  },

  title: {
    color: theme.palette.common.chalk,
    margin: '.3rem 0 0.875rem',
    fontSize: '4rem',
    fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    fontWeight: 700,

    [theme.breakpoints.up('sm')]: {
      margin: '5rem 0 0.875rem',
      fontSize: '6rem',
    },

    [theme.breakpoints.up('md')]: {},

    [theme.breakpoints.up('lg')]: {
      margin: '2rem 0 0.875rem',
      fontSize: '3.5rem',
    },

    [theme.breakpoints.up('xl')]: {
      margin: '5rem 0 0.875rem',
      fontSize: '5rem',
    },
  },

  subTitle: {
    fontSize: '1.2rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: theme.palette.common.chalk,

    [theme.breakpoints.up('sm')]: {
      fontSize: '2rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },

    [theme.breakpoints.up('lg')]: {
      fontSize: '1.2rem',
      fontWeight: 400,
    },

    [theme.breakpoints.up('xl')]: {
      fontSize: '1.4rem',
      fontWeight: 400,
    },
  },

  btnsContainer: {
    marginTop: '.5rem',
  },

  startBtnContainer: {
    textAlign: 'center',

    [theme.breakpoints.up('sm')]: {
      margin: '2rem 0 0 0',
    },

    [theme.breakpoints.up('md')]: {
      textAlign: 'start',
      marginTop: '1rem',
    },

    [theme.breakpoints.up('lg')]: {},
  },

  text: {
    color: theme.palette.common.chalk,

    [theme.breakpoints.up('sm')]: {
      margin: '1.2rem 0',
      fontSize: '1.2rem',
    },
  },

  startBtn: {
    margin: '1rem 0 0 0',
    width: '12rem',
    height: '3rem',

    [theme.breakpoints.up('sm')]: {
      margin: '0 0 3rem 0',
      width: '15rem',
      height: '3.5rem',
      fontSize: '1.1rem',
    },

    [theme.breakpoints.up('lg')]: {
      height: '2.5rem',
      width: '10rem',
      fontSize: '1rem',
    },

    [theme.breakpoints.up('xl')]: {
      height: '3rem',
      width: '12rem',
      fontSize: '1.2rem',
    },
  },

  loginBtnsContainer: {
    textAlign: 'center',
    marginTop: '1rem',

    [theme.breakpoints.up('sm')]: {
      margin: '1rem 5rem 4rem 5rem',
    },

    [theme.breakpoints.up('lg')]: {
      margin: '1rem 5rem 4rem 5rem',
    },
  },

  question: {
    color: theme.palette.common.chalk,

    [theme.breakpoints.up('sm')]: {
      margin: '1.2rem 0',
      fontSize: '1.5rem',
    },

    [theme.breakpoints.up('lg')]: {
      margin: '2rem 0',
      fontSize: '1.2rem',
    },
  },

  modal_btn: {
    color: theme.palette.common.chalk,
    borderColor: theme.palette.common.chalk,
    margin: '1rem .5rem',
    height: '3rem',
    width: '6rem',
    [theme.breakpoints.up('sm')]: {
      margin: '0 1.5rem',
      width: '8rem',
      height: '3rem',
      fontSize: '1.1rem',
    },

    [theme.breakpoints.up('lg')]: {
      margin: '0 1.5rem',
      width: '8rem',
      height: '3.5rem',
      fontSize: '1.2rem',
    },
  },
}))
