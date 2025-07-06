import { styled } from '@mui/material/styles'
import Image from '../../../assets/images/bg4.jpg'

export const StyledContainer = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  ${(props) => props.theme.breakpoints.down('md')} {
    /* Fullscreen on mobile */
    flex: 1;
    height: 100vh;
    margin: 0;
  }

  ${(props) => props.theme.breakpoints.up('md')} {
    /* Prominent on desktop but not fullscreen */
    flex: none;
    height: 40vh;
    min-height: 400px;
    max-height: 600px;
    width: 80vw;
    margin: 2rem auto;
    border-radius: 20px;
    overflow: hidden;
  }

  ${(props) => props.theme.breakpoints.up('lg')} {

  }
`

export const StyledHero = styled('div')`
  background-image: url(${Image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;

  ${(props) => props.theme.breakpoints.down('md')} {
    /* Fullscreen hero on mobile */
    height: 100vh;
    min-height: 100vh;
  }

  ${(props) => props.theme.breakpoints.up('md')} {
    /* Fixed height on desktop */
    border-radius: 10px;
    height: 60vh;
    min-height: 500px;
    max-height: 600px;
  }

  ${(props) => props.theme.breakpoints.up('lg')} {
    height: 70vh;
    min-height: 600px;
    max-height: 700px;
  }

  .text-container {
    text-align: center;
    margin: 0 auto;
    padding: 0 2rem;
    width: 100%;

    ${(props) => props.theme.breakpoints.up('md')} {
      width: 50%;
    }
    ${(props) => props.theme.breakpoints.up('lg')} {
      width: 80%;
    }
    ${(props) => props.theme.breakpoints.up('xl')} {
    }
  }

  .title {
    color: ${(props) => props.theme.palette.common.chalk};
    font-family: 'Roboto Slab', 'Times New Roman', serif;
    font-size: clamp(2.5rem, 8vw, 4rem);
    font-weight: 700;
    margin: 0 0 1rem 0;
    line-height: 1.1;

    ${(props) => props.theme.breakpoints.up('sm')} {
      font-size: clamp(3rem, 8vw, 5rem);
      margin: 2rem 0 0.875rem;
    }
    ${(props) => props.theme.breakpoints.up('md')} {
      font-size: clamp(3.5rem, 6vw, 4.2rem);
      margin: 2rem 0 0.2rem;
    }
    ${(props) => props.theme.breakpoints.up('xl')} {
      font-size: 4.2rem;
      margin: 2rem 0 0.875rem;
    }
  }

  .subtitle {
    color: ${(props) => props.theme.palette.common.chalk};
    font-size: clamp(1rem, 4vw, 1.2rem);
    font-weight: 400;
    line-height: 1.5;

    ${(props) => props.theme.breakpoints.up('sm')} {
      font-size: clamp(1.2rem, 4vw, 1.6rem);
      font-weight: 400;
      line-height: 1.5;
    }

    ${(props) => props.theme.breakpoints.up('md')} {
      font-size: clamp(1.3rem, 3vw, 1.5rem);
      font-weight: 300;
    }

    ${(props) => props.theme.breakpoints.up('xl')} {
      font-size: 1.4rem;
      font-weight: 400;
      text-align: center;
    }
  }

  .btns-container {
    margin-top: 1.5rem;
  }

  .start-btn-container {
    margin: 1rem 0;
    text-align: center;

    ${(props) => props.theme.breakpoints.up('sm')} {
      margin: 2rem 0 0 0;
    }
    ${(props) => props.theme.breakpoints.up('md')} {
      margin-top: 1rem;
    }
    ${(props) => props.theme.breakpoints.up('lg')} {
    }
  }

  .question {
    margin: 2rem 0 0 0;
    color: ${(props) => props.theme.palette.common.chalk};

    ${(props) => props.theme.breakpoints.up('sm')} {
      font-size: 1.2rem;
      margin: 1.2rem 0;
    }
  }

  .start-btn {
    height: 3rem;
    margin: 1rem 0 0 0;
    width: 12rem;

    ${(props) => props.theme.breakpoints.up('sm')} {
      font-size: 1.1rem;
      height: 3.5rem;
      margin: 0 0 3rem 0;
      width: 15rem;
    }

    ${(props) => props.theme.breakpoints.up('lg')} {
      border-color: ${(props) => props.theme.palette.common.chalk};
      color: ${(props) => props.theme.palette.common.chalk};
      font-size: 1rem;
      height: 2.5rem;
      width: 10rem;
      &:hover {
        color: white;
        border: 2px solid white;
        background-color: rgba(186, 186, 186, 0.5);
      }
    }

    ${(props) => props.theme.breakpoints.up('xl')} {
      font-size: 1.2rem;
      height: 3rem;
      width: 12rem;
    }
  }

  .login-btns-container {
    margin-top: 1rem;
    text-align: center;

    ${(props) => props.theme.breakpoints.up('sm')} {
      margin: 1rem 5rem 4rem 5rem;
    }

    ${(props) => props.theme.breakpoints.up('lg')} {
      margin: 1rem 5rem 4rem 5rem;
    }
  }

  .question {
    color: ${(props) => props.theme.palette.common.chalk};

    ${(props) => props.theme.breakpoints.up('sm')} {
      font-size: 1.5rem;
      margin: 1.2rem 0;
    }

    ${(props) => props.theme.breakpoints.up('lg')} {
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

    ${(props) => props.theme.breakpoints.up('sm')} {
      font-size: 1.1rem;
      height: 3rem;
      margin: 0 1.5rem;
      width: 8rem;
    }

    ${(props) => props.theme.breakpoints.up('lg')} {
      font-size: 1.2rem;
      height: 3.5rem;
      margin: 0 1.5rem;
      width: 8rem;
    }
  }
`
