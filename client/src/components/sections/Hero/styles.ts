import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  .container {
    width: 100%;
    max-width: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: relative;

    ${(props) => props.theme.breakpoints.down('md')} {
      /* On mobile, account for scroll thumb by using calc */
      width: calc(100vw - 8px);
      max-width: calc(100vw - 8px);
      margin-left: 4px;
      border-radius: 0 10px 10px 0;
    }

    ${(props) => props.theme.breakpoints.up('md')} {
      width: 80vw;
      max-width: 80vw;
      border-radius: 10px;
    }

    ${(props) => props.theme.breakpoints.up('lg')} {
      width: 80vw;
      max-width: 80vw;
    }
  }

  .skeleton {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(240, 240, 240, 0.2) 25%,
      rgba(240, 240, 240, 0.5) 50%,
      rgba(240, 240, 240, 0.2) 75%
    );
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 10px;
  }

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
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

  &.large, .large {
    height: 30vh;
    max-height: 30vh;
    max-width: 100%;
    
    ${(props) => props.theme.breakpoints.down('md')} {
      height: 25vh;
      max-height: 25vh;
    }
  }

  &.medium, .medium {
    height: 25vh;
    max-height: 25vh;
    max-width: 100%;
    
    ${(props) => props.theme.breakpoints.down('md')} {
      height: 20vh;
      max-height: 20vh;
    }
  }

  &.small, .small {
    height: 20vh;
    max-height: 20vh;
    max-width: 100%;

    ${(props) => props.theme.breakpoints.down('md')} {
      height: 15vh;
      max-height: 15vh;
    }
  }
`

export const StyledImage = styled('div')`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: brightness(0.758) contrast(130%) saturate(40%);
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  contain: layout style;
  border-radius: inherit;
  overflow: hidden;

  &.large {
    height: 30vh;
    max-height: 30vh;
    
    ${(props) => props.theme.breakpoints.down('md')} {
      height: 25vh;
      max-height: 25vh;
    }
  }

  &.medium {
    height: 25vh;
    max-height: 25vh;
    
    ${(props) => props.theme.breakpoints.down('md')} {
      height: 20vh;
      max-height: 20vh;
    }
  }

  &.small {
    height: 20vh;
    max-height: 20vh;
    
    ${(props) => props.theme.breakpoints.down('md')} {
      height: 15vh;
      max-height: 15vh;
    }
  }
`
