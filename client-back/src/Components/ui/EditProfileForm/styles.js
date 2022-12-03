import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles((theme) => ({
  coverImage: {
    width: '100%',
    // backgroundSize: 'cover'
  },

  title: {
    margin: '2rem 0 1rem 0',
    padding: 0,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: '.8rem',
    margin: '1rem 0 1.5rem 0 ',
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

  formControl: {
    display: 'flex',
    justifySelf: 'space-between',
    minWidth: '30%',
  },

  submit_button: {
    display: 'flex',
    margin: '1rem 0',
    padding: '.8rem',
  },

  btns: {
    paddingLeft: '1rem',
  },

  photo_icon: {
    height: '3rem',
    width: '3rem',
  },

  add_btn: {
    position: 'fixed',
    bottom: '4rem',
    right: '1.5rem',
    zIndex: '1000',
  },
}))
