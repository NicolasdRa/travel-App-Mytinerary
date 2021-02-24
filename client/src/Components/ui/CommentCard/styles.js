import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    boxShadow: 'none',
  },

  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },

  avatar: {
    height: '1.5rem',
    width: '1.5rem',
    marginBottom: '.5rem',
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    padding: '.5rem .5rem 0 .5rem',
  },

  summary: {
    textAlign: 'start',
    fontWeight: 'bolder',
  },

  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '1rem',
  },

  rating: {
    marginRight: '.5rem',
    textAlign: 'start',
  },

  description: {
    textAlign: 'start',
  },

  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  date: {
    margin: '0 .5rem 0 auto',
    alignSelf: 'flex-end',
    textAlign: 'end',
  },
}))
