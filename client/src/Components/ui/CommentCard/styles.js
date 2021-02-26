import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'none',
  },

  avatar: {
    height: '2rem',
    width: '2rem',
    margin: 'auto 0',
  },

  userInfo: { display: 'flex', flexDirection: 'row' },

  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexGrow: 1,
    marginLeft: '1rem',
    textAlign: 'start',
  },

  userName: {
    marginLeft: '.3rem',
    fontWeight: 'bolder',
  },

  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  rating: {
    marginRight: '.5rem',
    textAlign: 'start',
  },

  date: {
    margin: '0 .5rem 0 auto',
    alignSelf: 'flex-end',
    textAlign: 'end',
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    paddingTop: '0',
    paddingBottom: '16px !important',
  },

  summary: {
    textAlign: 'start',
    fontWeight: 'bolder',
  },

  description: {
    textAlign: 'start',
  },

  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
