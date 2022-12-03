import { makeStyles } from 'tss-react/mui'
import Image from '../../../assets/images/bg5.jpg'

export const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: 'url(' + Image + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    margin: '0',
  },

  backgroundImg: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    zIndex: '0',
  },

  loaderContainer: { height: '100vh' },
}))
