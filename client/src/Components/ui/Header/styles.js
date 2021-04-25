import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    border: '0',
    borderRadius: '3px',
    padding: '0.625rem 0',
    // marginBottom: '20px',
    color: '#555',
    width: '100%',
    backgroundColor: 'transparent',
    boxShadow:
      '0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)',
    transition: 'all 150ms ease 0s',
    alignItems: 'center',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-start',
    position: 'relative',
    zIndex: 'unset',
  },

  toolbar: {
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    display: 'flex',
    paddingTop: '.5rem',
    width: '6.5rem',
    fill: theme.palette.common.chalk,
    opacity: 0.8,

    [theme.breakpoints.up('md')]: {
      width: '7rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '6rem',
    },
    [theme.breakpoints.up('xl')]: {
      width: '8rem',
    },
  },
}))
