import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles((theme) => ({
  createIcon: {
    fontSize: '1.1rem',
    marginLeft: '.5rem',
    marginBottom: '.2rem',
  },

  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  btn: {
    display: 'flex',
    textTransform: 'none',
    alignContent: 'flex-end',
    marginLeft: '-8px',
    padding: '0 1rem',
  },

  modal: {
    display: 'flex',
    justifyContent: 'center',
  },

  title: {
    padding: '1.5rem 0 .5rem 0',
    textAlign: 'center',
  },

  subtitle: {
    margin: '0 1rem',
    padding: ' 0  0 .5rem 0',
    textAlign: 'center',
  },

  ratingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '.5rem 0',
  },

  ratingLabel: {
    textAlign: 'center',
  },

  rating: {
    marginTop: '.3rem',
    margin: '0 auto',
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
