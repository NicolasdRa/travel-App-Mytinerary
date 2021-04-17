import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0.3rem',
    minWidth: '14rem',
    overflow: 'visible',

    [theme.breakpoints.up('md')]: {
      maxWidth: '16rem',
    },
  },

  cardImg: {
    minHeight: '160px',
    height: '8rem',
    // borderRadius: 2,
  },

  cardContent: {
    textAlign: 'start',
    padding: '8px 16px',
  },

  firstLine: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontWeight: '500',
    textTransform: 'capitalize',
    lineHeight: '1',
  },

  subheader: {
    textAlign: 'left',
    fontSize: '.8rem',
  },

  avatar: {
    backgroundColor: theme.palette.secondary.main,
    height: '1rem',
    width: '1rem',
    alignSelf: 'flex-start',
  },

  authorInfo: {
    marginTop: '.5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  authorName: {
    margin: '0 0 0 5px',
    fontSize: '.8rem',
  },

  additionalInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: '.5rem',
  },

  duration: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '.8rem',
    marginRight: '1rem',
  },

  price: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    fontSize: '.8rem',
  },

  icons: {
    height: '.8rem',
    width: '.8rem',
    fill: 'grey',
    marginRight: '3px',
  },

  infoText: {
    fontSize: '.8rem',
  },

  cardActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: '0 0 .5rem .2rem',
  },

  textBtn: {
    margin: '0 .5rem',
    fontWeight: '400',
  },
}))
