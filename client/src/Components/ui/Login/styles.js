import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  title: {
    margin: '1.5rem 0 0 0',
    padding: 0,
    textAlign: 'center',
  },

  subtitle: {
    margin: '2.5rem 0 0 0 ',
    padding: 0,
    textAlign: 'center',
  },

  input_field: {
    margin: '.8rem 0',
  },

  text: {
    marginTop: '1rem',
    textAlign: 'center',
  },

  google_button: {
    display: 'flex',
    margin: '1rem 0',
    padding: '.8rem',
  },

  btns: {
    paddingLeft: '1rem',
  },
}))
