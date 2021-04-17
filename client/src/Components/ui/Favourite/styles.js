import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  likes_container: {
    display: 'flex',
    alignItems: 'center',
  },

  likes_btn: {
    padding: '0 .2rem 0 0',
  },

  likes_icon: {
    height: '1.5rem',
    width: '1.5rem',
  },

  text: {
    fontSize: '.9rem',
  },
}))
