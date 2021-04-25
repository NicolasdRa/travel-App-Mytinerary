import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  list: {
    display: 'flex',
    fontSize: '14px',
    margin: '0 2rem',
  },

  listItem: {
    color: 'inherit',
    width: 'auto',
    margin: '0',
    padding: '0',
  },
  listItemText: {
    padding: '0 !important',
  },
  navLink: {
    color: theme.palette.common.chalk,
    opacity: 0.8,
    padding: '.5rem 1rem',
    fontWeight: '400',
    fontSize: '12px',
    textTransform: 'uppercase',
    borderRadius: '4px',
    borderColor: theme.palette.common.chalk,
    lineHeight: '20px',
    textDecoration: 'none',
    margin: '0px',
    display: 'inline-flex',
    '&:hover,&:focus': {
      opacity: 1,
      background: 'rgba(200, 200, 200, 0.2)',
    },
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 30px)',
      marginLeft: '15px',
      marginBottom: '8px',
      marginTop: '8px',
      textAlign: 'left',
      '& > span:first-child': {
        justifyContent: 'flex-start',
      },
    },
  },
  notificationNavLink: {
    color: 'inherit',
    padding: '0.9375rem',
    fontWeight: '400',
    fontSize: '12px',
    textTransform: 'uppercase',
    lineHeight: '20px',
    textDecoration: 'none',
    margin: '0px',
    display: 'inline-flex',
    top: '4px',
  },

  menuButton: { marginLeft: '.3rem' },

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
