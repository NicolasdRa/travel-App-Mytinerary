import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: '3rem',
  },

  searchbarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.palette.common.beigeLight,
    padding: '1rem 1rem',
    margin: '-.5rem 0 0 0',
  },

  searchBarTitle: {
    color: theme.palette.primary.main,
    fontSize: '.9rem',
    fontWeight: '500',
    textAlign: 'left',
    margin: '0 0 .5rem .5rem',
  },

  searchBar: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '5px',
  },

  subtitle: {
    margin: '2rem auto .5rem 1.5rem',
    textAlign: 'start',
  },

  loader: {
    display: 'flex',
    flexDirection: 'column',
    margin: '5rem 5rem',
  },
}))
