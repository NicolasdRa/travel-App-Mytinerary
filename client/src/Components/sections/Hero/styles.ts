import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  .container {
    height: 35vh;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;

    ${(props) => props.theme.breakpoints.up('md')} {
      height: 40vh;
      width: 80vw;
    }

    ${(props) => props.theme.breakpoints.up('lg')} {
      width: 70vw;
    }
  }

  .mediumContainer {
    height: 25vh;
    position: relative;
    width: 100vw;
    display: flex;
    flex-direction: column;

    ${(props) => props.theme.breakpoints.up('md')} {
      width: 80vw;
    }

    ${(props) => props.theme.breakpoints.up('lg')} {
      width: 70vw;
    }
  }

  .img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: brightness(0.758) contrast(130%) saturate(40%);

    ${(props) => props.theme.breakpoints.up('md')} {
      border-radius: 10px;
    }
  }

  .skeleton {
    width: 100%;
    height: 100%;
  }

  .textArea {
    align-items: flex-start;
    color: ${(props) => props.theme.palette.primary.main};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    left: 0;
    padding: 0.8rem;
    position: absolute;
    top: 0;
    z-index: 500;
  }

  .title {
    font-size: 2rem;
    font-weight: 500;
    margin: 0;

    ${(props) => props.theme.breakpoints.down('md')} {
      font-size: 1.4rem;
      margin: 0 0 0.2rem 0;
    }
  }

  .subtitle {
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
  }

  .searchbar-container {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    z-index: 500;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${(props) => props.theme.breakpoints.down('md')} {
      width: 25rem;
      bottom: 30px;
    }
  }
`
