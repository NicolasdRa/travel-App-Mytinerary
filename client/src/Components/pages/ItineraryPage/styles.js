import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  loader: {
    display: 'flex',
    margin: '35vh auto',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
    width: '100%',
    marginBottom: '56px',
  },

  header: {
    height: '20rem',
    width: '100%',
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 1rem',
  },

  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1rem',
  },

  overline: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: '1rem',
    padding: '0 0 0 1rem',
  },

  city_title: {
    display: 'flex',
    flex: '0 0 auto',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  likes_btn: {},

  extra_info: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 1rem',
  },

  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  ratingNumber: {
    marginLeft: '.5rem',
  },

  user_info: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  avatar: {
    height: '1.5rem',
    width: '1.5rem',
    marginRight: '.5rem',
  },

  price_time: {
    display: 'flex',
    marginLeft: 'auto',
    alignItems: 'center',
    padding: '1rem 0',
  },

  icons: {
    fontSize: '1rem',
    marginRight: '.2rem',
    color: 'grey',
  },

  duration: {
    display: 'flex',
    alignItems: 'center',
  },

  price: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '1rem',
  },

  info_icon: {
    alignItems: 'center',
    fill: 'grey',
  },

  divider: {
    margin: '1rem',
  },

  text: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
    textAlign: 'left',
    margin: '1rem',
  },

  gallery: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
  },

  subtitle: {
    display: 'flex',
    justifySelf: 'start',
    marginLeft: '1rem',
  },

  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  viewReviews: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '0 1rem',
  },

  reviewText: {
    marginRight: '.3rem',
  },

  expandMoreBtn: {
    padding: 0,
    marginRight: 'auto',
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },

  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))
