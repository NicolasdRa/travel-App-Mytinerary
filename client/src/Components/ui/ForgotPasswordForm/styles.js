import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  btnContainer: {
    display: 'flex',
    fontStyle: 'lowercase',
  },

  btn: {
    textTransform: 'none',
    fontWeight: 400,
    fontSize: '.8rem',
    marginLeft: '-0.5rem',
  },

  title: {
    margin: '1rem 0 0 0',
    padding: 0,
    textAlign: 'center',
  },

  subtitle: {
    margin: '1.5rem 1.5rem 0 1.5rem',
    padding: 0,
    textAlign: 'left',
  },

  input_field: {
    margin: '.8rem 0',
  },

  text: {
    marginTop: '1rem',
    textAlign: 'center',
  },

  btns: {
    paddingLeft: '1rem',
  },
}))
