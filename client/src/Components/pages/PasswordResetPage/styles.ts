import { styled } from '@mui/material/styles'
import Image from '../../../assets/images/bg5.jpg'

export const StyledContainer = styled('div')`
  background-image: url(${Image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  margin: 0;

  ${(props) => props.theme.breakpoints.up('md')} {
    height: 60vh;
  }

  .backgroundImg {
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .loaderContainer {
    height: '100vh';
  }
`
