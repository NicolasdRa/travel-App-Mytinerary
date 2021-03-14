import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  topNav: {
    position: 'fixed',
    bottom: 0,
  },

  alert: { marginTop: '4rem' },

  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  loader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '35vh auto',
  },

  loaderMessage: {
    margin: '1.5rem 0 0 1rem',
  },

  bottomNav: {
    position: 'fixed',
    top: 0,
  },
}))
