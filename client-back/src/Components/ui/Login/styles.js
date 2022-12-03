import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles((theme) => ({
  main: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100% - 64px)',
    maxWidth: '444px',
  },

  container: {
    padding: '1.5rem',
  },

  title: {
    margin: '1.5rem 0 0 0',
    padding: 0,
    textAlign: 'center',
  },

  google_button: {
    display: 'flex',
    margin: '1rem .5rem',
    padding: '.8rem',
  },

  subtitle: {
    margin: '1rem 0 0 0 ',
    padding: 0,
    textAlign: 'center',
  },

  form: {
    margin: '0 auto',
    padding: '8px',
  },

  input_field: {
    margin: '.8rem auto',
  },

  btns: {
    flex: '0 0 auto',
    display: 'flex',
    padding: '8px',
    alignItems: 'center',
  },

  loginBtn: {
    width: '100%',
    margin: '0 auto',
    borderRadius: '8px',

    [theme.breakpoints.up('lg')]: {
      padding: '.5rem 0',
    },
  },

  loader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 auto',
  },

  ringLoader: {
    margin: '0 1.5rem',
    paddingBottom: '1.7rem',
  },

  bottomLink: {
    margin: '.8rem 0 1rem 0',
  },
}))
