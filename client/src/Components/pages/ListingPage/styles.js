import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    margin: 0,
    padding: ' !important',
  },

  content: {
    marginTop: '-2rem',
  },

  galleryContainer: {
    borderRadius: '8px 8px 0 0',
    padding: '3rem 5rem',
    boxShadow:
      '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)',
    zIndex: 500,
  },

  galleryTitle: {
    margin: '1rem .5rem',
    fontSize: '1.2rem',
    color: 'grey',
    fontWeight: 400,
  },
}))
