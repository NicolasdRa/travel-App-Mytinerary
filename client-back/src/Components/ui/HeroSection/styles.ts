import { styled } from '@mui/material/styles'
import Image from '../../../assets/images/bg4.jpg'

export const Container = styled('div')`
  background-image: url(${Image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-direction: column;
  height: 100vh;
  width: 100vw;

  [${(props) => props.theme.breakpoints.up('md')}]: {
    height: 53vh;
  }

  [${(props) => props.theme.breakpoints.up('lg')}]: {
    height: 60vh;
  }

  .topnav {
    bottom: 0;
    position: fixed;
    z-index: 1100;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: auto 0;
    padding: 0 2rem;

    [${(props) => props.theme.breakpoints.up('md')}]: {
      padding: 0 5rem;
    }

    [${(props) => props.theme.breakpoints.up('lg')}]: {
      padding: 0 8rem;
    }

    [${(props) => props.theme.breakpoints.up('xl')}]: {
      align-items: center;
    }
  }

  .title {
    color: ${(props) => props.theme.palette.common.chalk};
    font-family: 'Roboto Slab', 'Times New Roman', serif;
    font-size: 4rem;
    font-weight: 700;
    margin: 0.3rem 0 0.875rem;

    [${(props) => props.theme.breakpoints.up('sm')}]: {
      font-size: 6rem;
      margin: 5rem 0 0.875rem;
    }

    [${(props) => props.theme.breakpoints.up('lg')}]: {
      font-size: 3.5rem;
      margin: 2rem 0 0.875rem;
    }

    [${(props) => props.theme.breakpoints.up('xl')}]: {
      font-size: 4.2rem;
      margin: 5rem 0 0.875rem;
    }
  }

  .subtitle {
    color: ${(props) => props.theme.palette.common.chalk};
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.5;

    [${(props) => props.theme.breakpoints.up('sm')}]: {
      font-size: 2rem;
      font-weight: 400;
      line-height: 1.5;
    }

    [${(props) => props.theme.breakpoints.up('lg')}]: {
      font-size: 1.2rem;
      font-weight: 400;
    }

    [${(props) => props.theme.breakpoints.up('xl')}]: {
      font-size: 1.4rem;
      font-weight: 400;
      text-align: center;
    }
  }

  .btns-container {
    margin-top: 0.5rem;
  }

  .start-btn-container {
    text-align: center;

    [${(props) => props.theme.breakpoints.up('sm')}]: {
      margin: 2rem 0 0 0;
    }

    [${(props) => props.theme.breakpoints.up('md')}]: {
      margin-top: 1rem;
      text-align: start;
    }

    [${(props) => props.theme.breakpoints.up('lg')}]: {
    }
  }

  .text {
    color: ${(props) => props.theme.palette.common.chalk};

    [${(props) => props.theme.breakpoints.up('sm')}]: {
      font-size: 1.2rem;
      margin: 1.2rem 0;
    }
  }

  .start-btn {
    height: 3rem;
    margin: 1rem 0 0 0;
    width: 12rem;

    [${(props) => props.theme.breakpoints.up('sm')}]: {
      font-size: 1.1rem;
      height: 3.5rem;
      margin: 0 0 3rem 0;
      width: 15rem;
    }

    [${(props) => props.theme.breakpoints.up('lg')}]: {
      border-color: ${(props) => props.theme.palette.common.chalk};
      color: ${(props) => props.theme.palette.common.chalk};
      font-size: 1rem;
      height: 2.5rem;
      width: 10rem;
      '&:hover': {
        color: white;
        border: 2px;
        border-color: white;
        background-color: rgba(186; 186; 186; 0.5);
      }
    }

    [${(props) => props.theme.breakpoints.up('xl')}]: {
      font-size: 1.2rem;
      height: 3rem;
      width: 12rem;
    }
  }

  .login-btns-container {
    margin-top: 1rem;
    text-align: center;

    [${(props) => props.theme.breakpoints.up('sm')}]: {
      margin: 1rem 5rem 4rem 5rem;
    }

    [${(props) => props.theme.breakpoints.up('lg')}]: {
      margin: 1rem 5rem 4rem 5rem;
    }
  }

  .question {
    color: ${(props) => props.theme.palette.common.chalk};

    [${(props) => props.theme.breakpoints.up('sm')}]: {
      font-size: 1.5rem;
      margin: 1.2rem 0;
    }

    [${(props) => props.theme.breakpoints.up('lg')}]: {
      font-size: 1.2rem;
      margin: 2rem 0;
    }
  }

  .modal-btn {
    border-color: ${(props) => props.theme.palette.common.chalk};
    color: ${(props) => props.theme.palette.common.chalk};
    height: 3rem;
    margin: 1rem 0.5rem;
    width: 6rem;

    [${(props) => props.theme.breakpoints.up('sm')}]: {
      font-size: 1.1rem;
      height: 3rem;
      margin: 0 1.5rem;
      width: 8rem;
    }

    [${(props) => props.theme.breakpoints.up('lg')}]: {
      font-size: 1.2rem;
      height: 3.5rem;
      margin: 0 1.5rem;
      width: 8rem;
    }
  }
`