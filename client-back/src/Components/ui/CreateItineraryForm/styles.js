import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles((theme) => ({
  title: {
    margin: '1.5rem 0 0 0',
    padding: 0,
    textAlign: 'center',
  },

  subtitle: {
    margin: '.5rem 0 0 0 ',
  },

  input_field: {
    margin: '.8rem 0',
  },

  text: {
    marginTop: '1rem',
    textAlign: 'center',
  },

  formControl: {
    width: '100%',
  },

  select: {
    minWidth: '3rem',
  },

  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  submit_button: {
    display: 'flex',
    margin: '1rem 0',
    padding: '.8rem',
  },

  btns: {
    paddingLeft: '1rem',
  },

  photoIconContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },

  photo_icon: {
    height: '3rem',
    width: '3rem',
  },

  previewContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  previewImgContainer: {
    display: 'flex',
    maxHeight: '10em',
  },

  previewImg: {
    objectFit: 'cover',
    overflow: 'hidden',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '1rem',
  },

  clearButton: {
    alignSelf: 'flex-end',
  },

  add_btn: {
    position: 'fixed',
    bottom: '4rem',
    right: '1.5rem',
    zIndex: '1000',
  },
}))
