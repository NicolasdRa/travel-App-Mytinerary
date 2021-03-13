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
    margin: '35vh auto',
  },

  bottomNav: {
    position: 'fixed',
    top: 0,
  },
}))
