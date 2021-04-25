import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: 'transparent',
    margin: '0 auto',
    padding: '2rem 4rem',
  },

  link: {
    color: theme.palette.primary.light,
    fontFamily: 'Roboto',
    opacity: 0.7,
    fontSize: ' .9rem',
    margin: '.2rem 1rem',
    textDecoration: 'none',
  },

  logo: {
    height: '2.5rem',
    margin: '.5rem',
    color: theme.palette.primary.light,
    opacity: 0.5,
  },

  text: {
    color: theme.palette.primary.light,
    opacity: 0.7,
    fontFamily: 'Roboto',
    fontSize: ' .75rem',
    lineHeight: 1.8,
    margin: '.5rem 0',
    padding: '0 3rem',
    textDecoration: 'none',
  },
}))
