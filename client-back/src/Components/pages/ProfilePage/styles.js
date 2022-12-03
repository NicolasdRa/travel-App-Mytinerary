import { makeStyles } from 'tss-react/mui'

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

  userImg: {
    display: 'flex',
    margin: '-1.5rem auto 0 auto',
    height: '6rem',
    width: '6rem',
    border: '2px solid white',
  },

  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '-3rem',
    padding: '0 1rem 0 0',
  },

  edit_btn: {
    display: 'flex',
    color: 'grey',
    alignItems: 'center',
  },

  likes: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  likes_btn: {
    display: 'flex',
    flexDirection: 'row',
    flex: '0 0 auto',
    textAlign: 'left',
    padding: 0,
  },

  likes_icon: {
    height: '2.5rem',
    width: '2.5rem',
  },

  extra_info: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 2rem',
  },

  user_info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '1rem 0',
  },

  avatar: {
    height: '2rem',
    width: '2rem',
    marginRight: '.5rem',
  },

  price_time: {
    display: 'flex',
    marginLeft: 'auto',
    alignItems: 'center',
    padding: '1rem 0',
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
    margin: '1rem 0',
  },

  text: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
    textAlign: 'center',
    margin: '.5rem',
  },

  gallery: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
  },

  write_btn: {
    display: 'flex',
    color: 'grey',
    paddingLeft: '.5rem',
    alignItems: 'center',
  },

  write_icon: {
    alignItems: 'center',
    width: '1.2rem',
    height: '1.2rem',
    paddingBottom: '.3rem',
  },

  alt_container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  alt_container_legend: {
    display: 'flex',
    margin: '3rem',
    textAlign: 'center',
  },

  alt_container_btns: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '0.5rem 5rem',
  },
}))
