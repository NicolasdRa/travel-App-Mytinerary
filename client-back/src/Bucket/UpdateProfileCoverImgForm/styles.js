import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  title: {
    margin: '1.5rem 0 0 0',
    padding: '0 1.5rem',
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  previewImgContainer: {
    display: 'flex',
  },

  previewImg: {
    objectFit: 'cover',
    overflow: 'hidden',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '1rem',
  },

  btns: {
    paddingLeft: '1rem',
  },

  // cropper here below
  cropContainer: {
    margin: '.5rem 0 0 0',
    position: 'relative',
    width: '100%',
    height: 200,
    borderRadius: '1rem',
    background: '#333',
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  },

  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
  },

  controls: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },

  sliderContainer: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
  },

  sliderLabel: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 65,
    },
  },

  slider: {
    padding: '22px 0px',
    marginLeft: 16,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0 16px',
    },
  },
}))
